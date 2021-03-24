import Head from "next/head";
import { MainHeader } from "../components/Nav/MainHeader";
import { PersonalInfo } from "../components/PersonalInfo";

export default function Home() {
  return (
    <div>
      <Head>
        <title>About</title>
        <link
          rel="shortcut icon"
          type="image/svg+xml"
          href="/spikestats-icon.svg"
        />
      </Head>
      <body className="flex flex-col  align-middle bg-gray-50 w-screen h-screen">
        <MainHeader />
        <h1 className="text-2xl text-center tracking-wide font-extrabold m-4 text-gray-900">
          ABOUT
        </h1>
        <div className="flex flex-col align-middle max-w-md mx-auto px-4">
          <h2 className="text-xl text-green-600 font-bold text-center mt-12">
            Constraints
          </h2>
          <p className="mt-2 text-gray-900">
            This is a personal project of mine. As such, this web app uses
            Vercel's and Heroku's free plan. This means... <br />
            1) if no one used the website for a long time it will take
            significantly longer to load. <br />
            2) my database has a very limited amount of storage. If the database
            is full this website won't work anymore. <br />
            If you'd like to contribute, you're more than welcome to reach out
            to me.
          </p>
          <div className="mt-12">
            <h2 className="text-xl text-green-600 font-bold text-center">
              Contributions
            </h2>
            <p className="mt-2 text-gray-900">
              Special thanks to Christina Joo for helping me with the logo
              design.
            </p>
          </div>
        </div>
        <PersonalInfo />
      </body>
    </div>
  );
}
