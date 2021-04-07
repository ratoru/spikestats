import React from "react";

interface Props {
  name: string;
  color: string;
}

export const PlayerChip: React.FC<Props> = ({ name, color }) => {
  return (
    <div
      className={`bg-${color}-200 text-${color}-600 py-2 px-5 shadow rounded-full text-lg font-medium m-2`}
    >
      {name}
    </div>
  );
};
