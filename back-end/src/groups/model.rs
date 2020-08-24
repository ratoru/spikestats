use crate::schema::groups;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Queryable, Insertable)]
#[table_name = "groups"]
pub struct Group {
    pub id: Uuid,
    pub name: String,
    pub user_id: Uuid,
}
