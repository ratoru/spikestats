import React from "react";
import { LoggedOutMenu } from "../menus/LoggedOutMenu";
import { LoggedInMenu } from "../menus/LoggedInMenu";
import { Logo } from "../Logo";
import { useIsAuthenticated } from "../../providers/Auth";

interface MyHeaderProps {
  isLoggedIn?: boolean;
}

export const MyHeader: React.FC<MyHeaderProps> = ({
  isLoggedIn = useIsAuthenticated(),
}) => {
  return (
    <React.Fragment>
      {isLoggedIn ? <LoggedInMenu /> : <LoggedOutMenu />}
      <Logo />
      <div style={{ height: "131px" }} />
    </React.Fragment>
  );
};
