use actix_web::{delete, get, post, put, web, Error, HttpRequest, HttpResponse, Responder};
// use serde_json::json;
use crate::groups::model;
use crate::schema::groups::dsl::*;
use crate::Pool;
// use diesel::QueryDsl;
use diesel::RunQueryDsl;
use model::Group;
use uuid::Uuid;

#[get("/groups/{user_id}")]
async fn find(req: HttpRequest, db: web::Data<Pool>) -> Result<HttpResponse, Error> {
    let id_req = Uuid::parse_str(req.match_info().get("user_id").unwrap()).unwrap();
    Ok(web::block(move || get_all_groups(db, id_req))
        .await
        .map(|group| HttpResponse::Ok().json(group))
        .map_err(|_| HttpResponse::InternalServerError())?)
}

fn get_all_groups(
    pool: web::Data<Pool>,
    _id_req: Uuid,
) -> Result<Vec<Group>, diesel::result::Error> {
    let conn = pool.get().unwrap();
    let items = groups.load::<Group>(&conn)?;
    Ok(items)
}

#[post("/groups")]
async fn add(_req: HttpRequest) -> impl Responder {
    HttpResponse::Ok()
}

#[delete("/groups/{id}")]
async fn remove(_req: HttpRequest) -> impl Responder {
    HttpResponse::Ok()
}

#[put("/groups/{id}")]
async fn rename(_req: HttpRequest) -> impl Responder {
    HttpResponse::Ok()
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find);
    config.service(add);
    config.service(remove);
    config.service(rename);
}
