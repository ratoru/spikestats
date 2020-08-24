use crate::groups::Group;
use crate::schema::players;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Queryable, Insertable, Identifiable, Associations)]
#[belongs_to(Group)]
#[table_name = "players"]
pub struct Player {
    pub id: Uuid,
    pub player_name: String,
    pub group_id: Uuid,
}
