import React from "react";
import { StepCard } from "./StepCard";
import { plus, serveSmall, check } from "../../util/icons";

interface Props {
  step: number;
  hasSelected: boolean;
}

export const Steps: React.FC<Props> = ({ step, hasSelected }) => {
  let barStyles = "bg-green-300 py-1 rounded ";
  if (step === 0) {
    barStyles += "w-0";
  } else if (step === 4) {
    barStyles += "w-full";
  } else {
    barStyles += `w-${step}/4`;
  }
  return (
    <div className="w-4/5 py-6 grid grid-cols-7 gap-4 mx-auto">
      <div className="col-span-1 flex flex-col items-center justify-center">
        <StepCard
          title="Make Teams"
          color="bg-green-400"
          icon={plus}
          isActive={true}
        />
      </div>

      <div className="col-span-2">
        <div className="w-full mt-4 bg-gray-200 rounded items-center align-middle align-center flex-1">
          <div className={barStyles}></div>
        </div>
      </div>

      <div className="col-span-1 flex flex-col items-center justify-center">
        <StepCard
          title="Pick Serve"
          color="bg-green-400"
          icon={serveSmall}
          isActive={step === 4}
        />
      </div>

      <div className="col-span-2">
        <div className="w-full mt-4 bg-gray-200 rounded items-center align-middle align-center flex-1">
          <div
            className={`w-${
              hasSelected ? `full` : `0`
            } bg-green-300 py-1 rounded`}
          />
        </div>
      </div>

      <div className="col-span-1 flex flex-col items-center justify-center">
        <StepCard
          title="Play Game"
          color="bg-green-400"
          icon={check}
          isActive={hasSelected}
        />
      </div>
    </div>
  );
};
