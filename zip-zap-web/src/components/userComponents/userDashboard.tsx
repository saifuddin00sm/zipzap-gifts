import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { fetchRequest, UserContext } from "../../App";
import { userRecipient } from "../../classes";
import LoadingIcon from "../basicComponents/LoadingIcon";
import { ReactComponent as AddIcon } from "../../icons/plusSign.svg";
import { Link } from "react-router-dom";
import { getUserList } from "../eventComponents/eventDashboard";
import UserListContainer from "../basicComponents/eventComponents/userListContainer";
import UserGroupEditContainer from "./userGroupEditContainer";
import UserAddRecipientContainer from "./userAddRecipientContainer";
import ModalBox from "../basicComponents/modalBox";

function UserDashboard() {
  const { user, userUsers, setUserUsers, setUserUsersLoaded } =
    useContext(UserContext);
  const [loading, setLoading] = useState(true);
  let userList = new Array<string>();
  // const [userList, setUserList] = useState([] as Array<string>);

  const settingUsers = async () => {
    let users = await getUserList(user);
    setUserUsers(users);
    setUserUsersLoaded(true);

    if ("activeUsers" in users) {
      let userListTemp = new Array<string>();
      for (const user1 in users.activeUsers) {
        userListTemp.push(user1);
      }
      userList = userListTemp;
      // userGroupSetup(users.activeUsers);
    }
    setLoading(false);
  };

  const [userGroupList, setUserGroupList] = useState(
    {} as { [key: string]: { group: string; count: number } }
  );

  const userGroupSetup = async (userList: { [key: string]: userRecipient }) => {
    let finalGroups = {} as { [key: string]: { group: string; count: number } };

    Object.keys(userList).forEach((userID) => {
      if (!(userList[userID].Department in finalGroups)) {
        finalGroups[userList[userID].Department] = {
          group: userList[userID].Department,
          count: 1,
        };
      } else {
        finalGroups[userList[userID].Department].count += 1;
      }
    });

    // setUserGroupList({ ...finalGroups });
    setLoading(false);
  };

  useEffect(() => {
    if (Object.keys(userUsers.activeUsers).length === 0) {
      settingUsers();
    } else {
      let userListTemp = new Array<string>();
      for (const user1 in userUsers.activeUsers) {
        userListTemp.push(user1);
      }
      userList = userListTemp;
      // setUserList(Object.keys(userUsers.activeUsers));
      // userGroupSetup(userUsers.activeUsers);
      setLoading(false);
    }
  }, []);

  const [activeGroup, setActiveGroup] = useState("");
  const activeGroupPeople = [] as Array<string>;
  /*
  const handleActivateGroup = (group: string) => {
    if (activeGroup === group) {
      setActiveGroup("");
      setActiveGroupPeople([]);
    } else {
      setActiveGroup(group);
      if (group === "No Group") {
        group = "";
      }
      console.log("G", group);

      let filtered = Object.keys(userUsers.activeUsers).filter((userID) =>
        userUsers.activeUsers[userID].Department === group ? userID : null
      );

      setActiveGroupPeople(filtered);
    }
  };
  */

  const handelEditGroup = async (oldGroup: string, newGroup: string) => {
    setLoading(true);
    if (oldGroup === "No Group") {
      oldGroup = "";
    }

    let updateResponse = await fetchRequest(user, "userList", "PUT", {
      users: activeGroupPeople,
      type: "group",
      old: oldGroup,
      new: newGroup,
    });

    console.log("UPDATED", updateResponse, [oldGroup], [newGroup]);

    if (updateResponse.updated) {
      let newList = activeGroupPeople.map((userID) => {
        if (userID in userUsers.activeUsers) {
          let user = userUsers.activeUsers[userID];

          if (user.Department === oldGroup) {
            user.Department = newGroup;
          } else {
            console.log(
              "DIDN'T Match? ",
              user["First Name"],
              user["Last Name"],
              user.Department,
              oldGroup,
              newGroup
            );
          }

          userUsers.activeUsers[userID] = user;
        }
      });

      await Promise.all(newList);

      setUserUsers({ ...userUsers });

      let oldDict = userGroupList[oldGroup];
      oldDict.group = newGroup;
      userGroupList[newGroup] = oldDict;

      delete userGroupList[oldGroup];

      setUserGroupList({ ...userGroupList });
      setActiveGroup(newGroup);
      userGroupSetup(userUsers.activeUsers);
    } else {
      // TO-DO - SHOW ERROR
    }

    setLoading(false);
  };

  const [addNewUser, setAddNewUser] = useState(false);
  const [editUser, setEditUser] = useState(
    undefined as undefined | userRecipient
  );
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddNewUser = async (newUser: userRecipient) => {
    setLoading(true);
    let newUserID = editUser
      ? newUser.userID
      : (
          Object.keys(userUsers.activeUsers).length +
          Object.keys(userUsers.inActiveUsers).length +
          1
        ).toString();

    if (!newUserID) {
      newUserID = (
        Object.keys(userUsers.activeUsers).length +
        Object.keys(userUsers.inActiveUsers).length +
        1
      ).toString();
    }

    newUser.Birthday = new Date(newUser.Birthday).toISOString();
    newUser["Date Started"] = new Date(newUser["Date Started"]).toISOString();
    let body: any;

    body = newUser;
    body.userID = newUserID;

    let addUserResponse = await fetchRequest(
      user,
      "userList/user",
      editUser ? "PUT" : "POST",
      body
    );
    // console.log("ADD", addUserResponse);
    if (addUserResponse.saved) {
      userUsers.activeUsers[newUserID] = newUser;
      setUserUsers({ ...userUsers });

      userGroupSetup(userUsers.activeUsers);

      let userListTemp = new Array<string>();
      for (const user1 in userUsers.activeUsers) {
        userListTemp.push(user1);
      }
      userList = userListTemp;

      setSuccessMessage(`User ${editUser ? "Updated" : "Added"} Successfully`);
      setEditUser(undefined);
    } else {
      setSuccessMessage("Whoops, please contact support");
    }

    setLoading(false);
  };

  const clearSuccessfulMessage = () => {
    setSuccessMessage("");
  };

  const selectUserToEdit = (userID: string) => {
    if (userID in userUsers.activeUsers) {
      userUsers.activeUsers[userID].userID = userID;
      setEditUser(userUsers.activeUsers[userID]);
      setAddNewUser(true);
    }
  };

  return (
    <Col>
      <Row>
        <Col className="page-header justify-content-center">
          <h3>Recipient Dashboard</h3>
        </Col>
      </Row>
      {/* <header className={`column center page-header`}>
        <h1>People Dashboard</h1>
      </header> */}
      <Row>{loading ? <LoadingIcon /> : null}</Row>

      {/* holds 4 Containers */}
      <Row className="d-flex justify-content-center mb-3">
        {addNewUser ? (
          <UserAddRecipientContainer
            saveAction={handleAddNewUser}
            closeAction={setAddNewUser}
            loading={loading}
            user={editUser}
          />
        ) : activeGroup ? (
          <UserGroupEditContainer
            activeGroup={activeGroup}
            activeGroupCount={
              activeGroup in userGroupList
                ? userGroupList[activeGroup].count
                : 0
            }
            activeGroupPeople={activeGroupPeople}
            saveAction={handelEditGroup}
            closeAction={setActiveGroup}
            selectUser={selectUserToEdit}
            loading={loading}
          />
        ) : successMessage ? (
          <ModalBox>
            {successMessage ? (
              <div className={`column`}>
                <span>{successMessage}</span>
                <br></br>
                <button
                  className={`new-event-button new-event-button-grey`}
                  onClick={clearSuccessfulMessage}
                >
                  Close
                </button>
              </div>
            ) : (
              `Please wait...`
            )}{" "}
          </ModalBox>
        ) : null}

        {/* <section
          className={`row center-row full-width event-dashboard-top-row`}
        > */}
        {/* event list container */}
        {/* <Col sm="6">
            <Row className="event-dashboard-sub-title primary-black-header mx-2">
              <span>Groups</span>
            </Row>
            <Row className="mx-2">
              <ol className={`column center event-dashboard-events-list`}>
                {userUsersLoaded &&
                Object.keys(userUsers.activeUsers).length === 0 ? (
                  <div>
                    No Recipients, upload a list now!
                    <br></br>
                    <div className={`column center event-dashboard-events-list`}>
                      <Link
                        to={"/people/upload"}
                        className={`row center add-event-button add-event-button-black `}
                      >
                        <AddIcon />
                      </Link>
                    </div>
                  </div>
                ) : (
                  Object.keys(userGroupList)
                    .sort()
                    .map((group, gIndex) => (
                      <UserGroupRow
                        group={group === "" ? "No Group" : group}
                        index={userGroupList[group].count}
                        key={gIndex}
                        action={handleActivateGroup}
                      />
                    ))
                )}
              </ol>
            </Row>
          </Col> */}

        {/* Add List/Recipient container */}
        <Col sm="6">
          <div className={`full-width`}>
            <div className={`event-dashboard-sub-title primary-black-header`}>
              <span>Upload a List</span>
            </div>
            <div className={`column center event-dashboard-events-list`}>
              <Link
                to={"/recipients/upload"}
                className={`add-event-button-link`}
              >
                <AddIcon className="addIcon" />
              </Link>
            </div>
          </div>
        </Col>
        <Col sm="6">
          <div className={`full-width`}>
            <div className={`event-dashboard-sub-title primary-black-header`}>
              <span>Add a Recipient</span>
            </div>
            <div className={`column center event-dashboard-events-list`}>
              <button
                className={`add-event-button add-event-button-blue`}
                onClick={() => setAddNewUser(true)}
              >
                <AddIcon className="addIcon" />
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={`event-dashboard-sub-title primary-black-header`}>
            <span>List of Recipients</span>
          </div>

          <UserListContainer
            users={userUsers.activeUsers}
            userList={userList}
            loading={loading}
            action={selectUserToEdit}
            class={`full-width center-self pb-2`}
            hideTitle={true}
            showDetails={true}
          />
        </Col>
      </Row>
    </Col>
  );
}

export default UserDashboard;
