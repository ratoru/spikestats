use actix_web::{App, HttpServer};
use listenfd::ListenFd;
mod users;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=debug");
    let mut listenfd = ListenFd::from_env();

    // Start http server
    let mut server = HttpServer::new(move || App::new().configure(users::init_routes));
    // Allows server to auto-reload.
    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l)?
    } else {
        server.bind("0.0.0.0:8080")?
    };

    server.run().await
}
