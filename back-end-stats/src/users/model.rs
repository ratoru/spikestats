use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize)]
pub struct User {
    pub id: Uuid,
    pub name: String,
    pub password: String,
}
