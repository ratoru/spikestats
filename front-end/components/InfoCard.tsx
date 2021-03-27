import React from "react";

interface Props {
  title: string;
  info: string;
}

export const InfoCard: React.FC<Props> = ({ title, info }) => {
  return (
    <div className="w-4/5 sm:w-1/2 md:w-1/2 lg:w-1/3 px-4 py-4 bg-white mt-11  shadow-lg rounded-lg">
      <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-green-500 text-white -mt-10">
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
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <h3 className="text-2xl sm:text-xl text-gray-700 text-center font-semibold mt-4">
        {title}
      </h3>
      <p className="text-md text-justify text-gray-500 p-4">{info}</p>
    </div>
  );
};
