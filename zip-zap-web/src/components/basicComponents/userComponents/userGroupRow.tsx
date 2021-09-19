import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {Row, Col} from 'react-bootstrap';
import { UserContext } from "../../../App";
import { userEvent } from "../../../classes";
import { getIcon } from "../../eventComponents/eventNew";
import ForwardArrow from "../forwardArrow";

function UserGroupRow(props: {
  group: string;
  index: number;
  action: Function;
}) {
  const { userItems, userGroupedItems } = useContext(UserContext);

  const [showDetails, setShowDetails] = useState(false);
  return (
    <Row className={`recipient-row`}>
      <Col xs="10"
        className={`event-details-header ${
          showDetails ? "event-details-header-show" : ""
        }`}
      >
        <span>
          {" "}
          {props.group} <i>({props.index} members)</i>
        </span>
        </Col>
        <Col xs="2">
        <ForwardArrow action={() => props.action(props.group)} />
        </Col>
      <div
        className={`column event-details ${
          showDetails ? "event-details-show" : ""
        }`}
      >
        {/* <p>Start Date: {new Date(props.event.startDate).toDateString()}</p>
        <p>End Date: {new Date(props.event.endDate).toDateString()}</p>
        {props.event.defaultItemID || props.event.defaultGroupedItemID ? (
          <p>
            Default Gift:{" "}
            {props.event.defaultItemID && props.event.defaultItemID in userItems
              ? userItems[props.event.defaultItemID].name
              : props.event.defaultGroupedItemID &&
                props.event.defaultGroupedItemID in userGroupedItems
              ? userGroupedItems[props.event.defaultGroupedItemID].name
              : null}
          </p>
        ) : null} */}

        {/* <p className={`row center`}>
          {getIcon(
            props.event.defaultDetails.eventIcon,
            "event-dashboard-icon"
          )}
        </p> */}
{/* 
        <Link to={`/event/`} className={`back-link back-link-blue`}>
          Edit Event
        </Link> */}
      </div>
    </Row>
  );
}

export default UserGroupRow;
