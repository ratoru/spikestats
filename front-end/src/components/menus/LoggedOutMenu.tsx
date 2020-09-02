import React from "react";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import SportsHandballRoundedIcon from "@material-ui/icons/SportsHandballRounded";
import { BurgerMenu, MyListItem } from "./BurgerMenu";
import { FlexibleMenu } from "./FlexibleMenu";

interface LoggedOutMenuProps {
  flexible?: boolean;
}

export const LoggedOutMenu: React.FC<LoggedOutMenuProps> = ({
  flexible = false,
}) => {
  const item: MyListItem[] = [
    {
      icon: <SportsHandballRoundedIcon />,
      text: "Sign In",
      href: "/",
    },
    {
      icon: <LockOpenRoundedIcon />,
      text: "Register",
      href: "/register",
    },
    {
      icon: <InfoRoundedIcon />,
      text: "About",
      href: "/about",
    },
    {
      icon: <CodeRoundedIcon />,
      text: "Code",
      href: "/code",
    },
  ];
  return flexible ? <FlexibleMenu item={item} /> : <BurgerMenu item={item} />;
};
