use crate::error_handler::ServiceError;
use crate::groups::{Group, InputGroup};
use crate::schema::groups;
use crate::Pool;
use actix_web::{delete, get, post, put, web, HttpResponse};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use uuid::Uuid;

#[get("/groups/{user_id}")]
async fn find_groups_by_id(
    db: web::Data<Pool>,
    user_id: web::Path<Uuid>,
) -> Result<HttpResponse, ServiceError> {
    Ok(web::block(move || get_all_groups(db, user_id.into_inner()))
        .await
        .map(|group| HttpResponse::Ok().json(group))?)
}

fn get_all_groups(pool: web::Data<Pool>, id_req: Uuid) -> Result<Vec<Group>, ServiceError> {
    let conn = pool.get().map_err(|_| ServiceError::InternalServerError)?;
    let group_list = groups::table
        .filter(groups::user_id.eq(id_req))
        .load::<Group>(&conn)?;
    Ok(group_list)
}

#[post("/groups/{user_id}")]
async fn add_group(
    db: web::Data<Pool>,
    item: web::Json<InputGroup>,
    user_id: web::Path<Uuid>,
) -> Result<HttpResponse, ServiceError> {
    Ok(
        web::block(move || add_single_group(db, item.into_inner(), user_id.into_inner()))
            .await
            .map(|_| HttpResponse::Created().finish())?,
    )
}

fn add_single_group(
    db: web::Data<Pool>,
    item: InputGroup,
    user_id: Uuid,
) -> Result<(), ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    let new_group = Group {
        id: item.id,
        groupname: item.groupname,
        user_id: user_id,
    };
    diesel::insert_into(groups::table)
        .values(&new_group)
        .execute(&conn)?;
    Ok(())
}

#[delete("/groups/{id}")]
async fn delete_group(
    db: web::Data<Pool>,
    id: web::Path<Uuid>,
) -> Result<HttpResponse, ServiceError> {
    Ok(web::block(move || delete_single_group(db, id.into_inner()))
        .await
        .map(|count| HttpResponse::Ok().json(count))?)
}

fn delete_single_group(db: web::Data<Pool>, id: Uuid) -> Result<usize, ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    let count = diesel::delete(groups::table.find(id)).execute(&conn)?;
    Ok(count)
}

#[put("/groups/{user_id}")]
async fn rename_group(
    db: web::Data<Pool>,
    new_group: web::Json<InputGroup>,
    user_id: web::Path<Uuid>,
) -> Result<HttpResponse, ServiceError> {
    Ok(
        web::block(move || rename_single_group(db, new_group.into_inner(), user_id.into_inner()))
            .await
            .map(|_| HttpResponse::Ok().finish())?,
    )
}

fn rename_single_group(
    db: web::Data<Pool>,
    input_group: InputGroup,
    user_id: Uuid,
) -> Result<(), ServiceError> {
    let new_group = Group {
        id: input_group.id,
        groupname: input_group.groupname,
        user_id: user_id,
    };
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
