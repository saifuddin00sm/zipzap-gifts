import React, { useContext, useRef, useState } from "react";
import { isMatch, parse, parseISO } from "date-fns";
import { fetchRequest, log, UserContext } from "../../App";
import { userRecipient } from "../../classes";
import { Link } from "react-router-dom";
import UserListContainer from "../basicComponents/eventComponents/userListContainer";
import UserAddRecipientContainer from "./userAddRecipientContainer";
import { Row, Col, Button, Modal } from "react-bootstrap";

function UserNewList() {
  const { user, userUsers, setUserUsers, setUserUsersLoaded } =
    useContext(UserContext);

  const userUsersRef = useRef(userUsers);
  userUsersRef.current = userUsers;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const [editUserID, setEditUserID] = useState("");
  const [editUser, setEditUser] = useState({
    "First Name": "",
    "Last Name": "",
    Department: "",
    "Job Title": "",
    Birthday: "",
    "Date Started": "",
    Address: "",
    City: "",
    State: "",
    Zip: "",
  } as userRecipient);

  const resetEditUser = () => {
    setEditUser({
      ...{
        "First Name": "",
        "Last Name": "",
        Department: "",
        "Job Title": "",
        Birthday: "",
        "Date Started": "",
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
    if (uploadedFile == null) {
      setError("Please Choose a File");
      return {
        uploaded: false,
        error: "Please Choose a File"
      };
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

    editedUser.Birthday = convertDate(editedUser.Birthday);
    editedUser["Date Started"] = convertDate(editedUser["Date Started"]);
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
      <Row className={`mx-2 people-dashboard-events-list`}>
      {/* holds 4 Containers */}
        {loading ? (
          <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>
                  {success ? (
                    <h5>list created sucessfully!
                    </h5>
                  ) : (
                    <h5>List uploading now</h5>
                  )}{" "}
                </Modal.Title>
              </Modal.Header>
                {/* <button
                  className={`new-event-button new-event-button-grey`}
                  onClick={() => setLoading(false)}
                >
                  Close
                </button>
              </div> */}
                <Modal.Footer>
                  <button
                    className="general-button gereral-button-green px-4 py-2"
                    onClick={handleClose}
                  >
                    <Link to={"/recipients"}>Back to Dashboard</Link>
                  </button>
                  <button
                    className=" general-button gereral-button-blue px-4 py-2"
                    onClick={handleClose}
                  >
                    <Link to={"/recipients/upload"}>Close</Link>
                  </button>
                </Modal.Footer>
          </Modal>
        ) : null}

        {/* instructions */}
        {newUploads.length === 0 ? (
          <Col className={`m-4`}>
            <div className={`event-dashboard-sub-title primary-black-header mb-4`}>
              <span>Upload List</span>
            </div>
            <Row className="align-left">
              <p>
                <b>
                  Step 1: Format an csv document with a person on each row and
                  the following attributes (see example above):
                </b>
              </p>
            </Row>
            <Row className="my-2">
              <Col md="4">
                <ul className={`new-recipient-list-fields`}>
                  {Object.keys(editUser).map((key: string, kIndex: number) => (
                    <li key={kIndex}>{key}</li>
                  ))}
                </ul>
              </Col>
              <Col md="8">
                <Row>
                <img
                  src={`/media/images/new-list-example.png`}
                  alt={`New List Example`}
                  className={`item-card-image-main mb-3`}
                ></img>
                </Row>
                <Row className="center">
                  <Button variant="zapGreen" className="general-button small-button" >
                  <a
                    href={"/media/files/zipzap-template.csv"}
                  >
                    Download Template
                  </a>
                  </Button>
                </Row>
              </Col>
            </Row>
            <Row className="align-left my-2">
                  <span className="my-4"><b>Step 2: Choose a File</b></span>
                  <input
                    accept=".csv"
                    type={`file`}
                    onChange={uploadFileChange}
                    name="upload a file"
                  ></input>
            </Row>
          </Col>
        ) : (
          <Row className={`event-dashboard-full-column  column left-align-column `}>
                <UserListContainer
                  users={userUsers.activeUsers}
                  userList={newUploads}
                  loading={reload}
                  action={loadEditUser}
                  buttonType={"edit"}
                  title={"New Uploaded List"}
                  showDetails={true}
                  // hideTitle={true}
                  class={`m-3 full-height`}
                />
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

            <Button
              className={`new-event-button new-event-button-blue m-4`}
              onClick={uploadFileCheck}
              variant="zipBlue"
            >
              Upload List
            </Button>
          </div>
        ) : (
          <Row>
            {error ? error : ""}
            <Col className={`full-width`}>
              <p>Successfully uploaded list</p>
            </Col>
          </Row>
        )}
        {/* Upload Button */}
      </Row>
    </Col>
  );
}

export default UserNewList;
