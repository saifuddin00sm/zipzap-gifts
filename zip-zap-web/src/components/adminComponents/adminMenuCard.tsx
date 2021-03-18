import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminMenuButton } from "../../classes";

function AdminMenuCard(props: {
  title: string;
  buttons: Array<adminMenuButton>;
}) {
  return (
    <div className={`column center admin-dashboard-card`}>
      <h2>{props.title}</h2>
      {props.buttons.map((button, bIndex) => (
        <Link
          key={bIndex}
          to={button.link}
          className={`general-button admin-button`}
        >
          {button.text}
        </Link>
      ))}
    </div>
  );
}

export default AdminMenuCard;
