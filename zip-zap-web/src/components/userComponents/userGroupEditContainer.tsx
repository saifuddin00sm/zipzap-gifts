import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import UserListContainer from "../basicComponents/eventComponents/userListContainer";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";

function UserGroupEditContainer(props: {
  activeGroup: string;
  activeGroupCount: number;
  activeGroupPeople: Array<string>;
  saveAction: Function;
  closeAction: Function;
  selectUser: Function;
  loading: boolean;
}) {
  const { userUsers } = useContext(UserContext);

  const [editName, setEditName] = useState(
    props.activeGroup !== "No Group" ? props.activeGroup : ""
  );
  const [editing, setEditing] = useState(false);

  const handleReset = () => {
    // this is the problem I think
    console.log("edit reset is occuring");
    setEditing(false);
    setEditName(props.activeGroup !== "No Group" ? props.activeGroup : "");
  };

  const handleEdit = (deleteGroup: any) => {
    if (deleteGroup === "delete") {
      props.saveAction(props.activeGroup, "");
    }

    if (!editing) {
      setEditing(true);
      return;
    }

    props.saveAction(
      props.activeGroup !== "No Group" ? props.activeGroup : "",
      editName
    );
    handleReset();
    setEditing(false);
  };

  useEffect(() => {
    handleReset();
  }, [props.activeGroup]);

  return (
    <section
      className={`column center-column full-width user-group-edit-container`}
    >
      <div className={`row center space-between full-width`}>
        <h2>Edit Group</h2>
        <button
          onClick={() => props.closeAction("")}
          className={`user-group-edit-close`}
        >
          <CloseIcon />
        </button>
      </div>
      <div className={`row center space-between full-width`}>
        {editing ? (
          <input
            className={`user-group-edit-input`}
            value={editName}
            onChange={(e: any) => setEditName(e.target.value)}
          ></input>
        ) : (
          <h3>
            {props.activeGroup}
            <i> ({props.activeGroupCount} members)</i>
          </h3>
        )}
        <div className={`row center space-between`}>
          <button
            className={`event-item-description-button new-event-button-blue`}
            onClick={handleEdit}
          >
            {editing ? "Save Changes" : "Edit Group name"}
          </button>

          {editing ? (
            <button
              className={`event-item-description-button new-event-button-red`}
              onClick={handleReset}
            >
              Cancel
            </button>
          ) : props.activeGroup !== "No Group" ? (
            <button
              className={`event-item-description-button new-event-button-red`}
              onClick={() => handleEdit("delete")}
            >
              Delete Group
            </button>
          ) : null}
        </div>
      </div>
      <UserListContainer
        users={userUsers.activeUsers}
        userList={props.activeGroupPeople}
        loading={props.loading}
        action={props.selectUser}
        class={`full-width center-self full-height`}
        hideTitle={true}
        showDetails={true}
      />
    </section>
  );
}

export default UserGroupEditContainer;
