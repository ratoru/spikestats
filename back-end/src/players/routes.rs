use crate::auth_handler::authorize_user;
use crate::error_handler::ServiceError;
use crate::groups::Group;
use crate::players::Player;
use crate::schema::{groups, players};
use crate::Pool;
use actix_web::{get, post, put, web, HttpResponse};
use diesel::{BelongingToDsl, QueryDsl, RunQueryDsl};
use uuid::Uuid;

#[get("/players/{group_id}")]
async fn get_players_by_id(
    db: web::Data<Pool>,
    group_id: web::Path<Uuid>,
    http_req: web::HttpRequest,
) -> Result<HttpResponse, ServiceError> {
    authorize_user(http_req)?;
    Ok(
        web::block(move || get_group_players(db, group_id.into_inner()))
            .await
            .map(|player| HttpResponse::Ok().json(player))?,
    )
}

fn get_group_players(db: web::Data<Pool>, group_id: Uuid) -> Result<Vec<Player>, ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    let group = groups::table.find(group_id).first::<Group>(&conn)?;
    let player_list = Player::belonging_to(&group).load::<Player>(&conn)?;
    Ok(player_list)
}

#[post("/players")]
async fn add_players(
    db: web::Data<Pool>,
    players: web::Json<Vec<Player>>,
    http_req: web::HttpRequest,
) -> Result<HttpResponse, ServiceError> {
    authorize_user(http_req)?;
    Ok(web::block(move || insert_players(db, players.into_inner()))
        .await
        .map(|count| HttpResponse::Created().json(count))?)
}

fn insert_players(db: web::Data<Pool>, players: Vec<Player>) -> Result<usize, ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    let count = diesel::insert_into(players::table)
        .values(&players)
        .execute(&conn)?;
    Ok(count)
}

#[put("/players")]
async fn rename_player(
    db: web::Data<Pool>,
    new_player: web::Json<Player>,
    http_req: web::HttpRequest,
) -> Result<HttpResponse, ServiceError> {
    authorize_user(http_req)?;
    Ok(
        web::block(move || rename_single_player(db, new_player.into_inner()))
            .await
            .map(|_| HttpResponse::Ok().finish())?,
    )
}

fn rename_single_player(db: web::Data<Pool>, new_player: Player) -> Result<(), ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    diesel::update(&new_player)
        .set(&new_player)
        .execute(&conn)?;
    Ok(())
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(get_players_by_id);
    config.service(add_players);
    config.service(rename_player);
}
