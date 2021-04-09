import React from "react";

export const SimpleStat: React.FC = () => {
  return (
    <div className="rounded-lg shadow flex overflow-hidden">
      <svg
        id="visual"
        viewBox="0 0 900 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        version="1.1"
      >
        <rect x="0" y="0" width="900" height="600" fill="#1F2937"></rect>
        <defs>
          <linearGradient id="grad1_0" x1="33.3%" y1="0%" x2="100%" y2="100%">
            <stop offset="20%" stopColor="#1f2937" stopOpacity="1"></stop>
            <stop offset="80%" stopColor="#1f2937" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad2_0" x1="0%" y1="0%" x2="66.7%" y2="100%">
            <stop offset="20%" stopColor="#1f2937" stopOpacity="1"></stop>
            <stop offset="80%" stopColor="#1f2937" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <g transform="translate(900, 0)">
          <path
            d="M0 243.4C-17.9 231 -35.9 218.5 -58 216.4C-80.1 214.2 -106.4 222.2 -121.7 210.8C-137 199.3 -141.3 168.3 -146.4 146.4C-151.4 124.5 -157.2 111.7 -173.2 100C-189.2 88.3 -215.5 77.8 -228.9 61.3C-242.3 44.9 -242.9 22.4 -243.4 0L0 0Z"
            fill="#FBBF24"
          ></path>
        </g>
        <g transform="translate(0, 600)">
          <path
            d="M0 -243.4C23 -244.8 46 -246.2 62.4 -232.8C78.7 -219.4 88.4 -191.2 101.5 -175.8C114.6 -160.4 131 -157.6 152 -152C173.1 -146.4 198.8 -137.9 210.8 -121.7C222.7 -105.5 221 -81.6 224.1 -60C227.2 -38.5 235.3 -19.2 243.4 0L0 0Z"
            fill="#FBBF24"
          ></path>
        </g>
      </svg>
    </div>
  );
};
