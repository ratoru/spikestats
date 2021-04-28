#[macro_use]
extern crate diesel;
extern crate dotenv;

pub mod auth_handler;
pub mod error_handler;
pub mod schema;

use actix_cors::Cors;
use actix_web::{dev::ServiceRequest, web, App, Error, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use std::env;

use actix_web_httpauth::extractors::bearer::{BearerAuth, Config};
use actix_web_httpauth::extractors::AuthenticationError;
use actix_web_httpauth::middleware::HttpAuthentication;

mod games;
mod groups;
mod players;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

async fn validator(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, Error> {
    let config = req
        .app_data::<Config>()
        .map(|data| data.clone())
        .unwrap_or_else(Default::default);
    match auth_handler::validate_token(credentials.token()) {
        Ok(res) => {
            if res == true {
                Ok(req)
            } else {
                Err(AuthenticationError::from(config).into())
            }
        }
        Err(_) => Err(AuthenticationError::from(config).into()),
    }
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    std::env::set_var("RUST_LOG", "actix_web=debug");
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set.");
    // let server_url: String = env::var("SERVER_URL").expect("SERVER_URL must be set.");
    // Get the port number to listen on.
    let port = env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse()
        .expect("PORT must be a number");

    // create db connection pool
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool: Pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");
    let allowed_cors = env::var("ALLOWED_CORS").unwrap_or_default();

    // Start http server
    HttpServer::new(move || {
        let auth = HttpAuthentication::bearer(validator);
        App::new()
            .wrap(auth)
            .wrap(
                allowed_cors
                    .clone()
                    .split(',')
                    .fold(
                        Cors::default().allowed_origin("http://localhost:3000"),
                        |cors, origin| cors.allowed_origin(origin),
                    )
                    .supports_credentials(),
            )
            .data(pool.clone())
            .service(
                web::scope("/api")
                    .configure(groups::init_routes)
                    .configure(players::init_routes)
                    .configure(games::init_routes),
            )
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
