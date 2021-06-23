import React, { useState } from "react";
import { ReactComponent as ArrowRightIcon } from "../../icons/arrowHeadRight.svg";

function SelectList(props: {
  action: Function;
  detailList: Array<string>;
  selected: number;
  altDisplay?: Function;
}) {
  const [showList, setShowList] = useState(false);

  const handleOptionSelect = (option: any, index: number) => {
    props.action(option, index);

    setShowList(false);
  };
  return (
    <div className={`column select-list-container`}>
      <li
        onClick={() => setShowList(!showList)}
        className={`select-list-item row center space-between`}
      >
        {props.altDisplay
          ? props.altDisplay(props.selected, "new-event-icon")
          : props.detailList[props.selected]}

        <ArrowRightIcon
          className={`select-list-arrow ${
            showList ? "select-list-arrow-down" : ""
          }`}
        />
      </li>

      <ul
        className={`column select-list-list ${
          showList ? "select-list-list-show" : ""
        }`}
      >
        {props.detailList.map((option: any, oIndex: number) => (
          <li
            key={oIndex}
            className={`select-list-item row center space-between`}
            onClick={() => handleOptionSelect(option, oIndex)}
          >
            {props.altDisplay
              ? props.altDisplay(oIndex, "new-event-icon")
              : option}
            {/* {option} */}
            <ArrowRightIcon
              className={`select-list-arrow ${
                showList ? "select-list-arrow-down" : ""
              }`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectList;
