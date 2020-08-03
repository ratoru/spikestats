// Adapted from MUI Documentation
import React, { forwardRef } from "react";
import MaterialTable, { Column } from "material-table";
import { useTheme } from "@material-ui/core/styles";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
// Imports to so that material-table icons are working.
// Also see https://github.com/mbrn/material-table/issues/1004#issuecomment-525274793
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
// typings are here:
import { Icons } from "material-table";
// Personal imports
import { Game, Players } from "../types";
import { gameToRow } from "../utils";

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

interface Row {
  id: number;
  blueTeam: string;
  redTeam: string;
  score: string;
  serve: number;
  date: Date;
}

interface GameTableProps {
  games: Game[];
  players: Players;
  onDelete: (id: number) => void;
}

export const GameTable: React.FC<GameTableProps> = ({
  games,
  players,
  onDelete,
}) => {
  const theme = useTheme();
  const columns: Array<Column<Row>> = [
    { title: "ID", field: "id", hidden: true },
    {
      title: "Blue Team",
      field: "blueTeam",
      headerStyle: { backgroundColor: theme.palette.primary.main },
    },
    {
      title: "Red Team",
      field: "redTeam",
      headerStyle: { backgroundColor: theme.palette.error.main },
    },
    { title: "Score", field: "score" },
    {
      title: "Team with Serve",
      field: "serve",
      lookup: { 0: "Blue", 1: "Red" },
      render: (rowData) => (
        <FiberManualRecordRoundedIcon
          style={{
            fill: rowData.serve
              ? theme.palette.error.main
              : theme.palette.primary.main,
          }}
        />
      ),
    },
    {
      title: "Date",
      field: "date",
      type: "datetime",
      defaultSort: "desc",
    },
  ];

  // No state used, so that add and delete are handled by parent element.
  return (
    <MaterialTable
      title="Your Games"
      icons={tableIcons}
      columns={columns}
      data={games.map((game) => gameToRow(game, players))}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            onDelete(oldData.id);
            resolve();
          }),
      }}
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
      }}
      localization={{
        header: {
          actions: "",
        },
      }}
    />
  );
};
