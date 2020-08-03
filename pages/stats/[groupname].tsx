import React, { useState } from "react";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import { MainBar } from "../../components/MainBar";
import { NavStats } from "../../components/NavStats";
import { GameTable } from "../../components/GameTable";
import { Game, Players, ServeTeam } from "../../types";

export default function Stats() {
  const router = useRouter();
  const { groupname } = router.query;

  const tab1 = <Typography>{groupname}</Typography>;

  // For testing
  const examplePlayers: Players = new Map([
    [0, "Raphael"],
    [1, "Alex"],
    [2, "Valentin"],
    [3, "Sonam"],
  ]);

  const exampleGames: Game[] = [
    {
      id: 0,
      blueTeam: [0, 3],
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

  const handleAdd = () => {
    console.log("Add Game");
    // Doesn't update GameTable at the moment.
    const dummyGame: Game = {
      id: 5,
      blueTeam: [1, 2],
      redTeam: [3, 0],
      score: [21, 10],
      serve: ServeTeam.Blue,
      date: new Date(),
    };
    setGames((games) => [...games, dummyGame]);
  };

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
