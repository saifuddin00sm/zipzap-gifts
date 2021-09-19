import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Col} from 'react-bootstrap'
import { navButton } from "../../classes";
import { ReactComponent as LogoTextIcon } from "../../icons/logo-words.svg";

function FooterComponent() {
  return (
    <Col className="text-center w3-hover-opacity-off footer-container">
      <Link to={"/"} className={`full-width`}>
        <LogoTextIcon className={`footer-logo`} />
      </Link>
    </Col>
  );
}

export default FooterComponent;
