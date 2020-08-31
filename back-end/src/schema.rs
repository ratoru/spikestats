table! {
    games (id) {
        id -> Uuid,
        blue_team -> Array<Uuid>,
        red_team -> Array<Uuid>,
        score -> Array<Int2>,
        serve -> Bool,
        date_played -> Timestamp,
        group_id -> Uuid,
    }
}

table! {
    groups (id) {
        id -> Uuid,
        group_name -> Text,
        user_id -> Uuid,
    }
}

table! {
    players (id) {
        id -> Uuid,
        player_name -> Text,
        group_id -> Uuid,
    }
}

table! {
    users (id) {
        id -> Uuid,
        username -> Text,
        password -> Text,
    }
}

joinable!(games -> groups (group_id));
joinable!(groups -> users (user_id));
joinable!(players -> groups (group_id));

allow_tables_to_appear_in_same_query!(games, groups, players, users,);
