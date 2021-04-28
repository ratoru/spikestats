import Head from "next/head";
import { MainHeader } from "../components/Nav/MainHeader";
import { GroupList } from "../components/Group/GroupList";

export default function Groups() {
  return (
    <div>
      <Head>
        <title>Your Groups</title>
        <link
          rel="shortcut icon"
          type="image/svg+xml"
          href="/spikestats-icon.svg"
        />
      </Head>
      <div className="flex flex-col bg-gray-100 w-screen min-h-screen">
        <MainHeader loggedIn />
        <h1 className="text-2xl text-center tracking-wide font-extrabold m-4 text-gray-900">
          Your Groups
        </h1>
        <GroupList />
      </div>
    </div>
  );
}
