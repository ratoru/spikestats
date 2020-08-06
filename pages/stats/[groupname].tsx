import React, { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
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
      blueTeam: [ids.id1, ids.id3],
      redTeam: [ids.id2, ids.id5],
      score: [21, 17],
      serve: ServeTeam.Red,
      date: new Date(),
    },
    {
      id: uuidv4(),
      blueTeam: [ids.id1, ids.id2],
      redTeam: [ids.id4, ids.id3],
      score: [10, 21],
      serve: ServeTeam.Red,
      date: new Date(),
    },
  ];
  const [games, setGames] = useState(exampleGames);
  const handleDelete = (id: string) => {
    console.log("Delete this game from the server.", id);
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
