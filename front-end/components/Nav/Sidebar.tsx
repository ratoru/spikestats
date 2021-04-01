import React from "react";
import Link from "next/link";
import { home } from "../../util/icons";

export interface SidebarElem {
  title: string;
  onClick: () => void;
  icon?: JSX.Element;
  isActive?: boolean;
}

interface Props {
  items: SidebarElem[];
}

export const Sidebar: React.FC<Props> = ({ items }) => {
  return (
    <div className="h-screen w-72 p-4 hidden md:block">
      <div className="h-full w-full bg-white rounded-2xl shadow-xl flex-col flex items-center justify-between">
        <div className="w-full">
          <div className="h-12 my-8">
            <Link href="/groups">
              <a>
                <img src="/spikestats-logo.svg" className="h-full mx-auto" />
              </a>
            </Link>
          </div>
          {items.map((item) => {
            return (
              <div key={item.title} className="flex justify-between w-full">
                {item.isActive ? (
                  <button className="w-full font-thin uppercase text-blue-500 flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500 focus:outline-none">
                    <span className="text-left">{item.icon}</span>
                    <span className="mx-4 text-sm font-normal">
                      {item.title}
                    </span>
                  </button>
                ) : (
                  <button
                    className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500 focus:outline-none"
                    onClick={item.onClick}
                  >
                    <span className="text-left">{item.icon}</span>
                    <span className="mx-4 text-sm font-normal">
                      {item.title}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div>
          <Link href="/groups">
            <a
              className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500"
              href="#"
            >
              <span className="text-left">{home}</span>
              <span className="mx-4 text-sm font-normal">Groups</span>
            </a>
          </Link>
          <a
            className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500"
            href="#"
          >
            <span className="text-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </span>
            <span className="mx-4 text-sm font-normal">Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
};
