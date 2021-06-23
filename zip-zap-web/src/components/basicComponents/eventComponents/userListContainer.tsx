import React, { useEffect, useState } from "react";
import { userEvent, userItem, userRecipient } from "../../../classes";
import { ReactComponent as PlusIcon } from "../../../icons/plusSign.svg";
import { ReactComponent as EditIcon } from "../../../icons/edit.svg";

function UserListContainer(props: {
  users: { [key: string]: userRecipient };
  userList: Array<string>;
  loading?: boolean;
  action: Function;
  class?: string;
  buttonType?: string;
  title?: string;
  hideTitle?: boolean;
  showDetails?: boolean;
}) {
  const [searchList, setSearchList] = useState(
    JSON.parse(JSON.stringify(props.userList)) as Array<string>
  );

  const [searchValue, setSearchValue] = useState("");

  const resetList = () => {
    setSearchList([...JSON.parse(JSON.stringify(props.userList))]);
  };

  const handleSearch = (e: any) => {
    if (e.target.value) {
      let users = props.userList.filter((userID) => {
        let user = props.users[userID];

        if (user) {
          if (
            "First Name" in user &&
            user["First Name"]
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          ) {
            return true;
          } else if (
            "Last Name" in user &&
            user["Last Name"]
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          ) {
            return true;
          } else if (
            "Address" in user &&
            user.Address.toLowerCase().includes(e.target.value.toLowerCase())
          ) {
            return true;
          } else if (
            "Title" in user &&
            user["Title"].toLowerCase().includes(e.target.value.toLowerCase())
          ) {
            return true;
          } else if (
            "Department" in user &&
            user.Department.toLowerCase().includes(e.target.value.toLowerCase())
          ) {
            return true;
          }
        }
      });

      setSearchValue(e.target.value);
      setSearchList([...users]);
    } else {
      resetList();
      setSearchValue("");
    }
  };

  useEffect(() => {
    handleSearch({ target: { value: searchValue } });
  }, [props.userList.length]);

  return props.loading ? (
    <div
      className={`${
        props.class
          ? props.class
          : "event-dashboard-half-column user-list-container"
      } column`}
    >
      {props.hideTitle ? null : (
        <div
          className={`event-user-list-title full-width ${
            props.buttonType === "remove" ? "event-user-list-blue" : ""
          }`}
        >
          {props.title ? props.title : "Master List"}{" "}
        </div>
      )}

      <div
        className={`full-width event-user-list-column column center ${
          props.buttonType === "remove" ? "event-user-list-blue" : ""
        }`}
      >
        <div className={`full-width column center`}>
          <div className={` event-user-search-bar-loading`}>
            <div className={`loading-skeleton row center`}>Loading Users</div>
          </div>
        </div>

        <div className={`event-user-list-list`}>
          {[...Array(6)].map((item, iIndex) => (
            <div
              key={iIndex}
              className={`event-item-card-text-loading event-user-list-user-loading`}
            >
              <div className={`loading-skeleton`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`${
        props.class
          ? props.class
          : "event-dashboard-half-column user-list-container"
      } column`}
    >
      {props.hideTitle ? null : (
        <div
          className={`event-user-list-title full-width ${
            props.buttonType === "remove" ? "event-user-list-blue" : ""
          }`}
        >
          {props.title ? props.title : "Master List"}{" "}
        </div>
      )}
      <div
        className={`full-width event-user-list-column column center-column ${
          props.buttonType === "remove" ? "event-user-list-blue" : ""
        }`}
      >
        <div className={`full-width`}>
          <input
            className={`event-user-search-bar`}
            placeholder={`Search for a user`}
            onChange={handleSearch}
          ></input>
        </div>

        <table className={`column event-user-list-list previous-order-table`}>
          {props.showDetails ? (
            <thead className={`row center space-bewteen`}>
              {false ? <th scope="col">Select</th> : null}
              <th scope="col">Name</th>
              <th scope="col">Birthday</th>
              <th scope="col">Address</th>
              <th scope="col">Title</th>
              <th scope="col">Date Started</th>
              <th scope="col">Department</th>
            </thead>
          ) : null}
          <tbody className={`${props.showDetails ? "" : "table-full-height"}`}>
            {searchList.map((userID, uIndex) =>
              props.showDetails ? (
                <tr
                  key={uIndex}
                  className={`row center space-between user-list-detail-row`}
                  onClick={() => props.action(userID)}
                >
                  <td data-label="Recipient">
                    {props.users[userID]["First Name"]}{" "}
                    {props.users[userID]["Last Name"]}
                  </td>
                  <td data-label="Birthday">{props.users[userID].Birthday}</td>
                  <td data-label="Address">{props.users[userID].Address}</td>
                  <td data-label="Title">{props.users[userID]["Title"]}</td>
                  <td data-label="Date Started">
                    {props.users[userID]["Date Started"]}
                  </td>
                  <td data-label="Department">
                    {props.users[userID].Department}
                  </td>

                  {/* <button
                    className={`event-user-list-button ${
                      props.buttonType === "remove"
                        ? "event-user-list-button-remove"
                        : ""
                    }`}
                    onClick={() => props.action(userID)}
                  >
                    <PlusIcon />
                  </button> */}
                </tr>
              ) : (
                <div key={uIndex} className={`row center space-between`}>
                  <span>
                    {props.users[userID]["First Name"]}{" "}
                    {props.users[userID]["Last Name"]}
                  </span>
                  <button
                    className={`event-user-list-button ${
                      props.buttonType === "remove"
                        ? "event-user-list-button-remove"
                        : ""
                    }`}
                    onClick={() => props.action(userID)}
                  >
                    {props.buttonType === "edit" ? <EditIcon /> : <PlusIcon />}
                  </button>
                </div>
              )
            )}
          </tbody>
        </table>

        {props.showDetails ||
        props.buttonType === "none" ||
        props.buttonType === "edit" ? null : (
          <button
            className={`new-event-button new-event-button-white`}
            onClick={() =>
              props.action(
                props.buttonType === "remove" ? "removeAll" : "addAll"
              )
            }
          >
            {props.buttonType === "remove" ? "Remove" : "Add"} All
          </button>
        )}
      </div>
    </div>
  );
}

export default UserListContainer;
