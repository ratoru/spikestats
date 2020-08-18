use actix_web::{get, post, put, web, HttpRequest, HttpResponse, Responder};
// use serde_json::json;
use uuid::Uuid;

use crate::players::model;

#[get("/players")]
async fn find_all(req: HttpRequest) -> impl Responder {
    let id_req = Uuid::parse_str(req.match_info().get("id").unwrap()).unwrap();
    HttpResponse::Ok().json(model::Player {
        id: id_req,
        name: "Ein Spieler".to_string(),
        group_id: Uuid::new_v4(),
    })
}

#[post("/players")]
async fn add_all(_req: HttpRequest) -> impl Responder {
    HttpResponse::Ok()
}

#[put("/players/{id}")]
async fn rename(_req: HttpRequest) -> impl Responder {
    HttpResponse::Ok()
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find_all);
    config.service(add_all);
    config.service(rename);
}
