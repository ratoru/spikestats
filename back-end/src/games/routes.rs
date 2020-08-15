use actix_web::{delete, get, post, web, HttpRequest, HttpResponse, Responder};
// use serde_json::json;
use chrono::prelude::*;
use uuid::Uuid;

use crate::games::model;

#[get("/games")]
async fn find_all(req: HttpRequest) -> impl Responder {
    HttpResponse::Ok().json(model::Game {
        id: Uuid::new_v4(),
        blue_team: (Uuid::new_v4(), Uuid::new_v4()),
        red_team: (Uuid::new_v4(), Uuid::new_v4()),
        score: (21, 17),
        serve: true,
        date: Local::now(),
        group_id: Uuid::new_v4(),
    })
}

#[post("/games")]
async fn add(req: HttpRequest) -> impl Responder {
    HttpResponse::Ok()
}

#[delete("/games/{id}")]
async fn remove(req: HttpRequest) -> impl Responder {
    HttpResponse::Ok()
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find_all);
    config.service(add);
    config.service(remove);
}
