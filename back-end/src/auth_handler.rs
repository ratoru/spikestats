use crate::error_handler::ServiceError;
use crate::users::ReturnUser;
use actix_web::{http::Cookie, web::HttpRequest};
use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

const TOKEN_LIFETIME: i64 = 2;

#[derive(Serialize, Deserialize)]
struct MyClaim {
    exp: i64,
    id: Uuid,
    user_name: String,
}

// Decodes a token, thereby checking whether the token was set correctly.
pub fn authorize_token(token: &str) -> Result<(), ServiceError> {
    let secret =
        std::env::var("ACCESS_TOKEN_SECRET").map_err(|_| ServiceError::InternalServerError)?;
    decode::<MyClaim>(
        token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    )?;
    Ok(())
}

// Gets a token from the header of a request.
// is_cookie toggles between Httponly Cookies and Auth Bearer.
pub fn get_header_token(http_req: HttpRequest, is_cookie: bool) -> Result<String, ServiceError> {
    let mut header_name = "Authorization";
    let mut prefix_length = 7;
    if is_cookie {
        header_name = "Cookie";
        prefix_length = 14;
    }
    let headers = http_req.headers();
    let auth_header = headers.get(header_name).ok_or(ServiceError::Unauthorized)?;
    let token: &str = auth_header
        .to_str()
        .map_err(|_| ServiceError::Unauthorized)?;
    // Skip "Bearer " with [7..] and "Authorization=" with [14..]
    Ok(token[prefix_length..].to_owned())
}

pub fn authorize_user(http_req: HttpRequest) -> Result<(), ServiceError> {
    let token = get_header_token(http_req, true)?;
    authorize_token(&token)
}

pub fn generate_token(return_user: ReturnUser) -> Result<String, ServiceError> {
    let secret =
        std::env::var("ACCESS_TOKEN_SECRET").map_err(|_| ServiceError::InternalServerError)?;
    let exp_time = Utc::now() + Duration::hours(TOKEN_LIFETIME);
    let my_claims = MyClaim {
        exp: exp_time.timestamp(),
        id: return_user.id,
        user_name: return_user.user_name,
    };
    encode(
        &Header::default(),
        &my_claims,
        &EncodingKey::from_secret(secret.as_ref()),
    )
    .map_err(|_| ServiceError::InternalServerError)
}

pub fn create_cookie(jwt: &str) -> Cookie {
    // let server_url = std::env::var("SERVER_URL").expect("SERVER_URL must be set.");
    Cookie::build("Authorization", jwt.to_owned())
        .max_age_time(Duration::hours(TOKEN_LIFETIME))
        .http_only(true)
        .finish()
}
