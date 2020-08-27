use crate::error_handler::ServiceError;
use crate::schema::users::dsl::*;
use crate::users::{InputUser, NewUser, User};
use crate::Pool;
use actix_web::{get, post, web, HttpResponse};
use diesel::QueryDsl;
use diesel::RunQueryDsl;
use uuid::Uuid;

#[get("/users/{id}")]
async fn get_user_by_id(
    db: web::Data<Pool>,
    user_id: web::Path<Uuid>,
) -> Result<HttpResponse, ServiceError> {
    Ok(
        web::block(move || db_get_user_by_id(db, user_id.into_inner()))
            .await
            .map(|user| HttpResponse::Ok().json(user))?,
    )
}

fn db_get_user_by_id(pool: web::Data<Pool>, user_id: Uuid) -> Result<User, ServiceError> {
    let conn = pool.get().map_err(|_| ServiceError::InternalServerError)?;
    let user = users.find(user_id).get_result::<User>(&conn)?;
    Ok(user)
}

#[post("/users")]
async fn add_user(
    db: web::Data<Pool>,
    item: web::Json<InputUser>,
) -> Result<HttpResponse, ServiceError> {
    Ok(web::block(move || add_single_user(db, item))
        .await
        .map(|new_uuid| HttpResponse::Created().json(new_uuid))?)
}

fn add_single_user(db: web::Data<Pool>, item: web::Json<InputUser>) -> Result<Uuid, ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    let new_user = NewUser {
        user_name: &item.user_name,
        password: &item.password,
    };
    let res = diesel::insert_into(users)
        .values(&new_user)
        .returning(id)
        .get_result(&conn)?;
    Ok(res)
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(get_user_by_id);
    config.service(add_user);
}
