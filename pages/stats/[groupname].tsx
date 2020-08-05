import React, { useState } from "react";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import { MainBar } from "../../components/MainBar";
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
import { group } from "console";

export default function Stats() {
  const router = useRouter();
  const { groupname } = router.query;

  // For testing
  const examplePlayers: Players = new Map([
    [0, "Raphael"],
    [1, "Alex"],
    [2, "Valentin"],
    [3, "Sonam"],
    [4, "Timon"],
  ]);

  const exampleGames: Game[] = [
    {
      id: 0,
      blueTeam: [4, 3],
      redTeam: [1, 2],
      score: [21, 17],
      serve: ServeTeam.Blue,
      date: new Date(),
    },
    {
      id: 1,
      blueTeam: [0, 1],
      redTeam: [3, 2],
      score: [10, 21],
      serve: ServeTeam.Red,
      date: new Date(),
    },
  ];
  const [games, setGames] = useState(exampleGames);
  const handleDelete = (id: number) => {
    console.log("Delete this game from the server.", id);
    setGames(games.filter((game) => game["id"] !== id));
  };

  const handleAdd = async () => {
    const addedGame: Game = {
      id: 100,
      blueTeam: [-1, -1],
      redTeam: [-1, -1],
      score: [-1, -1],
      serve: ServeTeam.Blue,
      date: new Date(),
    };
    teamSelection(examplePlayers)
      .then((curTeamSelection) => {
        addedGame.blueTeam = curTeamSelection.blueTeam;
        addedGame.redTeam = curTeamSelection.redTeam;
        return scoreSelection(examplePlayers, curTeamSelection);
      })
      .then((curScore) => {
        addedGame.score = curScore;
        return serveSelection(
          examplePlayers,
          { blueTeam: addedGame.blueTeam, redTeam: addedGame.redTeam },
          curScore
        );
      })
      .then((curServingTeam) => {
        addedGame.serve = curServingTeam;
        return confirmSelection(
          examplePlayers,
          { blueTeam: addedGame.blueTeam, redTeam: addedGame.redTeam },
          addedGame.score,
          curServingTeam
        );
      })
      .then(() => {
        setGames((games) => [...games, addedGame]);
        // Call server!
      })
      .catch(() => {
        return;
      });
  };

  const tab1 = (
    <AllCharts groupname={groupname} games={games} players={examplePlayers} />
  );
  const tab2 = (
    <GameTable onDelete={handleDelete} games={games} players={examplePlayers} />
  );

  return (
    <React.Fragment>
      <MainBar />
      <NavStats tab1Content={tab1} tab2Content={tab2} onAdd={handleAdd} />
    </React.Fragment>
  );
}
