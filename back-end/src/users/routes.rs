use crate::schema::users::dsl::*;
use crate::users::{InputUser, NewUser, User};
use crate::Pool;
use actix_web::{get, post, web, Error, HttpResponse};
use diesel::QueryDsl;
use diesel::RunQueryDsl;
use uuid::Uuid;

#[get("/users/{id}")]
pub async fn get_user_by_id(
    db: web::Data<Pool>,
    user_id: web::Path<Uuid>,
) -> Result<HttpResponse, Error> {
    Ok(
        web::block(move || db_get_user_by_id(db, user_id.into_inner()))
            .await
            .map(|user| HttpResponse::Ok().json(user))
            .map_err(|_| HttpResponse::InternalServerError())?,
    )
}

fn db_get_user_by_id(pool: web::Data<Pool>, user_id: Uuid) -> Result<User, diesel::result::Error> {
    let conn = pool.get().unwrap();
    users.find(user_id).get_result::<User>(&conn)
}

#[post("/users")]
pub async fn add_user(
    db: web::Data<Pool>,
    item: web::Json<InputUser>,
) -> Result<HttpResponse, Error> {
    Ok(web::block(move || add_single_user(db, item))
        .await
        .map(|new_uuid| HttpResponse::Created().json(new_uuid))
        .map_err(|_| HttpResponse::InternalServerError())?)
}

fn add_single_user(
    db: web::Data<Pool>,
    item: web::Json<InputUser>,
) -> Result<Uuid, diesel::result::Error> {
    let conn = db.get().unwrap();
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
