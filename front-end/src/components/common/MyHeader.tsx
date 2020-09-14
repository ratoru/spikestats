import React from "react";
import { LoggedOutMenu } from "../menus/LoggedOutMenu";
import { LoggedInMenu } from "../menus/LoggedInMenu";
import { Logo } from "../Logo";
import { useIsAuthenticated } from "../../providers/Auth";

interface MyHeaderProps {
  isLoggedIn?: boolean;
  withPadding?: boolean;
}

export const MyHeader: React.FC<MyHeaderProps> = ({
  isLoggedIn = useIsAuthenticated(),
  withPadding = true,
}) => {
  return (
    <React.Fragment>
      {isLoggedIn ? <LoggedInMenu /> : <LoggedOutMenu />}
      <Logo />
      {withPadding && <div style={{ height: "131px" }} />}
    </React.Fragment>
  );
};
