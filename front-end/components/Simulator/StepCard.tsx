import React from "react";

interface Props {
  title: string;
  color: string;
  icon: JSX.Element;
  isActive: boolean;
}

export const StepCard: React.FC<Props> = ({ title, color, icon, isActive }) => {
  return (
    <>
      <div
        className={`w-10 h-10 rounded-full text-lg text-white flex items-center justify-center ${
          isActive ? `bg-${color}` : `bg-white border-2 border-gray-200`
        }`}
      >
        <span
          className={`text-center ${isActive ? `text-white` : `text-gray-600`}`}
        >
          {icon}
        </span>
      </div>
      <div className="text-xs text-center md:text-base mt-2 text-gray-600">
        {title}
      </div>
    </>
  );
};
