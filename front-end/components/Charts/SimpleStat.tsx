import React from "react";

interface Props {
  description: string;
  value: string;
}

export const SimpleStat: React.FC<Props> = ({ description, value }) => {
  return (
    <div className="text-center">
      <h4 className="text-sm uppercase text-gray-500 leading-tight">
        {description}
      </h4>
      <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
        {value}
      </h3>
    </div>
  );
};
