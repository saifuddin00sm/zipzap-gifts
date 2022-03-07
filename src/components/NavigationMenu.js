import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  IconMenu,
  IconCardGiftcard,
  IconSupervisorAccount,
  IconCalendarToday,
  IconReceiptLong,
  IconImportContacts,
  IconAccountBox,
  IconHelpOutline,
  IconHighlightOff,
} from "@aws-amplify/ui-react";
import { IconFullLogo } from "./../icons/IconFullLogo";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const node = useRef();

  // This block handles closing the side menu in mobile if you click outside of it
  useEffect(() => {
    const handleClick = (e) => {
      if (node.current.contains(e.target)) {
        // Inside click
        return;
      }
      // Outside click
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    // Remove listener when menu unmounts
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      <div className="mobile-header" style={styles.mobileHeader}>
        <Button size="small" onClick={() => setMenuOpen(true)}>
          <IconMenu />
        </Button>
        <IconFullLogo style={styles.logo} />
        <div></div>
      </div>
      <nav
        style={{ ...styles.menu, ...(menuOpen ? styles.menuActive : {}) }}
        ref={node}
        className="menu"
      >
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
    </>
  );
};

const zipZapBlue = "#ABC4D6";
const zipZapGreen = "#ABC6BD";

const topNavBackgroundColor = zipZapBlue;
const backgroundColor = "#F0EDED"; // light gray
const textColor = "#343436"; // dark gray
const selectedItemBackgroundColor = "white";
const selectedBorderColor = zipZapGreen;

const styles = {
  logo: {
    marginLeft: "-10%",
  },
  mobileHeader: {
    // index.css has media queries to hide unless on mobile
    display: "flex",
    width: "100%",
    position: "fixed",
    justifyContent: "space-between",
    top: 0,
    fontSize: 50,
    backgroundColor: topNavBackgroundColor,
    color: textColor,
  },
  menu: {
    zIndex: 2,
    display: "flex",
    flex: "0 1 auto",
    flexDirection: "column",
    height: "100%",
    overflow: "auto",
    transition: "transform .35s ease-in-out",
    backgroundColor,
  },
  menuActive: {
    position: "absolute",
    width: "fit-content",
    top: 0,
    right: "100%",
    transform: "translateX(100%)",
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
