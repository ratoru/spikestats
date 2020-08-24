use actix_web::{delete, get, post, put, web, HttpRequest, HttpResponse, Responder};
// use serde_json::json;
use uuid::Uuid;

use crate::groups::model;

#[get("/groups/{id}")]
async fn find(req: HttpRequest) -> impl Responder {
    let id_req = Uuid::parse_str(req.match_info().get("id").unwrap()).unwrap();
    HttpResponse::Ok().json(model::Group {
        id: id_req,
        group_name: "Tolle Gruppe".to_string(),
        user_id: Uuid::new_v4(),
    })
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
