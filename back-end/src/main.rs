#[macro_use]
extern crate diesel;
extern crate dotenv;

pub mod schema;

use actix_web::{App, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
// use listenfd::ListenFd;
mod games;
mod groups;
mod players;
mod users;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    std::env::set_var("RUST_LOG", "actix_web=debug");
    // let mut listenfd = ListenFd::from_env();
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set.");

    // create db connection pool
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool: Pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    // Start http server
    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .configure(users::init_routes)
            .configure(groups::init_routes)
            .configure(players::init_routes)
            .configure(games::init_routes)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
    // Allows server to auto-reload.
    // server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
    //     server.listen(l)?
    // } else {
    //     server.bind("0.0.0.0:8080")?
    // };
}
