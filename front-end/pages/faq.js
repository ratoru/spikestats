import Head from "next/head";
import Link from "next/link";
import { MainHeader } from "../components/Nav/MainHeader";

export default function Faq() {
  return (
    <div>
      <Head>
        <title>FAQ</title>
        <link
          rel="shortcut icon"
          type="image/svg+xml"
          href="/spikestats-icon.svg"
        />
      </Head>
      <div className="flex flex-col  align-middle bg-gray-100 w-screen min-h-full">
        <MainHeader loggedIn={false} />
        <h1 className="text-2xl text-center tracking-wide font-extrabold m-4 text-gray-900 uppercase">
          FAQ
        </h1>
        <div className="flex flex-col align-middle max-w-md mx-auto px-4 pb-20">
          <h2 className="text-xl text-blue-600 font-bold text-center mt-12">
            How do you determine which player is the best?
          </h2>
          <p className="mt-2 text-gray-900 text-justify">
            Good question. I calculate a 95% confidence interval for each
            player's win rate and rank players by their lower bound. Why? Say
            Player 1 has a record of 20-3, and Player 2 has a record of 1-0. I
            think it's only fair to rank Player 1 higher until Player 2 plays
            more games. The method mentioned above accomplishes exactly this.
            For more info{" "}
            <Link href="https://www.evanmiller.org/how-not-to-sort-by-average-rating.html">
              <a className="text-yellow-600 hover:underline">read this</a>
            </Link>
            .
          </p>
          <div className="mt-12">
            <h2 className="text-xl text-blue-600 font-bold text-center">
              My account is not loading although it worked previously.
            </h2>
            <p className="mt-2 text-gray-900 text-justify">
              Make sure you always log in with the same information. If you
              originally logged in with your Google account, your statistics
              will be linked to that account. If you log in the second time with
              a different social media account, the website will treat you as a
              new user.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
