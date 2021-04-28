import React from "react";
import Link from "next/link";

export const PersonalInfo: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-screen p-16">
      <Link href="https://github.com/ratoru">
        <a className="m-6 text-gray-900 hover:text-blue-600">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
      </Link>
      <Link href="https://ratoru.com">
        <a>
          <img
            src="/personal-picture.png"
            alt="Raphael's Foto"
            className="w-20 h-20 border-2 rounded-full border-gray-300 hover:border-yellow-600 outline-none"
          />
        </a>
      </Link>
      <Link href="https://www.linkedin.com/in/ratoru/">
        <a className="m-6 text-gray-900 hover:text-blue-600">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
      </Link>
    </div>
  );
};
