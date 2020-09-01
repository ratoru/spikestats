use crate::schema::groups;
use crate::users::User;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Queryable, Insertable, Identifiable, Associations, AsChangeset)]
#[belongs_to(User)]
#[table_name = "groups"]
pub struct Group {
    pub id: Uuid,
    pub groupname: String,
    #[serde(skip_serializing)]
    pub user_id: Uuid,
}

#[derive(Deserialize)]
pub struct InputGroup {
    pub id: Uuid,
    pub groupname: String,
}
