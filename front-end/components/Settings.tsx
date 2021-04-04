import React from "react";
import { Group } from "../util/types";
import { trash, group as groupIcon } from "../util/icons";

interface Props {
  group: Group;
}

export const Settings: React.FC<Props> = ({ group }) => {
  return (
    <>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Your Group
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Always wanted to give yourself a different name? Do it here. Don't
              forget to save.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div className="shadow rounded-md overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="group_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Group Name
                    </label>
                    <div className="m-3 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <span className="w-4 h-4 flex items-center justify-center">
                          {groupIcon}
                        </span>
                      </span>
                      <input
                        type="text"
                        name="group_name"
                        id="group_name"
                        className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder={group.groupname}
                      />
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="player 1"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Players
                    </label>
                    {group.players.map((player, index) => {
                      return (
                        <div
                          className="m-3 flex rounded-md shadow-sm"
                          key={player.uuid}
                        >
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            {index + 1}
                          </span>
                          <input
                            type="text"
                            name={`player ${index + 1}`}
                            id={`player ${index + 1}`}
                            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder={player.name}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden sm:block w-full" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0 w-full">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-red-600">
                Danger Zone
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Any changes here cannot be undone.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 pb-5">
            <div className="flex h-12">
              <button className="m-auto inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <span className="w-5 h-5 mr-2 flex justify-center items-center">
                  {trash}
                </span>
                Delete Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
