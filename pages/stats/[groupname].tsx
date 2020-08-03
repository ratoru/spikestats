import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MainBar } from "../../components/MainBar";
import { NavStats } from "../../components/NavStats";
import { GameTable } from "../../components/GameTable";
import { Game, Players, ServeTeam, Team } from "../../util/types";
import { AddChips } from "../../components/AddChips";
import Typography from "@material-ui/core/Typography";

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
    const emptyTeamBlue: Team = [-1, -1];
    const emptyTeamRed: Team = [-1, -1];
    const selectedTeams = { blueTeam: emptyTeamBlue, redTeam: emptyTeamRed };
    const handleSelectPlayer = (id: number, isBlue: boolean) => {
      if (isBlue) {
        if (selectedTeams.blueTeam[0] === -1) {
          selectedTeams.blueTeam[0] = id;
        } else {
          selectedTeams.blueTeam[1] = id;
        }
      } else {
        if (selectedTeams.redTeam[0] === -1) {
          selectedTeams.redTeam[0] = id;
        } else {
          selectedTeams.redTeam[1] = id;
        }
      }
    };
    const handleRemovePlayer = (id: number, isBlue: boolean) => {
      if (isBlue) {
        if (selectedTeams.blueTeam[0] === id) {
          selectedTeams.blueTeam[0] = -1;
        } else {
          selectedTeams.blueTeam[1] = -1;
        }
      } else {
        if (selectedTeams.redTeam[0] === id) {
          selectedTeams.redTeam[0] = -1;
        } else {
          selectedTeams.redTeam[1] = -1;
        }
      }
    };
    const AddGameSwal = withReactContent(Swal);
    // I could also use preConfirm to check.
    await AddGameSwal.fire({
      title: "Add Game",
      html: (
        <AddChips
          players={examplePlayers}
          teams={selectedTeams}
          onSelect={handleSelectPlayer}
          onDelete={handleRemovePlayer}
        />
      ),
      showCancelButton: true,
      footer: "You must select exactly four players.",
      progressSteps: ["1", "2", "3"],
      currentProgressStep: "0",
    }).then((result) => {
      if (result.dismiss) {
        return;
      }
      console.log(selectedTeams);
    });
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

  const tab1 = <Typography>{groupname}</Typography>;
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
