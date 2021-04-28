use actix_web::error::BlockingError;
use actix_web::{HttpResponse, ResponseError};
use diesel::result::Error as DieselError;
use std::fmt;

#[derive(Debug)]
pub enum ServiceError {
    InternalServerError,
    BadRequest,
    NotFound,
    Conflict,
    Unauthorized,
    Forbidden,
    JWKSFetchError,
}

impl fmt::Display for ServiceError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let error_message: &str;
        match self {
            ServiceError::InternalServerError => error_message = "Internal Server Error",
            ServiceError::BadRequest => error_message = "Bad Request",
            ServiceError::NotFound => error_message = "Not Found",
            ServiceError::Conflict => error_message = "Conflict",
            ServiceError::Unauthorized => error_message = "Authenticate Yourself",
            ServiceError::Forbidden => error_message = "Access forbidden",
            ServiceError::JWKSFetchError => error_message = "Could not fetch JWKS",
        };
        f.write_str(error_message)
    }
}

impl From<DieselError> for ServiceError {
    fn from(error: DieselError) -> ServiceError {
        match error {
            DieselError::DatabaseError(_, _) => ServiceError::Conflict,
            DieselError::NotFound => ServiceError::NotFound,
            DieselError::DeserializationError(_) => ServiceError::BadRequest,
            _ => ServiceError::InternalServerError,
        }
    }
}

impl From<BlockingError<ServiceError>> for ServiceError {
    fn from(error: BlockingError<ServiceError>) -> ServiceError {
        match error {
            BlockingError::Error(serv_err) => serv_err,
            BlockingError::Canceled => ServiceError::InternalServerError,
        }
    }
}

impl ResponseError for ServiceError {
    fn error_response(&self) -> HttpResponse {
        match self {
            ServiceError::InternalServerError => {
                HttpResponse::InternalServerError().json("Internal Server Error, Please try later")
            }
            ServiceError::BadRequest => HttpResponse::BadRequest().json("Bad Request. Try again."),
            ServiceError::NotFound => {
                HttpResponse::NotFound().json("Not Found. Try something else.")
            }
            ServiceError::Conflict => {
                HttpResponse::Conflict().json("Conflict. Try something else.")
            }
            ServiceError::Unauthorized => {
                HttpResponse::Unauthorized().json("Authenticate yourself.")
            }
            ServiceError::Forbidden => HttpResponse::Forbidden().json("Access forbidden."),
            ServiceError::JWKSFetchError => {
                HttpResponse::InternalServerError().json("Could not fetch JWKS")
            }
        }
    }
}
