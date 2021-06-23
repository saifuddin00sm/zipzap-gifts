import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { navButton } from "../../classes";
import { ReactComponent as MenuIcon } from "../../icons/menu.svg";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";

import { ReactComponent as BoltIcon } from "../../icons/logo.svg";
import { ReactComponent as LogoTextIcon } from "../../icons/logo-words-only.svg";
import { ReactComponent as LogoTextFullIcon } from "../../icons/logo-word-white.svg";
import { UserContext } from "../../App";

function NavBarComponent() {
  const { user } = useContext(UserContext);

  const [navButtons, setNavButtons] = useState([
    { text: "Events", link: "/dashboard" },
    { text: "Orders", link: "/order/past" },

    { text: "People", link: "/people" },
    { text: "Gifts", link: "/" },
    {
      text: "Profile",
      link: `/`,
    },
    {
      text: "Logout",
      link: `/logout`,
    },
  ] as Array<navButton>);

  const [guestNavButtons, setGuestNavButtons] = useState([
    {
      text: "Login",
      link: `https://auth.zipzapgifts.com/login?client_id=1tg75l00qrm38t6riknsmsar2o&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${window.location.origin}/callback`,
      external: true,
    },
  ] as Array<navButton>);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`row center space-between nav-bar-container`}>
      <div className={`row center space-between nav-bar-header`}>
        <Link
          to={"/"}
          className={"row center nav-bar-logo"}
          onClick={() => setIsExpanded(false)}
        >
          <LogoTextFullIcon className={`nav-bar-svg`} />
        </Link>

        <MenuIcon
          className={`nav-bar-mobile-menu ${
            isExpanded ? " nav-bar-mobile-menu-hide" : ""
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <CloseIcon
          className={`nav-bar-mobile-menu ${
            isExpanded ? "" : " nav-bar-mobile-menu-hide"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>

      <nav className={`column center`}>
        <ul
          className={`row center space-between ${
            isExpanded ? " nav-bar-list-expanded" : ""
          }`}
        >
          {user && "email" in user && user.email
            ? navButtons.map((button, bIndex) =>
                button.external ? (
                  <a
                    href={button.link}
                    key={bIndex}
                    className={`row center`}
                    onClick={() => setIsExpanded(false)}
                  >
                    {button.text}
                  </a>
                ) : (
                  <Link
                    to={button.link}
                    key={bIndex}
                    className={`row center`}
                    onClick={() => setIsExpanded(false)}
                  >
                    {button.text}
                  </Link>
                )
              )
            : guestNavButtons.map((button, bIndex) =>
                button.external ? (
                  <a
                    href={button.link}
                    key={bIndex}
                    className={`row center`}
                    onClick={() => setIsExpanded(false)}
                  >
                    {button.text}
                  </a>
                ) : (
                  <Link
                    to={button.link}
                    key={bIndex}
                    className={`row center`}
                    onClick={() => setIsExpanded(false)}
                  >
                    {button.text}
                  </Link>
                )
              )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBarComponent;
