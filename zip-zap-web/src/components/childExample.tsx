import React from "react";

function ChildExample(props: { children?: any }) {
  return (
    <div>
      <h2>I am the Child container and below are my children</h2>
      {props.children}
    </div>
  );
}

export default ChildExample;
