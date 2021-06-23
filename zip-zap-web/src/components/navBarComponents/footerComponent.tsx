import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navButton } from "../../classes";
import { ReactComponent as LogoTextIcon } from "../../icons/logo-words.svg";

function FooterComponent() {
  return (
    <footer className={`row center  footer-container`}>
      <Link to={"/"} className={`full-width`}>
        <LogoTextIcon className={`footer-logo`} />
      </Link>
    </footer>
  );
}

export default FooterComponent;
