use crate::groups::Group;
use crate::schema::{groups, users};
use crate::users::User;
use crate::Pool;
use actix_web::{delete, get, post, put, web, Error, HttpResponse};
use diesel::BelongingToDsl;
use diesel::QueryDsl;
use diesel::RunQueryDsl;
use uuid::Uuid;

#[get("/groups/{user_id}")]
async fn find_groups_by_id(
    id_req: web::Path<Uuid>,
    db: web::Data<Pool>,
) -> Result<HttpResponse, Error> {
    Ok(web::block(move || get_all_groups(db, id_req.into_inner()))
        .await
        .map(|group| HttpResponse::Ok().json(group))
        .map_err(|_| HttpResponse::InternalServerError())?)
}

fn get_all_groups(
    pool: web::Data<Pool>,
    id_req: Uuid,
) -> Result<Vec<Group>, diesel::result::Error> {
    let conn = pool.get().unwrap();
    let user = users::table.find(id_req).first::<User>(&conn)?;
    let group_list = Group::belonging_to(&user).load::<Group>(&conn)?;
    Ok(group_list)
}

#[post("/groups")]
pub async fn add_group(db: web::Data<Pool>, item: web::Json<Group>) -> Result<HttpResponse, Error> {
    Ok(web::block(move || add_single_group(db, item.into_inner()))
        .await
        .map(|_| HttpResponse::Created().finish())
        .map_err(|_| HttpResponse::InternalServerError())?)
}

fn add_single_group(db: web::Data<Pool>, item: Group) -> Result<(), diesel::result::Error> {
    let conn = db.get().unwrap();
    diesel::insert_into(groups::table)
        .values(&item)
        .execute(&conn)?;
    Ok(())
}

#[delete("/groups/{id}")]
pub async fn delete_group(db: web::Data<Pool>, id: web::Path<Uuid>) -> Result<HttpResponse, Error> {
    Ok(web::block(move || delete_single_group(db, id.into_inner()))
        .await
        .map(|count| HttpResponse::Ok().json(count))
        .map_err(|_| HttpResponse::InternalServerError())?)
}

fn delete_single_group(db: web::Data<Pool>, id: Uuid) -> Result<usize, diesel::result::Error> {
    let conn = db.get().unwrap();
    let count = diesel::delete(groups::table.find(id)).execute(&conn)?;
    Ok(count)
}

#[put("/groups")]
pub async fn rename_group(
    db: web::Data<Pool>,
    new_group: web::Json<Group>,
) -> Result<HttpResponse, Error> {
    Ok(
        web::block(move || rename_single_group(db, new_group.into_inner()))
            .await
            .map(|_| HttpResponse::Ok().finish())
            .map_err(|_| HttpResponse::InternalServerError())?,
    )
}

fn rename_single_group(db: web::Data<Pool>, new_group: Group) -> Result<(), diesel::result::Error> {
    let conn = db.get().unwrap();
    diesel::update(&new_group).set(&new_group).execute(&conn)?;
    Ok(())
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find_groups_by_id);
    config.service(add_group);
    config.service(delete_group);
    config.service(rename_group);
}
