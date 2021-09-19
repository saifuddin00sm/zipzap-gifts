import React, { useContext, useEffect, useRef, useState } from "react";
import { fetchRequest, log, UserContext } from "../../App";
import {
  userGroupedItem,
  userItem,
  userMonthOrderList,
  userRecipient,
} from "../../classes";
import LoadingIcon from "../basicComponents/LoadingIcon";
import { ReactComponent as AddIcon } from "../../icons/plusSign.svg";
import EventDetailsRow from "../basicComponents/eventComponents/eventDetailsRow";
import { Link } from "react-router-dom";
import CalendarMonth from "../basicComponents/calendarComponents/calendarMonth";
import CalendarSidebar from "../basicComponents/calendarComponents/calendarSidebar";
import { getUserList } from "../eventComponents/eventDashboard";
import UserListContainer from "../basicComponents/eventComponents/userListContainer";
import UserGroupRow from "../basicComponents/userComponents/userGroupRow";
import UserGroupEditContainer from "./userGroupEditContainer";
import UserAddRecipientContainer from "./userAddRecipientContainer";
import ModalBox from "../basicComponents/modalBox";
import {Row, Col, Button} from 'react-bootstrap';

function UserNewList() {
  const { user, userUsers, setUserUsers, setUserUsersLoaded } =
    useContext(UserContext);

  const userUsersRef = useRef(userUsers);
  userUsersRef.current = userUsers;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState("");

  const [editUserID, setEditUserID] = useState("");
  const [editUser, setEditUser] = useState({
    ["First Name"]: "",
    ["Last Name"]: "",
    Department: "",
    ["Title"]: "",
    Birthday: "",
    ["Date Started"]: "",
    Address: "",
    City: "",
    State: "",
    Zip: "",
  } as userRecipient);

  const resetEditUser = () => {
    setEditUser({
      ...{
        ["First Name"]: "",
        ["Last Name"]: "",
        Department: "",
        ["Title"]: "",
        Birthday: "",
        ["Date Started"]: "",
        Address: "",
        City: "",
        State: "",
        Zip: "",
      },
    });
    setEditUserID("");
  };

  const loadEditUser = (userID: string) => {
    if (userID in userUsers.activeUsers) {
      setEditUser(userUsers.activeUsers[userID]);
      setEditUserID(userID);
    }
  };

  const [uploadedFile, setUploadedFile] = useState(null as null | any);

  const [newUploads, setNewUploads] = useState([] as Array<string>);

  const uploadFileChange = (e: any) => {
    setUploadedFile(e.target.files[0]);
    setError("");
  };

  const uploadFileCheck = async () => {
    if (uploadedFile === null) {
      setError("Please Choose a File");
    } else {
      setError("");
    }

    setLoading(true);

    let urlResponse = await fetchRequest(user, `user/masterList`, "POST", {
      fileName: uploadedFile.name,
    });

    let uploadResponse = await fetch(urlResponse.url, {
      method: "PUT",
      body: uploadedFile,
      headers: {
        "Content-Type": uploadedFile.type,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return { uploaded: true, error: "" };
        } else {
          return { uploaded: false, error: "Please Contact Support" };
        }
      })
      .catch((err) => {
        return {
          uploaded: false,
          error: "Please Contact Support",
          errorDetails: err,
        };
      });

    if (uploadResponse.error) {
      log("Upload ERROR: ", uploadResponse);

      // TO-DO - Handle Errors
      setLoading(false);
      return true;
    }

    if (uploadResponse.uploaded) {
      let processUploadResponse = await fetchRequest(
        user,
        `user/masterList`,
        "PUT",
        {
          fileName: uploadedFile.name,
        }
      );

      // TO-DO - Handle Errors
      if (!processUploadResponse.error && processUploadResponse.newUserIds) {
        // userUser
        setUserUsers({ ...processUploadResponse.users });
        setNewUploads(processUploadResponse.newUserIds);
        setSuccess(true);
        setUserUsersLoaded(true);
      } else {
        setLoading(false);
      }
    }
  };

  const saveEditedUser = async (editedUser: userRecipient) => {
    setLoading(true);
    setReload(true);

    editedUser.Birthday = new Date(editedUser.Birthday).toISOString();
    editedUser["Date Started"] = new Date(
      editedUser["Date Started"]
    ).toISOString();
    let body: any;

    body = editedUser;
    body.userID = editUserID;

    let addUserResponse = await fetchRequest(
      user,
      "userList/user",
      "POST",
      body
    );

    // TO-DO - Handle Error
    if (addUserResponse.saved) {
      userUsers.activeUsers[editUserID] = editedUser;

      setUserUsers({ ...userUsers });
      resetEditUser();
      setNewUploads([...newUploads]);
      setReload(false);
    }

    setLoading(false);
  };

  return (
    <Col className="mb-3">
      <Row>
        <Col className="page-header justify-content-center">
          <h3>People Dashboard</h3>
        </Col>
      </Row>

      <Row className={`mx-2 width-45`}>
        <Link to={"/recipients"} className={`back-link`}>
          Back to People Dashboard
        </Link>
      </Row>

      {/* holds 4 Containers */}
      <Row className={`mx-2 people-dashboard-events-list`}>
        <div className={`event-dashboard-sub-title primary-black-header`}>
          <span>Upload List</span>
        </div>
        {loading ? (
          <ModalBox>
            {success ? (
              <div className={`column`}>
                <span>list created sucessfully!</span>
                <br></br>
                <button
                  className={`new-event-button new-event-button-grey`}
                  onClick={() => setLoading(false)}
                >
                  Close
                </button>
              </div>
            ) : (
              `uploading list please wait...`
            )}{" "}
          </ModalBox>
        ) : null}

        {/* instructions */}
        {newUploads.length === 0 ? (
          <Col className={`m-4`}>
          <Row>
                <p><b>
                  Step 1: Format an csv document with a person on each row and
                  the following attributes (see example above):
                  </b>
                </p>
          </Row>
          <Row>
            <Col md="4">
                  <ul className={`new-recipient-list-fields`}>
                    {Object.keys(editUser).map(
                      (key: string, kIndex: number) => (
                        <li key={kIndex}>{key}</li>
                      )
                    )}
                  </ul>
              </Col>
              <Col md="8">
              <img
                src={`/media/images/new-list-example.png`}
                alt={`New List Example`}
                className={`item-card-image-main mb-3`}
              ></img>
              <a
                  href={"/media/files/zipzap-template.csv"}
                  className={`new-event-button new-event-button mt-3 px-3`}
                >
                  Download Template
                </a>
            </Col>
          </Row>
          <Row>
              <div className={`column full-width`}>
                <p> <b>Step 2: Choose a File </b> </p>
                <div className={`row center space-between`}>
                  <input
                    accept=".csv"
                    type={`file`}
                    onChange={uploadFileChange}
                  ></input>
                </div>
              </div>
          </Row>
        </Col>
        ) : (
          <Row>
            <div
              className={`event-dashboard-full-column  column left-align-column`}
            >
              <div className={`column full-width`}>
                <UserListContainer
                  users={userUsers.activeUsers}
                  userList={newUploads}
                  loading={reload}
                  action={loadEditUser}
                  buttonType={"edit"}
                  title={"New Upload List"}
                  // hideTitle={true}
                  class={`full-width center-self full-height`}
                />
              </div>
            </div>
          </Row>
        )}

        {newUploads.length > 0 && editUser["First Name"] ? (
          <UserAddRecipientContainer
            saveAction={saveEditedUser}
            closeAction={resetEditUser}
            loading={loading}
            user={editUser}
          />
        ) : null}
        {newUploads.length === 0 ? (
          <div className={`column center full-width`}>
            {error ? error : ""}

            <button
              className={`new-event-button new-event-button-blue`}
              onClick={uploadFileCheck}
            >
              Upload List
            </button>
          </div>
        ) : (
          <div className={`row center full-width`}>
            {error ? error : ""}

            <button
              className={`new-event-button new-event-button-blue`}
              onClick={uploadFileCheck}
            >
              Edit List
            </button>
            <button
              className={`new-event-button new-event-button-blue`}
              onClick={uploadFileCheck}
            >
              Upload Another List
            </button>
          </div>
        )}
        {/* Upload Button */}
      </Row>
    </Col>
  );
}

export default UserNewList;
function userGroupSetup(activeUsers: { [key: string]: userRecipient }) {
  throw new Error("Function not implemented.");
}
