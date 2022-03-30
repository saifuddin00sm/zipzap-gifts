{
  /* <Accordion className="m-1">
<Accordion.Item eventKey={campaignKey}>
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
    <p className="event-list-info">
      Date: {new Date(props.event.startDate.replace(/-/g, '\/').replace(/T.+/, '')).toDateString()}
    </p>
    {props.event.defaultItemID || props.event.defaultGroupedItemID ? (
      <p className="event-list-info">
        Default Gift:{" "}
        {props.event.defaultItemID &&
        props.event.defaultItemID in userItems
          ? userItems[props.event.defaultItemID].name
          : props.event.defaultGroupedItemID &&
            props.event.defaultGroupedItemID in userGroupedItems
          ? userGroupedItems[props.event.defaultGroupedItemID].name
          : null}
      </p>
    ) : null}
    <Button className="m-2" size="sm" variant="zipBlue">
    <Link
      to={`/event/e/${props.event.campaignID}`}
      className={`edit-button-link`}
    >
      Edit Gift
    </Link>
    </Button>
    <Button className="m-2" 
    size="sm" 
    variant="zapRed"
    onClick={handleDelete}>
      Delete Gift
    </Button>
  </Accordion.Body>
</Accordion.Item>
</Accordion> */
}

function GiftRow() {
  return <h1> testing</h1>;
}
