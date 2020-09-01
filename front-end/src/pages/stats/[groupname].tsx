import React, { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Typography from "@material-ui/core/Typography";
// import { MainBar } from "../../components/appBars/MainBar";
import { LoggedInMenu } from "../../components/menus/LoggedInMenu";
import { NavStats } from "../../components/NavStats";
import { GameTable } from "../../components/GameTable";
import { AllCharts } from "../../components/AllCharts";
import { Game, Players, ServeTeam } from "../../util/types";
import {
  teamSelection,
  scoreSelection,
  serveSelection,
  confirmSelection,
} from "../../util/swals";
import { withAuth } from "../../components/authentication/withAuth";

export default withAuth(function Stats() {
  const router = useRouter();
  const { groupname } = router.query;

  const [games, setGames] = useState<Game[]>([]);
  const players: Players = new Map();

  const handleDelete = (id: string) => {
    // Call server here.
    setGames(games.filter((game) => game["id"] !== id));
  };

  const handleAdd = async () => {
    const addedGame: Game = {
      id: uuidv4(),
      blueTeam: ["", ""],
      redTeam: ["", ""],
      score: [-1, -1],
      serve: ServeTeam.Blue,
      date_played: new Date(),
    };
    teamSelection(players)
      .then((curTeamSelection) => {
        addedGame.blueTeam = curTeamSelection.blueTeam;
        addedGame.redTeam = curTeamSelection.redTeam;
        return scoreSelection(players, curTeamSelection);
      })
      .then((curScore) => {
        addedGame.score = curScore;
        return serveSelection(
          players,
          { blueTeam: addedGame.blueTeam, redTeam: addedGame.redTeam },
          curScore
        );
      })
      .then((curServingTeam) => {
        addedGame.serve = curServingTeam;
        return confirmSelection(
          players,
          { blueTeam: addedGame.blueTeam, redTeam: addedGame.redTeam },
          addedGame.score,
          curServingTeam
        );
      })
      .then(() => {
        // Insert here so that games always have the latest date possible when added. (for same user in 2 tabs.)
        addedGame.date_played = new Date();
        setGames((games) => [...games, addedGame]);
        // Call server!
      })
      .catch(() => {
        return;
      });
  };

  const tab1 = games.length ? (
    <AllCharts groupname={groupname} games={games} players={players} />
  ) : (
    <Typography variant="h5" style={{ textAlign: "center" }}>
      There is no data to display yet. Add games by clicking the button below.
    </Typography>
  );
  const tab2 = (
    <GameTable onDelete={handleDelete} games={games} players={players} />
  );

  return (
    <React.Fragment>
      <LoggedInMenu />
      <NavStats tab1Content={tab1} tab2Content={tab2} onAdd={handleAdd} />
    </React.Fragment>
  );
});
