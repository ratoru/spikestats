use actix_web::{delete, get, post, web, HttpRequest, HttpResponse, Responder};
// use serde_json::json;
use chrono::prelude::*;
use uuid::Uuid;

use crate::games::model;

#[get("/games")]
async fn find_all(_req: HttpRequest) -> impl Responder {
    HttpResponse::Ok().json(model::Game {
        id: Uuid::new_v4(),
        blue_team: vec![Uuid::new_v4(), Uuid::new_v4()],
        red_team: vec![Uuid::new_v4(), Uuid::new_v4()],
        score: vec![21, 17],
        serve: true,
        date_played: Local::now().naive_local(),
        group_id: Uuid::new_v4(),
    })
}

#[post("/games")]
async fn add(_req: HttpRequest) -> impl Responder {
    HttpResponse::Ok()
}

#[delete("/games/{id}")]
async fn remove(_req: HttpRequest) -> impl Responder {
    HttpResponse::Ok()
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find_all);
    config.service(add);
    config.service(remove);
}
