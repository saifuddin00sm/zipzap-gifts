import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {Accordion, Col} from 'react-bootstrap'
import { UserContext } from "../../../App";
import { userEvent } from "../../../classes";
import { ReactComponent as ArrowRightIcon } from "../../../icons/arrowHeadRight.svg";
import { getIcon } from "../../eventComponents/eventNew";
import ForwardArrow from "../forwardArrow";

function EventDetailsRow(props: { event: userEvent; index: number }) {
  const { userItems, userGroupedItems } = useContext(UserContext);

  const [showDetails, setShowDetails] = useState(false);
  var campaignKey = "1";
  if (props.event.campaignID) {
    campaignKey = "" + props.event.campaignID;
  }
  return (
    <Accordion className="m-1">
      <Accordion.Item
        eventKey={campaignKey}
      >
      <Accordion.Header>
        <p className="event-list-title"> {props.event.name} </p>
      </Accordion.Header>
      <Accordion.Body>
        <p className={`row center`}>
          {getIcon(
            props.event.defaultDetails.eventIcon,
            "event-dashboard-icon"
          )}
        </p>
        <p className="event-list-info">Start Date: {new Date(props.event.startDate).toDateString()}</p>
        {props.event.defaultItemID || props.event.defaultGroupedItemID ? (
          <p className="event-list-info">
            Default Gift:{" "}
            {props.event.defaultItemID && props.event.defaultItemID in userItems
              ? userItems[props.event.defaultItemID].name
              : props.event.defaultGroupedItemID &&
                props.event.defaultGroupedItemID in userGroupedItems
              ? userGroupedItems[props.event.defaultGroupedItemID].name
              : null}
          </p>
        ) : null}

        <Link
          to={`/event/e/${props.event.campaignID}`}
          className={`back-link back-link-blue`}
        >
          Edit Event
        </Link>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default EventDetailsRow;
