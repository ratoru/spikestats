import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Game, Player, ServeTeam, Team } from "../../util/types";
import { teamToNames } from "../../util/conversions";
import { trash } from "../../util/icons";

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
        Header: "Initial Serve",
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
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      className="w-full lg:w-5/6 table-auto bg-white shadow-md mx-auto"
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
        {rows.map((row, index) => {
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
  );
};
