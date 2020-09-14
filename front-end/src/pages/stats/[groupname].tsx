import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Typography from "@material-ui/core/Typography";
import { MyHeader } from "../../components/common/MyHeader";
import { NavStats } from "../../components/NavStats";
import { GameTable } from "../../components/GameTable";
import { AllCharts } from "../../components/AllCharts";
import { CenteredMessage } from "../../components/common/CenteredMessage";
import { Game, Players, ServeTeam } from "../../util/types";
import {
  teamSelection,
  scoreSelection,
  serveSelection,
  confirmSelection,
  errorToast,
} from "../../util/swals";
import { playerVecToMap } from "../../util/utils";
import { withAuth } from "../../components/authentication/withAuth";
import { LoadingAn } from "../../components/common/LoadingAn";
import { richAndColorfulTheme } from "../../components/layout/themes";
import http from "../../services/httpService";

export default withAuth(function Stats() {
  const router = useRouter();
  const { groupname, gId } = router.query;
  const [games, setGames] = useState<Game[]>([]);
  const [players, setPlayers] = useState<Players>();
  const [isLoading, setIsLoading] = useState(false);

  // Get data from server.
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get players.
        const playersResult = await http.get(`/players/${gId}`);
        setPlayers(playerVecToMap(playersResult.data));
        // Get games.
        const gamesResult = await http.get(`/games/${gId}`);
        setGames(gamesResult.data);
      } catch (error) {
        errorToast.fire();
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    // Call server here.
    const oldGames = games;
    setGames(games.filter((game) => game["id"] !== id));
    try {
      await http.delete(`/games/${id}`);
    } catch {
      errorToast.fire({ title: "This game has already been deleted." });
      setGames(oldGames);
    }
  };

  const handleAdd = async () => {
    const addedGame: Game = {
      id: uuidv4(),
      blue_team: ["", ""],
      red_team: ["", ""],
      score: [-1, -1],
      serve: ServeTeam.Blue,
      date_played: new Date(),
    };
    teamSelection(players)
      .then((curTeamSelection) => {
        addedGame.blue_team = curTeamSelection.blue_team;
        addedGame.red_team = curTeamSelection.red_team;
        return scoreSelection(players, curTeamSelection);
      })
      .then((curScore) => {
        addedGame.score = curScore;
        return serveSelection(
          players,
          { blue_team: addedGame.blue_team, red_team: addedGame.red_team },
          curScore
        );
      })
      .then((curServingTeam) => {
        addedGame.serve = curServingTeam;
        return confirmSelection(
          players,
          { blue_team: addedGame.blue_team, red_team: addedGame.red_team },
          addedGame.score,
          curServingTeam
        );
      })
      .then(async () => {
        const oldGames = games;
        // Insert here so that games always have the latest date possible when added. (for same user in 2 tabs.)
        addedGame.date_played = new Date();
        setGames((games) => [...games, addedGame]);
        // Call server!
        try {
          await http.post("/games", {
            ...addedGame,
            serve: addedGame.serve ? true : false,
            group_id: gId,
          });
        } catch (error) {
          errorToast.fire();
          setGames(oldGames);
        }
      })
      .catch(() => {
        return;
      });
  };

  const tab1 = games.length ? (
    <AllCharts groupname={groupname} games={games} players={players} />
  ) : (
    <CenteredMessage
      header="No games yet."
      paragraph="Add games by clicking the button below."
    />
  );
  const tab2 = (
    <GameTable onDelete={handleDelete} games={games} players={players} />
  );

  return (
    <React.Fragment>
      <MyHeader isLoggedIn={true} />
      <NavStats
        tab1Content={
          isLoading ? (
            <LoadingAn
              type="spin"
              color={richAndColorfulTheme.palette.primary.main}
            />
          ) : (
            tab1
          )
        }
        tab2Content={tab2}
        onAdd={handleAdd}
      />
    </React.Fragment>
  );
});
