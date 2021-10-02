import React from "react";
import { navButton } from "../classes";
import { Row, Col, Button } from "react-bootstrap";

function HomePageComponent() {
  const guestNavButtons = [
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
  ] as Array<navButton>;

  return (
    <Row className="home-page-container">
      {/* <header>Zip Zap Gifts</header> */}
      <Col>
        {guestNavButtons.map((button: navButton, bIndex: number) =>
          button.external ? (
            <Button
              href={button.link}
              key={bIndex}
              className={`sign-in-button`}
              variant="light"
              // onClick={() => setIsExpanded(false)}
            >
              {button.text}
            </Button>
          ) : (
            <hr className={"home-page-hr"} key={bIndex}></hr>
          )
        )}
      </Col>
    </Row>
  );
}

export default HomePageComponent;
