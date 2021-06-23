import React from "react";

function ModalBox(props: { children?: any }) {
  return (
    <div className={`modal-container row center`}>
      <div className={`modal-box-container row center`}>{props.children}</div>
    </div>
  );
}

export default ModalBox;
