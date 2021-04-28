table! {
    games (id) {
        id -> Uuid,
        blue_team -> Array<Uuid>,
        red_team -> Array<Uuid>,
        score -> Array<Int2>,
        serve -> Bool,
        date_played -> Timestamptz,
        group_id -> Uuid,
    }
}

table! {
    groups (id) {
        id -> Uuid,
        groupname -> Text,
        user_id -> Uuid,
    }
}

table! {
    players (id) {
        id -> Uuid,
        playername -> Text,
        group_id -> Uuid,
    }
}

joinable!(games -> groups (group_id));
joinable!(players -> groups (group_id));

allow_tables_to_appear_in_same_query!(
    games,
    groups,
    players,
);
