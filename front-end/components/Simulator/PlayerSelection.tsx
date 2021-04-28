import React, { useState } from "react";
import Select from "react-select";
import { InfoCard } from "../InfoCard";
import { PlayerButton } from "../Game/PlayerButton";
import { Player } from "../../util/types";

interface Props {
  players: Player[];
  onContinue: (activePlayers: Player[], firstServe: number) => void;
}

export const PlayerSelection: React.FC<Props> = ({ players, onContinue }) => {
  const [grayChips, setGrayChips] = useState<Player[]>(players);
  const [blueChips, setBlueChips] = useState<Player[]>([]);
  const [redChips, setRedChips] = useState<Player[]>([]);
  const [selectedServe, setSelectedServe] = useState(null);

  const handleAdd = (index: number) => {
    let newChips = [...grayChips];
    if (blueChips.length < 2) {
      setBlueChips([...blueChips, grayChips[index]]);
    } else {
      setRedChips([...redChips, grayChips[index]]);
    }
    setGrayChips(newChips.filter((val, i) => i !== index));
  };

  const handleDelete = (index: number, isBlue: boolean) => {
    let newChips = [...(isBlue ? blueChips : redChips)];
    setGrayChips([...grayChips, newChips[index]]);
    if (isBlue) {
      setBlueChips(newChips.filter((val, i) => i !== index));
    } else {
      setRedChips(newChips.filter((val, i) => i !== index));
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-around">
      {blueChips.length === 0 && redChips.length === 0 && (
        <InfoCard
          title="Live Game"
          info="Here you can interactively play an entire game. Pick the two teams by clicking on the player names below. You always choose the blue team first. Afterwards select who has the first serve and hit 'Let's Go!'"
        />
      )}
      <div className="w-full grid grid-cols-2 gap-4">
        {(blueChips.length !== 0 || redChips.length !== 0) && (
          <>
            <div className="text-2xl font-semibold tracking-wide text-center col-span-1">
              Blue Team
            </div>
            <div className="text-2xl font-semibold tracking-wide text-center col-span-1">
              Red Team
            </div>
          </>
        )}

        <div className="col-span-1 flex flex-col justify-around items-center">
          {blueChips.map((chip, index) => {
            return (
              <PlayerButton
                key={chip.uuid}
                name={chip.name}
                color="blue"
                onClick={() => handleDelete(index, true)}
                isSelected={true}
                disabled={false}
              />
            );
          })}
        </div>
        <div className="col-span-1 flex flex-col justify-around items-center">
          {redChips.map((chip, index) => {
            return (
              <PlayerButton
                key={chip.uuid}
                name={chip.name}
                color="red"
                onClick={() => handleDelete(index, false)}
                isSelected={true}
                disabled={false}
              />
            );
          })}
        </div>
        <div className="col-span-2 flex justify-around items-center flex-wrap">
          {grayChips.map((chip, index) => {
            return (
              <PlayerButton
                key={chip.uuid}
                name={chip.name}
                color="gray"
                onClick={() => handleAdd(index)}
                isSelected={false}
                disabled={blueChips.length >= 2 && redChips.length >= 2}
              />
            );
          })}
        </div>

        {blueChips.length === 2 && redChips.length === 2 && (
          <div className="col-span-2 flex justify-center">
            <div className="w-4/5 md:w-1/3">
              <h3 className="text-2xl font-semibold tracking-wide text-center">
                Player with Serve
              </h3>
              <Select
                options={[
                  { value: 0, label: blueChips[0].name },
                  { value: 1, label: blueChips[1].name },
                  { value: 2, label: redChips[0].name },
                  { value: 3, label: redChips[1].name },
                ]}
                defaultValue={selectedServe}
                onChange={setSelectedServe}
                isClearable={true}
                isSearchable={true}
                autoFocus={true}
                placeholder="Select player..."
                className="mt-6"
              />
            </div>
          </div>
        )}
      </div>
      {selectedServe !== null && (
        <div className="col-span-2 flex justify-center">
          <button
            className="mt-8 inline-flex justify-center py-2 px-4 border border-transparent shadow-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() =>
              onContinue([...blueChips, ...redChips], selectedServe.value)
            }
          >
            Let's Go!
          </button>
        </div>
      )}
    </div>
  );
};
