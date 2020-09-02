import React from "react";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import SportsKabaddiRoundedIcon from "@material-ui/icons/SportsKabaddiRounded";
import { BurgerMenu, MyListItem } from "./BurgerMenu";
import { FlexibleMenu } from "./FlexibleMenu";
import http from "../../services/httpService";
import { useAuth } from "../../providers/Auth";

interface LoggedInMenuProps {
  flexible?: boolean;
}

export const LoggedInMenu: React.FC<LoggedInMenuProps> = ({
  flexible = false,
}) => {
  const { setAuthenticated } = useAuth();
  const item: MyListItem[] = [
    {
      icon: <SportsKabaddiRoundedIcon />,
      text: "Home",
      href: "/groups",
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
    {
      icon: <ExitToAppRoundedIcon />,
      text: "Logout",
      href: "/",
      onClick: () => {
        http.post("/logout");
        setAuthenticated(false);
      },
    },
  ];
  return flexible ? <FlexibleMenu item={item} /> : <BurgerMenu item={item} />;
};
