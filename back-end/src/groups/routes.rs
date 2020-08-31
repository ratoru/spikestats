use crate::auth_handler::{authorize_user, MyClaim};
use crate::error_handler::ServiceError;
use crate::groups::Group;
use crate::schema::{groups, users};
use crate::users::User;
use crate::Pool;
use actix_web::{delete, get, post, put, web, HttpResponse};
use diesel::{BelongingToDsl, QueryDsl, RunQueryDsl};
use uuid::Uuid;

// Decodes jwt in httponly cookie to get user_id.
#[get("/groups")]
async fn find_groups_by_id(
    db: web::Data<Pool>,
    http_req: web::HttpRequest,
) -> Result<HttpResponse, ServiceError> {
    let claim: MyClaim = authorize_user(http_req)?;
    Ok(web::block(move || get_all_groups(db, claim.id))
        .await
        .map(|group| HttpResponse::Ok().json(group))?)
}

fn get_all_groups(pool: web::Data<Pool>, id_req: Uuid) -> Result<Vec<Group>, ServiceError> {
    let conn = pool.get().map_err(|_| ServiceError::InternalServerError)?;
    let user = users::table.find(id_req).first::<User>(&conn)?;
    let group_list = Group::belonging_to(&user).load::<Group>(&conn)?;
    Ok(group_list)
}

#[post("/groups")]
async fn add_group(
    db: web::Data<Pool>,
    item: web::Json<Group>,
    http_req: web::HttpRequest,
) -> Result<HttpResponse, ServiceError> {
    authorize_user(http_req)?;
    Ok(web::block(move || add_single_group(db, item.into_inner()))
        .await
        .map(|_| HttpResponse::Created().finish())?)
}

fn add_single_group(db: web::Data<Pool>, item: Group) -> Result<(), ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    diesel::insert_into(groups::table)
        .values(&item)
        .execute(&conn)?;
    Ok(())
}

#[delete("/groups/{id}")]
async fn delete_group(
    db: web::Data<Pool>,
    id: web::Path<Uuid>,
    http_req: web::HttpRequest,
) -> Result<HttpResponse, ServiceError> {
    authorize_user(http_req)?;
    Ok(web::block(move || delete_single_group(db, id.into_inner()))
        .await
        .map(|count| HttpResponse::Ok().json(count))?)
}

fn delete_single_group(db: web::Data<Pool>, id: Uuid) -> Result<usize, ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    let count = diesel::delete(groups::table.find(id)).execute(&conn)?;
    Ok(count)
}

#[put("/groups")]
async fn rename_group(
    db: web::Data<Pool>,
    new_group: web::Json<Group>,
    http_req: web::HttpRequest,
) -> Result<HttpResponse, ServiceError> {
    authorize_user(http_req)?;
    Ok(
        web::block(move || rename_single_group(db, new_group.into_inner()))
            .await
            .map(|_| HttpResponse::Ok().finish())?,
    )
}

fn rename_single_group(db: web::Data<Pool>, new_group: Group) -> Result<(), ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    diesel::update(&new_group).set(&new_group).execute(&conn)?;
    Ok(())
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find_groups_by_id);
    config.service(add_group);
    config.service(delete_group);
    config.service(rename_group);
}
