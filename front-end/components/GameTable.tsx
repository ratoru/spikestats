import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { Game, Player, ServeTeam, Team } from "../util/types";
import { teamToNames } from "../util/conversions";
import {
  trash,
  chevronLeft,
  chevronRight,
  chevronsLeft,
  chevronsRight,
} from "../util/icons";

interface Props {
  games: Game[];
  players: Player[];
  onDelete: (id: string) => void;
}

export const GameTable: React.FC<Props> = ({ games, players, onDelete }) => {
  const data = useMemo(() => games, [games]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Blue Team",
        accessor: "blue_team", // accessor is the "key" in the data
        Cell: ({ value }) => {
          return (
            <span className="w-full text-left">
              {teamToNames(value, players)}
            </span>
          );
        },
      },
      {
        Header: "Red Team",
        accessor: "red_team",
        Cell: ({ value }) => {
          return (
            <span className="w-full text-left">
              {teamToNames(value, players)}
            </span>
          );
        },
      },
      {
        Header: "Score",
        accessor: "score",
        Cell: ({ value }) => {
          return <span>{value.join(" : ")}</span>;
        },
      },
      {
        Header: "First Serve",
        accessor: "serve",
        Cell: ({ value }) => {
          return (
            <span
              className={`${
                value === ServeTeam.Blue
                  ? `bg-blue-200 text-blue-600`
                  : `bg-red-200 text-red-600`
              } py-1 px-3 rounded-full text-xs`}
            >
              {value === ServeTeam.Blue ? "Blue" : "Red"}
            </span>
          );
        },
      },
      {
        Header: "Date played",
        accessor: "date_played",
        Cell: ({ value }) => {
          return <span>{value.toDateString()}</span>;
        },
      },
      {
        Header: "Delete",
        id: "delete",
        accessor: (str) => "delete",

        Cell: (tableProps) => (
          <button
            className="transform hover:text-red-500 hover:scale-110 flex items-center justify-center"
            onClick={() => {
              onDelete(tableProps.row.original["id"]);
            }}
          >
            <span className="w-5 h-5 flex justify-center items-center">
              {trash}
            </span>
          </button>
        ),
      },
    ],
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable({ columns, data, initialState: { pageSize: 6 } }, usePagination);

  return (
    <>
      <div className="w-full lg:w-5/6 mx-auto">
        <table
          {...getTableProps()}
          className="w-full table-auto bg-white shadow-md overflow-hidden rounded-md mx-auto mt-4 md:mt-0"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
              >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="p-6 text-center">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody
            {...getTableBodyProps()}
            className="text-gray-600 text-sm font-light"
          >
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={`border-t border-gray-200 hover:bg-gray-100 ${
                    index % 2 === 1 ? `bg-gray-50` : ``
                  }`}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="p-6 text-left">
                        <div className="w-full flex justify-center items-center">
                          {cell.render("Cell")}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full md:w-5/6 flex justify-between items-center mx-auto mt-4">
        <p className="text-sm text-gray-700 ml-6">
          Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
          <span className="font-medium">{pageOptions.length}</span>
        </p>
        <div className="mr-6 flex align-middle">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="p-4 md:p-2 rounded-md hover:bg-white hover:shadow hover:text-gray-700 text-gray-500"
          >
            {chevronsLeft}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="p-4 md:p-2 rounded-md hover:bg-white hover:shadow hover:text-gray-700 text-gray-500"
          >
            {chevronLeft}
          </button>
          <span className="p-4 md:p-2 font-medium text-gray-700">
            {pageIndex + 1}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="p-4 md:p-2 rounded-md hover:bg-white hover:shadow hover:text-gray-700 text-gray-500"
          >
            {chevronRight}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="p-4 md:p-2 rounded-md hover:bg-white hover:shadow hover:text-gray-700 text-gray-500"
          >
            {chevronsRight}
          </button>
        </div>
      </div>
    </>
  );
};
