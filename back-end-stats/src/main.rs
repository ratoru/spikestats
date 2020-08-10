use actix_web::{web, App, HttpServer};
use listenfd::ListenFd;
mod handlers;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=debug");
    let mut listenfd = ListenFd::from_env();

    // Start http server
    let mut server = HttpServer::new(move || {
        App::new()
            .route(
                "/users/{username}",
                web::get().to(handlers::get_user_by_username),
            )
            .route("/users", web::post().to(handlers::add_user))
    });
    // Allows server to auto-reload.
    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l)?
    } else {
        server.bind("127.0.0.1:8088")?
    };

    server.run().await
}
