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
} from "@aws-amplify/ui-react";

const menu = [
  { name: "Gift Dashboard", link: "/", Icon: IconCardGiftcard },
  { name: "Recipients", link: "/", Icon: IconSupervisorAccount },
  { name: "Gift Calendar", link: "/", Icon: IconCalendarToday },
  { name: "Orders", link: "/", Icon: IconReceiptLong },
  { name: "Gift Catalogue", link: "/", Icon: IconImportContacts },
  { name: "Profile", link: "/", Icon: IconAccountBox },
  { name: "Help", link: "/todo", Icon: IconHelpOutline },
];

const NavigationMenu = ({ signOut, user }) => {
  return (
    <nav style={styles.menu}>
      {user.attributes.name}
      <ul style={styles.list}>
        {menu.map(({ name, link, Icon }) => (
          <li key={name + link} style={styles.link}>
            <NavLink
              to={link}
              style={({ isActive }) => ({
                ...styles.linkAnchor,
                ...(isActive ? styles.linkActive : {}),
              })}
            >
              <Icon /> {name}
            </NavLink>
          </li>
        ))}
        <li style={styles.link}>
          <NavLink to="/" style={styles.linkanchor} onClick={signOut}>
            Sign Out
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const backgroundColor = "#F0EDED";
const styles = {
  menu: {
    zIndex: 2,
    display: "flex",
    flex: "0 1 auto",
    flexDirection: "column",
    transition: "all 1s ease",
    padding: "8px 16px 8px 16px",
    height: "100%",
    overflow: "auto",
    backgroundColor,
  },
  menuActive: {
    left: 0,
  },
  list: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  link: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  linkAnchor: {
    display: "block",
  },
  linkActive: {
    color: "red",
  },
};

export default NavigationMenu;
