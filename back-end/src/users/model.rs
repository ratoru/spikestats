use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Queryable)]
pub struct User {
    pub id: Uuid,
    pub user_name: String,
    pub password: String,
}
