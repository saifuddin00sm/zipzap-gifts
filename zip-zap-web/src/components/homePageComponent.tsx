import React, { useState } from "react";
import { navButton } from "../classes";
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
    <main className="App-header home-page-container">
      {/* <header>Zip Zap Gifts</header> */}
      <br></br>
      {guestNavButtons.map((button: navButton, bIndex: number) =>
        button.external ? (
          <a
            href={button.link}
            key={bIndex}
            className={`row center`}
            // onClick={() => setIsExpanded(false)}
          >
            {button.text}
          </a>
        ) : (
          <hr className={"home-page-hr"} key={bIndex}></hr>
        )
      )}
    </main>
  );
}

export default HomePageComponent;
