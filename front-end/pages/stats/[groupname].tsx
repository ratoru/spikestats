import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Sidebar } from "../../components/Nav/Sidebar";
import { InfoCard } from "../../components/InfoCard";
import { GroupHeader } from "../../components/Nav/GroupHeader";
import { charPie, list, settings } from "../../util/icons";
import { Game, ServeTeam } from "../../util/types";
import { Settings } from "../../components/Settings";
import { Statistics } from "../../components/Statistics";
import { GameTable } from "../../components/Games/GameTable";

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

enum Tab {
  Stats,
  Games,
  Settings,
}

export default function Stats() {
  const router = useRouter();
  const { groupname, gId } = router.query;
  const [curTab, setCurTab] = useState<Tab>(Tab.Stats);

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
            <GroupHeader groupname={groupname} items={items} />
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
                  games={testGames}
                  players={[
                    { uuid: "1", name: "Raphael" },
                    { uuid: "2", name: "Oskar" },
                    { uuid: "4", name: "JC" },
                    { uuid: "5", name: "Jake" },
                  ]}
                />
              )}
              {curTab === Tab.Settings && (
                <Settings
                  group={{
                    groupname: "a",
                    id: "1",
                    players: [
                      { uuid: "1", name: "Raphael" },
                      { uuid: "2", name: "Oskar" },
                      { uuid: "4", name: "JC" },
                      { uuid: "5", name: "Jake" },
                    ],
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
