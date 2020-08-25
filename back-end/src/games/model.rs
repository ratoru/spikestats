use crate::groups::Group;
use crate::schema::games;
use chrono::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Queryable, Insertable, Identifiable, Associations)]
#[belongs_to(Group)]
#[table_name = "games"]
pub struct Game {
    pub id: Uuid,
    pub blue_team: Vec<Uuid>,
    pub red_team: Vec<Uuid>,
    pub score: Vec<i16>,
    pub serve: bool,
    pub date_played: NaiveDateTime,
    pub group_id: Uuid,
}
