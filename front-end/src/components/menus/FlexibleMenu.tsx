import React, { ReactElement } from "react";
import Menu from "react-burger-menu/lib/menus/stack";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { richAndColorfulTheme } from "../layout/themes";
import { MyMenuItem } from "./MyMenuItem";

export interface MyListItem {
  icon: ReactElement;
  text: string;
  href: string;
  onClick?: () => void;
}

interface FlexibleMenuProps {
  item: MyListItem[];
}

export const FlexibleMenu: React.FC<FlexibleMenuProps> = ({ item }) => {
  return (
    <Menu
      right
      styles={styles}
      // customBurgerIcon={<img src="/roundnet-logo.svg" />}
      customCrossIcon={<CloseRoundedIcon />}
      width={250}
    >
      {item.map((curItem, index) => {
        return (
          <div key={index}>
            <MyMenuItem
              icon={curItem.icon}
              text={curItem.text}
              href={curItem.href}
              onClick={curItem.onClick}
            />
          </div>
        );
      })}
    </Menu>
  );
};

const styles = {
  bmBurgerButton: {
    // position: "fixed",
    width: "90px",
    height: "75px",
    // right: "36px",
    // top: "28px",
  },
  bmBurgerBars: {
    background: `${richAndColorfulTheme.palette.primary.main}`,
  },
  bmBurgerBarsHover: {
    background: `${richAndColorfulTheme.palette.secondary.main}`,
  },
  bmCrossButton: {
    height: "36px",
    width: "36px",
  },
  bmCross: {
    background: "transparent",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: `${richAndColorfulTheme.palette.primary.main}`,
  },
  bmItemList: {
    padding: 50,
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};