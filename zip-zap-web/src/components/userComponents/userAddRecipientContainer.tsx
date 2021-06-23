import React, { useContext, useEffect, useState } from "react";

import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import { userRecipient } from "../../classes";

const convertDateToInput = (date: string) => {
  let newDate = new Date(date);

  let month = newDate.getMonth();
  month += 1;
  let dayDate = newDate.getDate();

  return `${newDate.getFullYear()}-${month < 10 ? `0${month}` : month}-${
    dayDate < 10 ? `0${dayDate}` : dayDate
  }`;
};

function UserAddRecipientContainer(props: {
  saveAction: Function;
  closeAction: Function;
  loading: boolean;
  user?: userRecipient;
}) {
  const [editUser, setEditUser] = useState(
    props.user
      ? (JSON.parse(JSON.stringify(props.user)) as userRecipient)
      : ({
          ["First Name"]: "",
          ["Last Name"]: "",
          Birthday: "",
          Address: "",
          ["Title"]: "",
          ["Date Started"]: "",
          Department: "",
          City: "",
          State: "",
          Zip: "",
        } as userRecipient)
  );

  const [error, setError] = useState("");

  const handleEdit = () => {
    if (!editUser["First Name"]) {
      setError("Please Enter a Name");
      return false;
    } else if (!editUser["Last Name"]) {
      setError("Please Enter a Name");
      return false;
    } else if (!editUser.Birthday) {
      setError("Please Enter a Birthday");
      return false;
    } else if (!editUser.Address) {
      setError("Please Enter an Address");
      return false;
    } else if (!editUser.City) {
      setError("Please Enter an Address");
      return false;
    } else if (!editUser.State) {
      setError("Please Enter a Valid State");
      return false;
    } else if (!editUser.Zip) {
      setError("Please Enter a Valid Zip Code");
      return false;
    } else if (!editUser["Title"]) {
      setError("Please Enter a Title");
      return false;
    } else if (!editUser["Date Started"]) {
      setError("Please Enter a Date Started");
      return false;
    } else {
      setError("");
    }

    props.saveAction(editUser);
    props.closeAction();
  };

  const handleNewEdit = (type: string, event: any) => {
    if (type === "First Name") {
      editUser["First Name"] = event.target.value;
    } else if (type === "Last Name") {
      editUser["Last Name"] = event.target.value;
    } else if (type === "Birthday") {
      editUser.Birthday = event.target.value;
    } else if (type === "Address") {
      editUser.Address = event.target.value;
    } else if (type === "City") {
      editUser.City = event.target.value;
    } else if (type === "State") {
      editUser.State = event.target.value;
    } else if (type === "Zip") {
      editUser.Zip = event.target.value;
    } else if (type === "Title") {
      editUser["Title"] = event.target.value;
    } else if (type === "Date Started") {
      editUser["Date Started"] = event.target.value;
    } else if (type === "Department") {
      editUser.Department = event.target.value;
    }

    setEditUser({ ...editUser });
  };

  useEffect(() => {
    console.log("USe Props", props);
    if (props.user) {
      let newEditUser = JSON.parse(JSON.stringify(props.user)) as userRecipient;

      newEditUser.Birthday = convertDateToInput(newEditUser.Birthday);
      newEditUser["Date Started"] = convertDateToInput(
        newEditUser["Date Started"]
      );

      // console.log("yo", newEditUser);
      setEditUser({ ...newEditUser });
    }
  }, [props.user]);

  return (
    <section
      className={`column center-column full-width user-group-edit-container`}
    >
      <div className={`row center space-between full-width`}>
        <h2>{props.user ? "Edit" : "New"} Recipient</h2>
        <button
          onClick={() => props.closeAction("")}
          className={`user-group-edit-close row center`}
        >
          <CloseIcon />
        </button>
      </div>

      <div className={`column center full-width`}>
        <div className={`width-60 row left-align-column user-add-field-row`}>
          <label>First Name:</label>
          <input
            value={editUser["First Name"]}
            onChange={(e: any) => handleNewEdit("First Name", e)}
            placeholder={`First Name`}
            className={`general-input-fit new-event-input`}
          ></input>
        </div>

        <div className={`width-60 row left-align-column user-add-field-row`}>
          <label>Last Name:</label>
          <input
            value={editUser["Last Name"]}
            onChange={(e: any) => handleNewEdit("Last Name", e)}
            placeholder={`Last Name`}
            className={`general-input-fit new-event-input`}
          ></input>
        </div>

        <div className={`width-60 row left-align-column user-add-field-row`}>
          <label>Birthday:</label>
          <input
            value={editUser.Birthday}
            onChange={(e: any) => handleNewEdit("Birthday", e)}
            placeholder={`Birthday`}
            className={`general-input-fit new-event-input`}
            type={`date`}
          ></input>
        </div>

        <div className={`width-60 row left-align-column user-add-field-row`}>
          <label>Address:</label>
          <input
            value={editUser.Address}
            onChange={(e: any) => handleNewEdit("Address", e)}
            placeholder={`Address`}
            className={`general-input-fit new-event-input`}
          ></input>
        </div>
        <div className={`width-60 row left-align-column user-add-field-row`}>
          <label>City:</label>
          <input
            value={editUser.City}
            onChange={(e: any) => handleNewEdit("City", e)}
            placeholder={`City`}
            className={`general-input-fit new-event-input`}
          ></input>
        </div>
        <div className={`width-60 row left-align-column user-add-field-row`}>
          <label>State (i.e. UT):</label>
          <input
            value={editUser.State}
            onChange={(e: any) => handleNewEdit("State", e)}
            placeholder={`State`}
            maxLength={2}
            className={`general-input-fit new-event-input`}
          ></input>
        </div>
        <div className={`width-60 row left-align-column user-add-field-row`}>
          <label>Zip Code:</label>
          <input
            value={editUser.Zip}
            onChange={(e: any) => handleNewEdit("Zip", e)}
            placeholder={`Zip`}
            className={`general-input-fit new-event-input`}
          ></input>
        </div>

        <div className={`width-60 row left-align-column user-add-field-row`}>
          <label>Title:</label>
          <input
            value={editUser["Title"]}
            onChange={(e: any) => handleNewEdit("Title", e)}
            placeholder={`Title`}
            className={`general-input-fit new-event-input`}
          ></input>
        </div>

        <div className={`width-60 row left-align-column user-add-field-row`}>
          <label>Date Started:</label>
          <input
            value={editUser["Date Started"]}
            onChange={(e: any) => handleNewEdit("Date Started", e)}
            placeholder={`Date Started`}
            className={`general-input-fit new-event-input`}
            type={`date`}
          ></input>
        </div>

        <div className={`width-60 row left-align-column user-add-field-row`}>
          <label>Department (optional):</label>
          <input
            value={editUser.Department}
            onChange={(e: any) => handleNewEdit("Department", e)}
            placeholder={`Department`}
            className={`general-input-fit new-event-input`}
          ></input>
        </div>
      </div>
      <div className={`column width-60 center`}>
        {error ? <span className={`error-message-text`}>{error}</span> : null}
        <button
          className={`event-item-description-button new-event-button-grey user-add-button`}
          onClick={handleEdit}
        >
          {props.user ? "Edit " : "Create New "}
          Recipient
        </button>
      </div>
    </section>
  );
}

export { convertDateToInput };
export default UserAddRecipientContainer;