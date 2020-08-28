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
pub struct NewUser<'a> {
    pub user_name: &'a str,
    pub password: &'a str,
}

#[derive(Deserialize, Serialize)]
pub struct InputUser {
    pub user_name: String,
    pub password: String,
}

#[derive(Deserialize, Serialize)]
pub struct ReturnUser {
    pub id: Uuid,
    pub user_name: String,
}
