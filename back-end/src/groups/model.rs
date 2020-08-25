use crate::schema::groups;
use crate::users::User;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Queryable, Insertable, Identifiable, Associations, AsChangeset)]
#[belongs_to(User)]
#[table_name = "groups"]
pub struct Group {
    pub id: Uuid,
    pub group_name: String,
    pub user_id: Uuid,
}
