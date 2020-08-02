import React from "react";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import { MainBar } from "../../components/MainBar";
import { NavStats } from "../../components/NavStats";

export default function Stats() {
  const router = useRouter();
  const { groupname } = router.query;
  const tab1 = <Typography>{groupname}</Typography>;
  const tab2 = <Typography>Game Table</Typography>;

  return (
    <React.Fragment>
      <MainBar />
      <NavStats
        tab1Content={tab1}
        tab2Content={tab2}
        onAdd={() => console.log("Add Game")}
      />
    </React.Fragment>
  );
}
