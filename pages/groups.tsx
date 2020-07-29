import React from "react";
import Typography from "@material-ui/core/Typography";
import { LogoBar } from "../components/LogoBar";
import { GroupList } from "../components/GroupList";

export default function Groups() {
  return (
    <React.Fragment>
      <LogoBar />
      <Typography variant="h1">My Groups</Typography>
      <GroupList />
    </React.Fragment>
  );
}
