import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Sidebar } from "../../components/Nav/Sidebar";
import { InfoCard } from "../../components/InfoCard";
import { GroupHeader } from "../../components/Nav/GroupHeader";
import { charPie, list, settings } from "../../util/icons";
import { Game, ServeTeam, Player } from "../../util/types";
import { Settings } from "../../components/Settings";
import { Statistics } from "../../components/Statistics";
import { GameTable } from "../../components/Game/GameTable";

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

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert deleting this game!",
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
            <GroupHeader groupname={String(groupname)} items={items} />
            <div className="overflow-auto flex flex-col w-full h-full">
              {curTab === Tab.Stats && (
                <div className="m-auto">
                  <InfoCard
                    title="Game"
                    info="Just what you think it is! You need to add a game before you can see your statistics. Add a game by clicking play!"
                  />
                </div>
              )}
              {curTab === Tab.Games && (
                <GameTable
                  games={games}
                  players={players}
                  onDelete={handleDelete}
                />
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
