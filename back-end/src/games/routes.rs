use crate::auth_handler::authorize_user;
use crate::error_handler::ServiceError;
use crate::games::Game;
use crate::groups::Group;
use crate::schema::{games, groups};
use crate::Pool;
use actix_web::{delete, get, post, web, HttpResponse};
use diesel::{BelongingToDsl, QueryDsl, RunQueryDsl};
use uuid::Uuid;

#[get("/games/{group_id}")]
async fn find_games_by_id(
    group_id: web::Path<Uuid>,
    db: web::Data<Pool>,
    http_req: web::HttpRequest,
) -> Result<HttpResponse, ServiceError> {
    authorize_user(http_req)?;
    Ok(web::block(move || get_all_games(db, group_id.into_inner()))
        .await
        .map(|game| HttpResponse::Ok().json(game))?)
}

fn get_all_games(pool: web::Data<Pool>, group_id: Uuid) -> Result<Vec<Game>, ServiceError> {
    let conn = pool.get().map_err(|_| ServiceError::InternalServerError)?;
    let group = groups::table.find(group_id).first::<Group>(&conn)?;
    let game_list = Game::belonging_to(&group).load::<Game>(&conn)?;
    Ok(game_list)
}

#[post("/games")]
async fn add_game(
    db: web::Data<Pool>,
    game: web::Json<Game>,
    http_req: web::HttpRequest,
) -> Result<HttpResponse, ServiceError> {
    authorize_user(http_req)?;
    Ok(web::block(move || add_single_game(db, game.into_inner()))
        .await
        .map(|_| HttpResponse::Created().finish())?)
}

fn add_single_game(db: web::Data<Pool>, game: Game) -> Result<(), ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    diesel::insert_into(games::table)
        .values(&game)
        .execute(&conn)?;
    Ok(())
}

#[delete("/games/{id}")]
async fn delete_game(
    db: web::Data<Pool>,
    id: web::Path<Uuid>,
    http_req: web::HttpRequest,
) -> Result<HttpResponse, ServiceError> {
    authorize_user(http_req)?;
    Ok(web::block(move || delete_single_game(db, id.into_inner()))
        .await
        .map(|count| HttpResponse::Ok().json(count))?)
}

fn delete_single_game(db: web::Data<Pool>, id: Uuid) -> Result<usize, ServiceError> {
    let conn = db.get().map_err(|_| ServiceError::InternalServerError)?;
    let count = diesel::delete(games::table.find(id)).execute(&conn)?;
    Ok(count)
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find_games_by_id);
    config.service(add_game);
    config.service(delete_game);
}
