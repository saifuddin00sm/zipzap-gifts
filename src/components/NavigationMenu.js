import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  IconCardGiftcard,
  IconSupervisorAccount,
  IconCalendarToday,
  IconReceiptLong,
  IconImportContacts,
  IconAccountBox,
  IconHelpOutline,
  IconHighlightOff,
} from "@aws-amplify/ui-react";

const menu = [
  { name: "Gift Dashboard", link: "/", Icon: IconCardGiftcard },
  { name: "Recipients", link: "/recipients", Icon: IconSupervisorAccount },
  { name: "Gift Calendar", link: "/calendar", Icon: IconCalendarToday },
  { name: "Orders", link: "/orders", Icon: IconReceiptLong },
  { name: "Gift Catalogue", link: "/catalogue", Icon: IconImportContacts },
  { name: "Profile", link: "/profile", Icon: IconAccountBox },
  { name: "Help", link: "/todo", Icon: IconHelpOutline },
  {
    name: "Sign Out",
    link: "/",
    Icon: IconHighlightOff,
    signOutLink: true,
  },
];

const NavigationMenu = ({ signOut, user }) => {
  return (
    <nav style={styles.menu}>
      {user.attributes.name}
      <ul style={styles.list}>
        {menu.map(({ name, link, Icon, signOutLink }) => (
          <li key={name + link} style={styles.item}>
            <NavLink
              to={link}
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive && !signOutLink ? styles.linkActive : {}),
              })}
              className="nav-link"
              onClick={signOutLink ? signOut : undefined}
            >
              <Icon /> {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const backgroundColor = "#F0EDED";
const textColor = "#343436";
const selectedItemBackgroundColor = "white";
const selectedBorderColor = "#ABC6BD";
const styles = {
  menu: {
    zIndex: 2,
    display: "flex",
    flex: "0 1 auto",
    flexDirection: "column",
    height: "100%",
    overflow: "auto",
    transition: "all 1s ease",
    backgroundColor,
  },
  menuActive: {
    left: 0,
  },
  list: {
    listStyleType: "none",
    padding: "0 4px 0 4px",
  },
  item: {},
  link: {
    listStyleType: "none",
    display: "block",
    padding: "8px 16px",
    textDecoration: "none",
    fontWeight: 500,
    color: textColor,
    // hover style is in index.css under .nav-link:hover
  },
  linkActive: {
    background: selectedItemBackgroundColor,
    borderLeft: `0.5rem solid ${selectedBorderColor}`,
  },
};

export default NavigationMenu;
