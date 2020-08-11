use actix_web::{get, web, HttpResponse, Responder};
// use serde_json::json;
use uuid::Uuid;

use crate::users::model;

#[get("/users/{username}")]
async fn find() -> impl Responder {
    HttpResponse::Ok().json(model::User {
        id: Uuid::new_v4(),
        name: "Raphael".to_string(),
        password: "Good".to_string(),
    })
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find);
}
