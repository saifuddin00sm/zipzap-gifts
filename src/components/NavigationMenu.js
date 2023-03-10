import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  IconMenu,
  View,
  Image,
  IconHighlightOff,
} from "@aws-amplify/ui-react";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconFullLogo } from "./../icons/IconFullLogo";

const menu = [
  { name: "Gift Dashboard", link: "/", Icon: CardGiftcardIcon },
  { name: "Recipients", link: "/recipients", Icon: SupervisorAccountIcon },
  { name: "Orders", link: "/orders", Icon: ReceiptLongIcon },
  { name: "Gift Catalog", link: "/catalog", Icon: ImportContactsIcon },
  { name: "Profile", link: "/profile", Icon: AccountBoxIcon },
  { name: "Help", link: "/help", Icon: HelpOutlineIcon },
  {
    name: "Sign Out",
    link: "/",
    Icon: IconHighlightOff,
    signOutLink: true,
  },
];

const NavigationMenu = ({ signOut }) => {
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

  // Whenever the window is resized, close the menu
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <>
      <div className="mobile-header" style={styles.mobileHeader}>
        <Button size="small" onClick={() => setMenuOpen(true)}>
          <IconMenu />
        </Button>
        <Link to="/">
          <IconFullLogo style={styles.topLogo} />
        </Link>
        <div></div>
      </div>
      <nav
        style={{ ...styles.menu, ...(menuOpen ? styles.menuActive : {}) }}
        ref={node}
        className="menu"
      >
        <Link to="/">
          <IconFullLogo style={styles.logo} />
        </Link>
        <Link to="/profile">
          <View style={styles.profilePicture}>
            <Image
              borderRadius="50%"
              // border="10px solid white"
              objectFit="cover"
              objectPosition="50% 50%"
              maxWidth="100px"
              src="/BluePersonalLogo.png"
              width="100px"
              height="100px"
            />
          </View>
        </Link>
        <ul style={styles.list}>
          {menu.map(({ name, link, Icon, signOutLink }) => (
            <li key={name + link}>
              <NavLink
                end
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
const logoColor = "#6D6E70";

const topNavBackgroundColor = zipZapBlue;
const backgroundColor = "#F0EDED"; // light gray
const textColor = "#343436"; // dark gray
const selectedItemBackgroundColor = "white";
const selectedBorderColor = zipZapGreen;

const styles = {
  topLogo: {
    marginLeft: "-10%",
    color: logoColor,
  },
  mobileHeader: {
    // index.css has media queries to hide unless on mobile
    display: "flex",
    justifyContent: "space-between",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    fontSize: 50,
    backgroundColor: topNavBackgroundColor,
    color: textColor,
  },
  logo: {
    margin: "-10px -5px",
    fontSize: 100,
    color: logoColor,
  },
  profilePicture: {
    margin: "0 auto",
    textAlign: "center",
  },
  menu: {
    zIndex: 99,
    display: "flex",
    flex: "0 1 auto",
    flexDirection: "column",
    height: "100%",
    overflow: "auto",
    backgroundColor,
  },
  menuActive: {
    transition: "transform .35s ease-in-out",
    position: "absolute",
    width: "fit-content",
    top: 0,
    right: "100%",
    transform: "translateX(100%)",
  },
  list: {
    listStyleType: "none",
    padding: "0 4px 0 4px",
    margin: 0,
  },
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
