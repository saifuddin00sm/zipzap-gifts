import React, { useEffect, useState } from "react";
import { parseISO, parse, isValid } from "date-fns";
import { userRecipient } from "../../../classes";
import { Row, Col } from "react-bootstrap";
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
  recurringType?: string
}) {
  const [searchList, setSearchList] = useState(
    JSON.parse(JSON.stringify(props.userList)) as Array<string>
  );

  // const [department, setDepartment] = useState("Filter By Department");

  const [searchValue, setSearchValue] = useState("");

  const resetList = () => {
    setSearchList([...JSON.parse(JSON.stringify(props.userList))]);
  };

  // const handleSetDepartment = (type: string) => {
  //   setDepartment(type);
  // }

  var departments = [];
  departments.push("");

  for (const [, value] of Object.entries(props.users)) {
    if (!departments.includes(value.Department) && value.Department !== " ") {
      departments.push(value.Department);
    }
  }

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
            "Job Title" in user &&
            user["Job Title"]
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          ) {
            return true;
          } else if (
            "Department" in user &&
            user.Department.toLowerCase().includes(e.target.value.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });

      setSearchValue(e.target.value);
      setSearchList([...users]);
    } else {
      resetList();
      setSearchValue("");
    }
  };

  // const filterDepartment = (String department) => {
  //     let users = props.userList.filter((userID) => {
  //       let user = props.users[userID];

  //       if (user) {
  //         if (
  //           "Department" in user &&
  //           user.Department.toLowerCase().includes(department)
  //         ) {
  //           return true;
  //         }
  //       }
  //     });
  // };

  useEffect(() => {
    handleSearch({ target: { value: searchValue } });
  }, [props.userList.length]);

  return props.loading ? (
    <Col className={`${props.class ? props.class : "user-list-container"}`}>
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
            <div className={`loading-skeleton row center`}>
              Loading Recipients
            </div>
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
    </Col>
  ) : (
    <Col
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
      <Col
        className={`full-width event-user-list-column center-column p-4 ${
          props.buttonType === "remove" ? "event-user-list-blue" : ""
        }`}
      >
        {/* <Row className="m-2">
            <DropdownButton id="dropdown-basic-button" title={department} variant="light">
              {departments.map((item) => (
                  <Dropdown.Item key={item} onClick={() => handleSetDepartment(item)}>{item}</Dropdown.Item>
              ))}
              </DropdownButton>
        </Row> */}
        <Row className="align-left">
          <input
            className={`event-user-search-bar`}
            placeholder={`Search for a Recipient`}
            onChange={handleSearch}
          ></input>
        </Row>
        <Row className={`event-user-list`}>
          {props.showDetails ? (
            <Row
              className={`space-bewteen border-bottom border-dark align-left`}
            >
              <Col>Name</Col>
              <Col>Birthday</Col>
              <Col>Address</Col>
              <Col>Job Title</Col>
              <Col>Date Started</Col>
              <Col>Department</Col>
            </Row>
          ) : null}
          {/* <tbody className={`${props.showDetails ? "" : "table-full-height"}`}> */}
          {searchList.map((userID, uIndex) => {
            const user = props.users[userID];

            // Dates should be UTC ISO strings, but some are local MM/dd/yyyy dates
            let birthday = parseISO(user.Birthday);
            if (!isValid(birthday)) {
              birthday = new Date(user.Birthday);
            }
            let dateStarted = parseISO(user["Date Started"]);
            if (!isValid(dateStarted)) {
              dateStarted = new Date(user["Date Started"]);
            }

            return props.showDetails ? (
              <Row
                className={`space-bewteen align-left border-bottom tableInfo`}
                key={uIndex}
                onClick={() => props.action(userID)}
              >
                <Col>
                  {user["First Name"]} {user["Last Name"]}
                </Col>
                <Col>{birthday.toLocaleDateString()}</Col>
                <Col>{user.Address}</Col>
                <Col>{user["Job Title"]}</Col>
                <Col>{dateStarted.toLocaleDateString()}</Col>
                <Col>{user.Department}</Col>
              </Row>
            ) : (
              // {
              // <button
              //     className={`event-user-list-button ${
              //       props.buttonType === "remove"
              //         ? "event-user-list-button-remove"
              //         : ""
              //     }`}
              //     onClick={() => props.action(userID)}
              //   >
              //     <PlusIcon />
              //   </button>
              // }
              <Row
                key={uIndex}
                className={`p-1 border-bottom event-user-list-list`}
              >
                <Col>
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
                </Col>
                <Col sm={10}>
                  {user["First Name"]} {user["Last Name"]}
                </Col>
              </Row>
            );
          })}
        </Row>
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
      </Col>
    </Col>
  );
}

export default UserListContainer;
