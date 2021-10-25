import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { isMatch, parse, parseISO } from "date-fns";
import { fetchRequest, UserContext, log } from "../../App";
import { userRecipient } from "../../classes";
import ToolTip from "../basicComponents/ToolTip";
import LoadingIcon from "../basicComponents/LoadingIcon";
import { ReactComponent as AddIcon } from "../../icons/plusSign.svg";
import { Link } from "react-router-dom";
import { getUserList } from "../eventComponents/eventDashboard";
import UserListContainer from "../basicComponents/eventComponents/userListContainer";
import UserGroupEditContainer from "./userGroupEditContainer";
import UserAddRecipientContainer from "./userAddRecipientContainer";

function UserDashboard() {
    const { user, userUsers, setUserUsers, setUserUsersLoaded } =
        useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState([] as Array<string>);

    const [userGroupList, setUserGroupList] = useState(
        {} as { [key: string]: { group: string; count: number } }
    );

    const userGroupSetup = async (userList: {
        [key: string]: userRecipient;
    }) => {
        let finalGroups = {} as {
            [key: string]: { group: string; count: number };
        };

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

        setUserGroupList({ ...finalGroups });
        setLoading(false);
    };

    useEffect(() => {
        const settingUsers = async () => {
            let users = await getUserList(user);
            setUserUsers(users);
            setUserUsersLoaded(true);

            if ("activeUsers" in users) {
                setUserList(Object.keys(users.activeUsers));
                userGroupSetup(users.activeUsers);
                return;
            }

            setLoading(false);
        };

        if (Object.keys(userUsers.activeUsers).length === 0) {
            settingUsers();
        } else {
            setUserList(Object.keys(userUsers.activeUsers));
            setLoading(false);
            // userGroupSetup(userUsers.activeUsers);
        }
    }, [user, userUsers, setUserUsers, setUserUsersLoaded]);

    const [activeGroup, setActiveGroup] = useState("");
    const activeGroupPeople = [] as Array<string>;

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

        log("UPDATED", updateResponse, [oldGroup], [newGroup]);

        if (updateResponse.updated) {
            activeGroupPeople.forEach((userID) => {
                if (userID in userUsers.activeUsers) {
                    let user = userUsers.activeUsers[userID];

                    if (user.Department === oldGroup) {
                        user.Department = newGroup;
                    } else {
                        log(
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

        // A helper function to take a date string that's possibly local and convert it to UTC ISO string
        const convertDate = (dateString: string) => {
            let date;
            if (isMatch(dateString, "yyyy-MM-dd")) {
                date = parse(dateString, "yyyy-MM-dd", new Date());
            } else if (isMatch(dateString, "yyyy-MM-dd'T'HH:mm:ss'Z'")) {
                date = parseISO(dateString);
            } else {
                date = new Date(dateString);
            }
            return date.toISOString();
        };

        newUser.Birthday = convertDate(newUser.Birthday);
        newUser["Date Started"] = convertDate(newUser["Date Started"]);
        let body: any;

        body = newUser;
        body.userID = newUserID;

        let addUserResponse = await fetchRequest(
            user,
            "userList/user",
            editUser ? "PUT" : "POST",
            body
        );
        if (addUserResponse.saved) {
            userUsers.activeUsers[newUserID] = newUser;
            setUserUsers({ ...userUsers });

            userGroupSetup(userUsers.activeUsers);
            setUserList(Object.keys(userUsers.activeUsers));
            setSuccessMessage(
                `User ${editUser ? "Updated" : "Added"} Successfully`
            );
            setEditUser(undefined);
            setAddNewUser(false);
        } else {
            setSuccessMessage("Whoops, please contact support");
        }

        setLoading(false);
        log("It is done");
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
                    <Modal
                        show={successMessage}
                        onHide={clearSuccessfulMessage}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <span>{successMessage}</span>
                            </Modal.Title>
                        </Modal.Header>
                    </Modal>
                ) : null}

                {/* Add List/Recipient container */}
                <Col sm="6">
                    <div className={`full-width`}>
                        <div
                            className={`event-dashboard-sub-title primary-black-header`}
                        >
                            <span>Upload a List</span>
                        </div>
                        <div
                            className={`column center event-dashboard-events-list`}
                        >
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
                        <div
                            className={`event-dashboard-sub-title primary-black-header`}
                        >
                            <span>Add a Recipient</span>
                        </div>
                        <div
                            className={`column center event-dashboard-events-list`}
                        >
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
                    <div
                        className={`event-dashboard-sub-title primary-black-header d-flex justify-content-center`}
                    >
                        <span>List of Recipients</span>&nbsp;
                        <ToolTip placement="bottom">
                            Click to edit a Recipient
                        </ToolTip>
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
