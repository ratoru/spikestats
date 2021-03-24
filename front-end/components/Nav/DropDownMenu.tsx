import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";

interface Props {
  label?: string;
  icon?: JSX.Element;
  items: DDMItem[];
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
    <div className="relative inline-block text-left mr-2">
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
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      )}
      <Transition
        show={isOpen}
        className="fixed inset-0 flex flex-col justify-center align-middle w-full h-full bg-gray-50 z-30"
      >
        {props.items.map((item) => {
          return (
            <Link href={item.link || "#"} key={item.label}>
              <a
                className={`${
                  item.icon ? "flex items-center" : "block"
                } block py-4 text-xl text-gray-900 hover:shadow-lg rounded-lg hover:text-gray-900`}
                role="menuitem"
              >
                {item.icon}

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
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          id="options-menu"
          className="flex justify-center mt-8 text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </Transition>
    </div>
  );
};
