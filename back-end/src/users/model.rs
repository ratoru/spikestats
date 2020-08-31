use crate::schema::users;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Queryable, Identifiable)]
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub password: String,
}

#[derive(Deserialize, Serialize, Insertable)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub username: &'a str,
    pub password: &'a str,
}

#[derive(Deserialize, Serialize)]
pub struct InputUser {
    pub username: String,
    pub password: String,
}

#[derive(Deserialize, Serialize)]
pub struct ReturnUser {
    pub id: Uuid,
    pub username: String,
}
