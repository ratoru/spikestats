use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Queryable)]
pub struct Player {
    pub id: Uuid,
    pub name: String,
    pub group_id: Uuid,
}
