use actix_web::{web, App, HttpServer};
mod handlers;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=debug");

    // Start http server
    HttpServer::new(move || {
        App::new()
            .route("/users/{id}", web::get().to(handlers::get_user_by_id))
            .route("/users", web::post().to(handlers::add_user))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
