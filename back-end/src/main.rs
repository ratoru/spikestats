#[macro_use]
extern crate diesel;
extern crate dotenv;

pub mod auth_handler;
pub mod error_handler;
pub mod hash_handler;
pub mod schema;

use actix_cors::Cors;
use actix_web::{web, App, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use std::env;

mod games;
mod groups;
mod players;
mod users;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    std::env::set_var("RUST_LOG", "actix_web=debug");
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set.");
    let server_url = env::var("SERVER_URL").expect("SERVER_URL must be set.");

    // create db connection pool
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool: Pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");
    let allowed_cors = env::var("ALLOWED_CORS").unwrap_or_default();

    // Start http server
    HttpServer::new(move || {
        App::new()
            .wrap(
                allowed_cors
                    .clone()
                    .split(',')
                    .fold(
                        Cors::new().allowed_origin("http://localhost:3000"),
                        |cors, origin| cors.allowed_origin(origin),
                    )
                    .supports_credentials()
                    .finish(),
            )
            .data(pool.clone())
            .service(
                web::scope("/api")
                    .configure(users::init_routes)
                    .configure(groups::init_routes)
                    .configure(players::init_routes)
                    .configure(games::init_routes),
            )
    })
    .bind(server_url)?
    .run()
    .await
}
