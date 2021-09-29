import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Row, Col, Button} from 'react-bootstrap';
import { adminMenuButton } from "../../classes";

function AdminMenuCard(props: {
  title: string;
  buttons: Array<adminMenuButton>;
}) {
  return (
    <Row className="m-2 admin-dashboard-card p-4">
        <h4>{props.title}</h4>
        {props.buttons.map((button, bIndex) => (
            <Link
              key={bIndex}
              to={button.link}
              className={`general-button admin-button p-2 m-2`}
            >
              {button.text}
            </Link>
        ))}
    </Row>
  );
}

export default AdminMenuCard;
