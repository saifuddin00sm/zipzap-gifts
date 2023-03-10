import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { navButton } from "../../classes";
import { Navbar, Nav, Button } from "react-bootstrap";
import { ReactComponent as Usericon } from "../../icons/usericon.svg";
import { ReactComponent as LogoTextFullIcon } from "../../icons/logo-word-white.svg";
import { UserContext } from "../../App";

function NavBarComponent() {
  const { user } = useContext(UserContext);

  const guestNavButtons = [
    {
      text: "Login",
      link: `https://auth.zipzapgifts.com/login?client_id=1tg75l00qrm38t6riknsmsar2o&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${window.location.origin}/callback`,
      external: true,
    },
  ] as Array<navButton>;

  const [, setIsExpanded] = useState(false);

  return (
    <Navbar expand="md" className="nav-bar-container p-3" variant="dark">
      <Navbar.Brand>
        <Link
          to={"/"}
          className={"nav-bar-logo"}
          onClick={() => setIsExpanded(false)}
        >
          <LogoTextFullIcon className={`nav-bar-svg`} />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto"></Nav>
        {user && "email" in user && user.email ? (
          <Nav className="mr-auto pr-4 d-flex align-items-center justify-content-center">
            <Link
              to={"/profile"}
              className={"nav-bar-logo"}
              onClick={() => setIsExpanded(false)}
            >
              <Usericon className={`nav-bar-icon`} />
            </Link>
            <Nav.Link href="/#/logout">
              <Button variant="light" size="sm">
                Log Out
              </Button>
            </Nav.Link>
          </Nav>
        ) : (
          guestNavButtons.map((button, bIndex) =>
            button.external ? (
              <Button
                variant="light"
                size="lg"
                className={`text-dark`}
                href={button.link}
                key={bIndex}
                onClick={() => setIsExpanded(false)}
              >
                {button.text}
              </Button>
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
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarComponent;
