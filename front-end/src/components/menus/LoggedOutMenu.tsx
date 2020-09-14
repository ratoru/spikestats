import React from "react";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import SportsHandballRoundedIcon from "@material-ui/icons/SportsHandballRounded";
import { BurgerMenu, MyListItem } from "./BurgerMenu";

export const LoggedOutMenu: React.FC = () => {
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
  return <BurgerMenu item={item} />;
};
