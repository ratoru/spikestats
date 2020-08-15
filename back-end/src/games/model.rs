use chrono::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize)]
// #[table_name = "groups"]
pub struct Game {
    pub id: Uuid,
    pub blue_team: (Uuid, Uuid),
    pub red_team: (Uuid, Uuid),
    pub score: (u32, u32),
    pub serve: bool,
    pub date: DateTime<Local>,
    pub group_id: Uuid,
}
