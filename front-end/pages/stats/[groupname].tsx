import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Sidebar } from "../../components/Nav/Sidebar";
import { InfoCard } from "../../components/InfoCard";
import { GroupHeader } from "../../components/Nav/GroupHeader";
import { charPie, list, play, settings } from "../../util/icons";

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
      <main className="bg-gray-100 h-screen overflow-hidden relative">
        <div className="flex items-start justify-between h-full">
          <Sidebar items={items} />
          <div className="flex flex-col w-full h-full md:pl-0 p-4 md:space-y-4 items-center">
            <GroupHeader groupname={groupname} items={items} />
            <div className="overflow-auto flex flex-col w-full h-full items-center justify-center">
              <InfoCard
                title="Game"
                info="Just what you think it is! You need to add a game before you can see your statistics. Add a game by clicking play!"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
