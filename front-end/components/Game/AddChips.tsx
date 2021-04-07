import React, { useState } from "react";
import { PlayerChip } from "./PlayerChip";
import { Player } from "../../util/types";

interface PlayerChip {
  label: string;
  isBlue: boolean;
  isRed: boolean;
  disabled: boolean;
  id: string;
}

interface AddChipsProps {
  players: Player[];
  onSelect: (id: string, isBlue: boolean) => void;
  onDelete: (id: string, isBlue: boolean) => void;
}

function selectChip(oldChip: PlayerChip, allChips: PlayerChip[]): PlayerChip {
  let numBlue = 0;
  let numRed = 0;
  for (let chip of allChips) {
    if (chip.isBlue) {
      numBlue++;
    } else if (chip.isRed) {
      numRed++;
    }
  }
  const isBlue = numBlue < 2;
  const isRed = !isBlue && numRed < 2;
  return { ...oldChip, isBlue: isBlue, isRed: isRed };
}

function needToDisable(allChips: PlayerChip[]): boolean {
  return allChips.filter((chip) => chip.isBlue || chip.isRed).length >= 4;
}

export const AddChips: React.FC<AddChipsProps> = ({
  players,
  onSelect,
  onDelete,
}) => {
  const initialChips: PlayerChip[] = [];
  players.map((player) => {
    initialChips.push({
      label: player.name,
      isBlue: false,
      isRed: false,
      disabled: false,
      id: player.uuid,
    });
  });
  const [chips, setChips] = useState<PlayerChip[]>(initialChips);

  const handleClick = (index: number) => {
    let newChips = [...chips];
    newChips[index] = selectChip(newChips[index], newChips);
    if (needToDisable(newChips)) {
      newChips = newChips.map((chip) => {
        return { ...chip, disabled: !(chip.isBlue || chip.isRed) };
      });
    }
    onSelect(newChips[index].id, newChips[index].isBlue);
    setChips(newChips);
  };

  const handleDelete = (index: number) => {
    let newChips = [...chips];
    onDelete(newChips[index].id, newChips[index].isBlue);
    newChips[index] = { ...newChips[index], isBlue: false, isRed: false };
    if (!needToDisable(newChips)) {
      newChips = newChips.map((chip) => {
        return { ...chip, disabled: false };
      });
    }
    setChips(newChips);
  };

  return (
    <div className="w-full h-full grid grid-cols-2 gap-4">
      <div className="text-lg font-medium mx-auto col-span-1">Blue Team</div>
      <div className="text-lg font-medium mx-auto col-span-1">Red Team</div>
      <div className="col-span-1 flex flex-col justify-around items-center">
        {chips.map((chip, index) => {
          if (chip.isBlue) {
            return (
              <PlayerChip
                key={chip.id}
                name={chip.label}
                color="blue"
                onClick={() => handleDelete(index)}
                isSelected={true}
              />
            );
          }
        })}
      </div>
      <div className="col-span-1 flex flex-col justify-around items-center">
        {chips.map((chip, index) => {
          if (chip.isRed) {
            return (
              <PlayerChip
                key={chip.id}
                name={chip.label}
                color="red"
                onClick={() => handleDelete(index)}
                isSelected={true}
              />
            );
          }
        })}
      </div>
      <div className="col-span-2 flex justify-around items-center flex-wrap">
        {chips.map((chip, index) => {
          if (!(chip.isBlue || chip.isRed)) {
            return (
              <PlayerChip
                key={chip.id}
                name={chip.label}
                color="gray"
                onClick={() => handleClick(index)}
                isSelected={false}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
