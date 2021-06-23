import React from "react";
import { ReactComponent as ArrowRightIcon } from "../../icons/arrowHeadRight.svg";

function ForwardArrow(props: {
  action: Function;
  class?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`row center forward-arrow-svg ${props.class}`}
      disabled={props.disabled}
      onClick={() => props.action()}
    >
      <ArrowRightIcon
      // className={``}
      />
    </button>
  );
}

export default ForwardArrow;
