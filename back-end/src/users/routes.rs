use crate::auth_handler;
use crate::error_handler::ServiceError;
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

#[post("/users")]
async fn add_user(
    db: web::Data<Pool>,
    item: web::Json<InputUser>,
) -> Result<HttpResponse, ServiceError> {
    Ok(web::block(move || add_single_user(db, item))
        .await
        .map(|new_user| HttpResponse::Created().json(new_user))?)
}

fn add_single_user(
    db: web::Data<Pool>,
    item: web::Json<InputUser>,
) -> Result<ReturnUser, ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    let new_user = NewUser {
        user_name: &item.user_name,
        password: &item.password,
    };
    let res = diesel::insert_into(users)
        .values(&new_user)
        .get_result::<User>(&conn)?;
    let new_user = ReturnUser {
        id: res.id,
        user_name: res.user_name,
    };
    Ok(new_user)
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
                .json("Login succesful.")
        })?)
}

fn login_user(db: web::Data<Pool>, info: InputUser) -> Result<String, ServiceError> {
    let res = find_user(db, info)?;
    let return_user = ReturnUser {
        id: res.id,
        user_name: res.user_name,
    };
    auth_handler::generate_token(return_user)
}

fn find_user(db: web::Data<Pool>, info: InputUser) -> Result<User, ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    let res = users
        .filter(user_name.eq(info.user_name))
        .filter(password.eq(info.password))
        .get_result::<User>(&conn)?;
    Ok(res)
}

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
}
