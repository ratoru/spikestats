use crate::error_handler::ServiceError;
use crate::users::ReturnUser;
use actix_web::web::HttpRequest;
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

pub fn authorize_user(http_req: HttpRequest) -> Result<(), ServiceError> {
    let headers = http_req.headers();
    let auth_header = headers
        .get("Authorization")
        .ok_or(ServiceError::Unauthorized)?;
    let bearer_token: &str = auth_header
        .to_str()
        .map_err(|_| ServiceError::Unauthorized)?;
    let secret =
        std::env::var("ACCESS_TOKEN_SECRET").map_err(|_| ServiceError::InternalServerError)?;
    // Skip "Bearer " with [7..]
    decode::<MyClaim>(
        &bearer_token[7..],
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    )?;
    Ok(())
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
