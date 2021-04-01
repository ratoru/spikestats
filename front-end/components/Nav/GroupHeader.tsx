import React from "react";
import { GroupDropDown } from "./GroupDropDown";
import { SidebarElem } from "./Sidebar";
import { play } from "../../util/icons";

interface Props {
  groupname: string | string[];
  items: SidebarElem[];
}

export const GroupHeader: React.FC<Props> = ({ groupname, items }) => {
  return (
    <header className="w-full flex px-8 py-4 justify-between bg-white shadow-lg rounded-2xl md:bg-transparent md:shadow-none md:rounded-none">
      <div className="md:hidden">
        <GroupDropDown items={items} />
      </div>
      <h1 className="text-center text-2xl md:text-3xl my-auto font-bold tracking-wide">
        {groupname}
      </h1>
      <button className="flex items-center px-6 py-2 uppercase font-semibold tracking-wide rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none">
        <span className="w-6 h-6 mr-2">{play}</span>
        Play
      </button>
    </header>
  );
};
