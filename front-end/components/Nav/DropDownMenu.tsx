import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";

interface Props {
  label?: string;
  icon?: JSX.Element;
  items: DDMItem[];
  loggedIn: boolean;
}

export interface DDMItem {
  icon?: JSX.Element;
  label: string;
  desc?: string;
  link?: string;
}

export const DropDownMenu = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
          id="options-menu"
        >
          {props.label}

          {props.icon || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      )}
      <Transition
        show={isOpen}
        className="fixed inset-0 flex flex-col justify-center align-middle w-full h-full bg-gray-50 z-40"
      >
        {props.items.map((item) => {
          return (
            <Link href={item.link || "#"} key={item.label}>
              <a
                className={`${
                  item.icon ? "flex justify-center items-center" : "block"
                } py-4 text-xl text-gray-900 hover:shadow-lg rounded-lg hover:text-gray-900`}
                role="menuitem"
              >
                <div className="w-6 h-6 mr-4">{item.icon}</div>

                <span className="flex flex-col text-center">
                  <span>{item.label}</span>
                  {item.desc && (
                    <span className="text-gray-400 text-xs">{item.desc}</span>
                  )}
                </span>
              </a>
            </Link>
          );
        })}
        {props.loggedIn && (
          <Link href="/">
            <a
              className="flex items-center justify-center py-4 text-xl text-gray-900 hover:shadow-lg rounded-lg hover:text-gray-900"
              role="menuitem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 mr-2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span className="flex flex-col text-center">Log Out</span>
            </a>
          </Link>
        )}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          id="options-menu"
          className="flex justify-center mt-8 text-gray-900 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </button>
      </Transition>
    </div>
  );
};
