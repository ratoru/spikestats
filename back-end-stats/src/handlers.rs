use actix_web::Responder;

pub async fn get_user_by_id() -> impl Responder {
    format!("hello from get user by id.")
}

pub async fn add_user() -> impl Responder {
    format!("hello from add user")
}
