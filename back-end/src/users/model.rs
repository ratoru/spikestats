use crate::schema::users;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Queryable, Identifiable)]
pub struct User {
    pub id: Uuid,
    pub user_name: String,
    pub password: String,
}

#[derive(Deserialize, Serialize, Insertable)]
#[table_name = "users"]
pub struct NewUser {
    pub user_name: String,
    pub password: String,
}
