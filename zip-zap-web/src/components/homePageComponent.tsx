import React, { useState } from "react";
import { navButton } from "../classes";
import {Row, Col, Button} from 'react-bootstrap';
import logo from "../logo.svg";

function HomePageComponent() {
  const [guestNavButtons, setGuestNavButtons] = useState([
    {
      text: "Login",
      link: `https://auth.zipzapgifts.com/login?client_id=1tg75l00qrm38t6riknsmsar2o&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${window.location.origin}/callback`,
      external: true,
    },
    {
      text: "",
      link: ``,
      external: false,
    },
    {
      text: "Register",
      link: `https://auth.zipzapgifts.com/signup?client_id=1tg75l00qrm38t6riknsmsar2o&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${window.location.origin}/callback/register`,
      external: true,
    },
  ] as Array<navButton>);

  return (
    <Row className="App-header home-page-container">
      {/* <header>Zip Zap Gifts</header> */}
      <br></br>
      {guestNavButtons.map((button: navButton, bIndex: number) =>
        button.external ? (
          <Button
            href={button.link}
            key={bIndex}
            className={`row center px-3 p-2`}
            variant="outline-light"
            size="lg"
            // onClick={() => setIsExpanded(false)}
          >
            {button.text}
          </Button>
        ) : (
          <hr className={"home-page-hr"} key={bIndex}></hr>
        )
      )}
    </Row>
  );
}

export default HomePageComponent;
