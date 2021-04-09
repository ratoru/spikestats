import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { Sidebar } from "../../components/Nav/Sidebar";
import { InfoCard } from "../../components/InfoCard";
import { GroupHeader } from "../../components/Nav/GroupHeader";
import { charPie, list, settings } from "../../util/icons";
import { Game, ServeTeam, Player } from "../../util/types";
import { createStatsMap } from "../../util/calculations";
import { Settings } from "../../components/Settings";
import { Statistics } from "../../components/Statistics";
import { GameTable } from "../../components/GameTable";
import {
  teamSelection,
  scoreSelection,
  serveSelection,
  confirmSelection,
} from "../../components/Game/GameSwals";

const testGames: Game[] = [
  {
    id: "1",
    red_team: ["1", "4"],
    blue_team: ["2", "5"],
    score: [21, 12],
    serve: ServeTeam.Blue,
    date_played: new Date(),
  },
  {
    id: "2",
    red_team: ["2", "1"],
    blue_team: ["4", "5"],
    score: [21, 17],
    serve: ServeTeam.Blue,
    date_played: new Date(),
  },
  {
    id: "3",
    red_team: ["5", "1"],
    blue_team: ["2", "4"],
    score: [16, 21],
    serve: ServeTeam.Red,
    date_played: new Date(),
  },
];

const testPlayers: Player[] = [
  { uuid: "1", name: "Raphael" },
  { uuid: "2", name: "Oskar" },
  { uuid: "4", name: "JC" },
  { uuid: "5", name: "Jake" },
];

enum Tab {
  Stats,
  Games,
  Settings,
}

export default function Stats() {
  const router = useRouter();
  const { groupname, gId } = router.query;
  const [curTab, setCurTab] = useState<Tab>(Tab.Stats);

  const [games, setGames] = useState<Game[]>(testGames);
  const [players, setPlayers] = useState<Player[]>(testPlayers);

  const statsMap = createStatsMap(games, players);

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
        // try {
        //   await http.post("/games", {
        //     ...addedGame,
        //     serve: addedGame.serve ? true : false,
        //     group_id: gId,
        //   });
        // } catch (error) {
        //   errorToast.fire();
        //   setGames(oldGames);
        // }
      })
      .catch(() => {
        return;
      });
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo deleting this game!",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Yes, delete it!",
      focusConfirm: false,
      focusCancel: true,
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.value) {
        // const oldGames = games;
        const filteredGames = games.filter((game) => game["id"] !== id);
        setGames(filteredGames);
        // Call server here.
        // try {
        //   await http.delete(`/games/${id}`);
        // } catch {
        //   errorToast.fire({ title: "This game has already been deleted." });
        //   setGames(oldGames);
        // }
      }
    });
  };

  const items = [
    {
      title: "Stats",
      onClick: () => {
        setCurTab(Tab.Stats);
      },
      icon: charPie,
      isActive: curTab === Tab.Stats,
    },
    {
      title: "Games",
      onClick: () => {
        setCurTab(Tab.Games);
      },
      icon: list,
      isActive: curTab === Tab.Games,
    },
    {
      title: "Settings",
      onClick: () => {
        setCurTab(Tab.Settings);
      },
      icon: settings,
      isActive: curTab === Tab.Settings,
    },
  ];

  return (
    <div>
      <Head>
        <title>Stats</title>
        <link
          rel="shortcut icon"
          type="image/svg+xml"
          href="/spikestats-icon.svg"
        />
      </Head>
      <main className="bg-gray-100 h-screen overflow-hidden">
        <div className="flex items-start justify-between h-full">
          <Sidebar items={items} />
          <div className="flex flex-col w-full h-full md:ml-4 md:pl-0 p-4 md:space-y-4 items-center">
            <GroupHeader
              groupname={String(groupname)}
              items={items}
              onAdd={handleAdd}
            />
            <div className="overflow-auto flex flex-col w-full h-full">
              {curTab === Tab.Stats && games.length > 0 && (
                <Statistics stats={statsMap} />
              )}
              {curTab === Tab.Games && games.length > 0 && (
                <GameTable
                  games={games}
                  players={players}
                  onDelete={handleDelete}
                />
              )}
              {(curTab === Tab.Stats || curTab === Tab.Games) &&
                games.length === 0 && (
                  <div className="w-full h-full flex justify-center items-center">
                    <InfoCard
                      title="Game"
                      info="Just what you think it is! Seems like you have no games yet. Add a game by clicking play."
                    />
                  </div>
                )}
              {curTab === Tab.Settings && (
                <Settings
                  gId={String(gId)}
                  groupname={String(groupname)}
                  players={players}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
