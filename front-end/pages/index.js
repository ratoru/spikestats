import Head from "next/head";
import { MainHeader } from "../components/Nav/MainHeader";

export default function Home() {
  return (
    <div>
      <Head>
        <title>SpikeStats</title>
        <link
          rel="shortcut icon"
          type="image/svg+xml"
          href="/spikestats-icon.svg"
        />
      </Head>
      <div className="flex flex-col bg-gray-100 w-screen min-h-screen">
        <MainHeader />
        <div className="m-auto text-center w-full py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Crown your champion!</span>
            <span className="block text-blue-500">
              Get your roundnet statistics today.
            </span>
          </h2>
          <p className="text-xl mt-4 max-w-md mx-auto text-gray-500">
            SpikeStats provides you and your friends with all relevant
            statistics for your roundnet games. Just add a game result and we do
            the rest.
          </p>
          <div className="lg:mt-0 lg:flex-shrink-0">
            <div className="mt-12 inline-flex rounded-md shadow-lg">
              <button
                type="button"
                className="py-4 px-6 bg-blue-600 hover:bg-blue-800 text-gray-50 w-full text-center text-base font-semibold shadow-md focus:outline-none rounded-lg "
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
