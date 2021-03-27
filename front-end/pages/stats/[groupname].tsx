import React from "react";
import { useRouter } from "next/router";

export default function Stats() {
  const router = useRouter();
  const { groupname, gId } = router.query;

  return <div>{groupname}</div>;
}
