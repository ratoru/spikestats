import React from "react";
import Link from "next/link";
import { DropDownMenu } from "./DropDownMenu";

interface Props {
  loggedIn: boolean;
}

export const MainHeader: React.FC<Props> = ({ loggedIn }) => {
  return (
    <nav className="py-4 px-10">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href={loggedIn ? "/groups" : "/"}>
            <a className="flex-shrink-0">
              <img
                className="h-12 outline-none"
                src="/spikestats-logo.svg"
                alt="Logo"
              />
            </a>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/about">
                <a
                  className="text-gray-400 dark:text-white  hover:text-gray-800  px-3 py-2 rounded-md text-lg font-medium"
                  href="/"
                >
                  About
                </a>
              </Link>
              <a
                className="text-gray-400  hover:text-gray-800  px-3 py-2 rounded-md text-lg font-medium"
                href="https://github.com/ratoru/spikestats"
              >
                Code
              </a>
              <Link href="/faq">
                <a className="text-gray-400  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                  FAQ
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="md:hidden">
            <DropDownMenu
              items={[
                { label: "About", link: "/about" },
                { label: "Code", link: "https://github.com/ratoru/spikestats" },
                { label: "FAQ", link: "/faq" },
              ]}
              loggedIn={loggedIn}
            />
          </div>
          {!loggedIn && (
            <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-gray-50 bg-yellow-600 rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none hidden md:inline">
              Log In
            </button>
          )}
          {loggedIn && (
            <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-gray-50 bg-gray-400 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none hidden md:inline">
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
