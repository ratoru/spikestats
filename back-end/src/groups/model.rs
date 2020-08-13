use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize)]
pub struct Group {
    pub user_id: Uuid,
    pub id: Uuid,
    pub name: String,
}
