import React, { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
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

export default function Stats() {
  const router = useRouter();
  const { groupname } = router.query;

  // Testing
  const ids = {
    id1: "5abf58a4-7b23-44dc-b497-de518b6b9b8b",
    id2: "0a38dddb-07ef-498e-8d5f-0e02790c91e2",
    id3: "b9d3b52e-9ae9-4d50-9b2e-dc1d648831fb",
    id4: "e430c506-18eb-4b15-98da-938ebb8ee4c0",
    id5: "991acbc0-4969-4de0-9be2-c1b7771342a2",
  };
  // For testing
  const examplePlayers: Players = new Map([
    [ids.id1, "Raphael"],
    [ids.id2, "Alex"],
    [ids.id3, "Valentin"],
    [ids.id4, "Sonam"],
    [ids.id5, "Timon"],
  ]);

  const exampleGames: Game[] = [
    {
      id: uuidv4(),
      blueTeam: [ids.id1, ids.id5],
      redTeam: [ids.id2, ids.id4],
      score: [21, 14],
      serve: ServeTeam.Blue,
      date: new Date(2020, 7, 1, 9, 49, 0),
    },
    {
      id: uuidv4(),
      blueTeam: [ids.id2, ids.id1],
      redTeam: [ids.id5, ids.id4],
      score: [21, 8],
      serve: ServeTeam.Blue,
      date: new Date(2020, 7, 2, 10, 20, 0),
    },
    {
      id: uuidv4(),
      blueTeam: [ids.id1, ids.id3],
      redTeam: [ids.id2, ids.id5],
      score: [21, 17],
      serve: ServeTeam.Red,
      date: new Date(2020, 7, 3, 18, 1, 1),
    },
    {
      id: uuidv4(),
      blueTeam: [ids.id1, ids.id2],
      redTeam: [ids.id4, ids.id3],
      score: [10, 21],
      serve: ServeTeam.Red,
      date: new Date(2020, 7, 5, 5, 10, 18),
    },
    {
      id: uuidv4(),
      blueTeam: [ids.id1, ids.id3],
      redTeam: [ids.id4, ids.id2],
      score: [23, 21],
      serve: ServeTeam.Red,
      date: new Date(2020, 7, 5, 10, 11, 40),
    },
    {
      id: uuidv4(),
      blueTeam: [ids.id5, ids.id2],
      redTeam: [ids.id4, ids.id3],
      score: [15, 21],
      serve: ServeTeam.Red,
      date: new Date(),
    },
  ];
  const [games, setGames] = useState(exampleGames);
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

  const tab1 = games.length ? (
    <AllCharts groupname={groupname} games={games} players={examplePlayers} />
  ) : (
    <Typography variant="h5" style={{ textAlign: "center" }}>
      There is no data to display yet. Add games by clicking the button below.
    </Typography>
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
