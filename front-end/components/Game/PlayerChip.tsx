import React from "react";

interface Props {
  name: string;
  color: string;
}

export const PlayerChip: React.FC<Props> = ({ name, color }) => {
  return (
    <div
      className={`bg-${color}-200 text-${color}-600 py-1 px-3 rounded-full text-sm m-2`}
    >
      {name}
    </div>
  );
};
