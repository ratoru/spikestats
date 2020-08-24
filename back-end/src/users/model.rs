use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize)]
// #[table_name = "users"]
pub struct User {
    pub id: Uuid,
    pub name: String,
    pub password: String,
}
