use crate::auth_handler;
use crate::error_handler::ServiceError;
use crate::hash_handler;
use crate::schema::users::dsl::*;
use crate::users::{InputUser, NewUser, ReturnUser, User};
use crate::Pool;
use actix_web::{get, post, web, HttpRequest, HttpResponse};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};

// This route is for testing purposes and should be deleted later.
#[get("/users")]
async fn get_all_users(db: web::Data<Pool>) -> Result<HttpResponse, ServiceError> {
    Ok(web::block(move || db_get_all_users(db))
        .await
        .map(|user| HttpResponse::Ok().json(user))?)
}

fn db_get_all_users(pool: web::Data<Pool>) -> Result<Vec<User>, ServiceError> {
    let conn = pool.get().map_err(|_| ServiceError::InternalServerError)?;
    let all_users = users.load::<User>(&conn)?;
    Ok(all_users)
}

#[post("/register")]
async fn add_user(
    db: web::Data<Pool>,
    item: web::Json<InputUser>,
) -> Result<HttpResponse, ServiceError> {
    Ok(web::block(move || add_single_user(db, item))
        .await
        .map(|jwt| {
            HttpResponse::Created()
                .cookie(auth_handler::create_cookie(&jwt))
                .finish()
        })?)
}

fn add_single_user(
    db: web::Data<Pool>,
    item: web::Json<InputUser>,
) -> Result<String, ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    let new_user = NewUser {
        username: &item.username,
        password: &hash_handler::hash(&item.password),
    };
    let res = diesel::insert_into(users)
        .values(&new_user)
        .get_result::<User>(&conn)?;
    let created_user = ReturnUser {
        id: res.id,
        username: res.username,
    };
    auth_handler::generate_token(created_user)
}

#[post("/login")]
async fn login(
    db: web::Data<Pool>,
    user: web::Json<InputUser>,
) -> Result<HttpResponse, ServiceError> {
    Ok(web::block(move || login_user(db, user.into_inner()))
        .await
        .map(|jwt| {
            HttpResponse::Created()
                .cookie(auth_handler::create_cookie(&jwt))
                .finish()
        })?)
}

fn login_user(db: web::Data<Pool>, info: InputUser) -> Result<String, ServiceError> {
    let res = find_user(db, info)?;
    let return_user = ReturnUser {
        id: res.id,
        username: res.username,
    };
    auth_handler::generate_token(return_user)
}

fn find_user(db: web::Data<Pool>, info: InputUser) -> Result<User, ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    let res = users
        .filter(username.eq(info.username))
        // .filter(password.eq(info.password))
        .get_result::<User>(&conn)?;
    if hash_handler::verify(&res.password, &info.password) {
        return Ok(res);
    }
    Err(ServiceError::Unauthorized)
}

// Removes HttpOnly cookie.
#[post("/logout")]
async fn logout() -> Result<HttpResponse, ServiceError> {
    let c = actix_web::http::Cookie::parse(
        "Authorization=; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT",
    )
    .unwrap();
    Ok(HttpResponse::Ok().cookie(c).finish())
}

// Returns whether the user is logged in or not.
#[get("/checkAuth")]
async fn check_authentication(http_req: HttpRequest) -> Result<HttpResponse, ServiceError> {
    // Can't move httprequest into different thread with block.
    let token = auth_handler::get_header_token(http_req, true)?;
    Ok(web::block(move || auth_handler::authorize_token(&token))
        .await
        .map(|_| HttpResponse::Ok().finish())?)
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(get_all_users);
    config.service(add_user);
    config.service(login);
    config.service(check_authentication);
    config.service(logout);
}
