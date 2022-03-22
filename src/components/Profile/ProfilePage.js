
import { Row, Col, Container, Button, Image, Card} from "react-bootstrap";
import React, {useEffect, useState } from "react";
import {
    IconPhone,
    IconEmail,
    IconHome
} from "@aws-amplify/ui-react";
import { useOutletContext } from "react-router-dom";
import { getUser } from "../../graphql/queries";
import { createAddress } from "../../graphql/mutations";
import { createCompany } from "../../graphql/mutations";
import { updateUser } from "../../graphql/mutations";
import { updateAddress } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import useAuth from "../../hooks/useAuth";


const initialState = { company: "", size: "", address: "", address2: "",city: "", state: "", zip: "", name: "", phone: ""};

function ProfilePage(props) {
    //congito user information
    const {tempUser, signIn, signOut} = useAuth();
    const [user] = useOutletContext();
    const [currentUser, setcurrentUser] = useState(null);
    const[newUser, setNewUser] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true);



    useEffect(() => {
        if (loadingUser) {
            fetchCurrentUser().then(setLoadingUser(false))
        }
        else {
            return () => {
                setLoadingUser(false)
            }
        }
    }, [loadingUser, fetchCurrentUser]);

    async function fetchCurrentUser() {
        try {
            if (user.username){

                const userData = await API.graphql(graphqlOperation(getUser, {id: user.username}));

                if (userData.data.getUser) {
                    setcurrentUser(userData.data.getUser);

                    if (!userData.data.getUser.company) {
                        setNewUser(true);
                    }
                }
            }
            else {
                console.log("no user yet")
            }

        } catch (err) {
            console.log("error fetching user");
        }
    }

    const editProfile = () => {
        const currentInfo = {"phone": currentUser.phoneNumber,"name": currentUser.name, "company": currentUser.company.name, "address": currentUser.company.address.address1, "address2": currentUser.company.address.address2, "city": currentUser.company.address.city, "state": currentUser.company.address.state, "zip": currentUser.company.address.zip};
        setFormState(currentInfo)
        setEditUser(true);
    }

    const [formState, setFormState] = useState(initialState);

    const [errors, setErrors] = useState([]);

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
    }
    

    
    async function updateThisUser() {
        if (!formState.company || !formState.address || !formState.city || !formState.state || !formState.zip) {
            setErrors(["Please finish filling out the form before submitting"])
            return;
        }
        else {
            setErrors([])
            try {
                let companyID = "";
                let userCompanyID = {}
                if (editUser) {
                    const newAddress =  {id: currentUser.company.companyAddressId, address1: formState.address, address2: formState.address2, city: formState.city, state: formState.state, zip: formState.zip};
                    const addressReturn = await API.graphql(graphqlOperation(updateAddress, { input: newAddress}));

                    //TODO: add update Company call, 
                    userCompanyID = {id: currentUser.id, name: formState.name}
                }
                else {
                    const newAddress =  {address1: formState.address, address2: formState.address, city: formState.city, state: formState.state, zip: formState.zip};
                    const addressReturn = await API.graphql(graphqlOperation(createAddress, { input: newAddress}));
                    const newCompany = {name: formState.company, companyAddressId: addressReturn.data.createAddress.id};
                    const companyReturn = await API.graphql(graphqlOperation(createCompany, { input: newCompany}));
                    companyID = companyReturn.data.createCompany.id
                    userCompanyID = {id: currentUser.id, companyUsersId: companyID}
                }
                if (companyID) {
                    const companyUpdateReturn = await API.graphql(graphqlOperation(updateUser, { input: userCompanyID}));
                    setNewUser(false);
                    setEditUser(false);
                    setcurrentUser(companyUpdateReturn.data.updateUser);
                }
    
            } catch (err) {
                console.log("error updating user:", err);
            }
        }
    }

    return (
        <>
        {loadingUser ? (<h1>loading</h1>) : (
        <Container className="main-container">
            {newUser || editUser ? (
            <>
                <Row className="page-header justify-content-center mb-3">
                        <h1>Welcome to Zip Zap!</h1>
                        <p>Let's finish setting up your account!</p>
                        <hr/>
                </Row>
                <Row className="company-form" style={{backgroundColor: "#abc4d6", padding: "2%", borderRadius: "10px"}}>
                    <Col>
                    <div style={{backgroundColor: "#fff", padding: "2%", borderRadius: "10px"}}>
                    {editUser ? (
                            <>
                            <Row className="m-2">
                                <Col>
                                <p>Name:</p>
                                <input
                                    onChange={(event) => setInput("name", event.target.value)}
                                    value={formState.name}
                                    placeholder="Name"
                                />
                                </Col>
                            </Row>
                            <Row className="m-2">
                                <Col>
                                <p>Phone Number:</p>
                                <input
                                    onChange={(event) => setInput("phone", event.target.value)}
                                    value={formState.phone}
                                    placeholder="Phone Number"
                                />
                                </Col>
                            </Row>
                            </>
                            ) : null}
                        <Row className="m-2">
                            <Col>
                            <p>Company Name:</p>
                            <input
                                onChange={(event) => setInput("company", event.target.value)}
                                value={formState.company}
                                placeholder="Company"
                            />
                            </Col>
                        </Row>
                        {/* TODO: add company size */}
                        {/* <Row className="m-2 mt-3" >
                            <Col>
                            <p>Company Size:</p>
                            <input
                                onChange={(event) => setInput("size", event.target.value)}
                                value={formState.size}
                                placeholder="Size"
                                type="number"
                            />
                            </Col>
                        </Row> */}
                        <Row className="m-2 mt-3">
                            <p>Company Address:</p>
                            <Col md="12">                        
                                <input
                                    onChange={(event) => setInput("address", event.target.value)}
                                    value={formState.address}
                                    placeholder="Address"
                                />
                            </Col>
                            <Col md="12" className="mt-2">                        
                                <input
                                    onChange={(event) => setInput("address2", event.target.value)}
                                    value={formState.address2}
                                    placeholder="Apartment, suite, etc. (optional)"
                                />
                            </Col>
                            <Col md="5" className="mt-2">
                                <input
                                    onChange={(event) => setInput("city", event.target.value)}
                                    value={formState.city}
                                    placeholder="City"
                                />
                            </Col>
                            <Col md="3" className="mt-2">
                                <input
                                    onChange={(event) => setInput("state", event.target.value)}
                                    value={formState.state}
                                    placeholder="State"
                                />
                            </Col>
                            <Col className="mt-2">
                                <input
                                    onChange={(event) => setInput("zip", event.target.value)}
                                    value={formState.zip}
                                    placeholder="Zip"
                                />
                            </Col>
                        </Row>
                        <Row className="m-2 mt-4">
                            <div>
                                <div className="alignLeft align-items-center error-message">
                                {errors.length > 0 ?
                                (
                                    errors.map((x) => (<p>{x}</p>) )
                                ) : null}
                                </div>

                                {editUser ? (
                                <>
                                <Button variant="dark" type="submit" onClick={updateThisUser}>
                                    Submit
                                </Button>
                                </>
                                ): (
                                <>
                                <Button variant="dark" type="submit" onClick={updateThisUser}>
                                    Finish setting up
                                </Button>
                                </>
                                )}
                            </div>
                        </Row>

                    </div>
                    </Col>
                </Row>
            </>
                
            ) : (
                <>
                <Row className="page-header justify-content-center">
                    <Col xs="8"md="10">
                        <h1>Profile</h1>
                    </Col>
                    <Col xs="4" md="2">
                        <div className="d-grid gap-2">
                        <Button variant="dark" onClick={signOut}>Log Out</Button>
                        </div>
                    </Col>
                </Row>
                <hr/>
                {currentUser && currentUser.company ? (
                <>
                <Row className="profile-header">
                    {/* TODO: add functionality to add a photo */}
                    {/* <Col sm="1">
                        <Image roundedCircle src="https://s3.amazonaws.com/content.zipzapgifts.com/PersonalLogo+(5).png" style={{height: "80px", width: "auto"}}/>
                    </Col> */}
                    <Col>
                        <h2> {currentUser.name}</h2>
                        <p> Company: {currentUser.company.name}</p>
                    </Col>
                </Row>

                <Row className="profile-contact-container">
                    <h3>Contact Info</h3>
                </Row>
                <Row>
                    <Col className="side-bar-contact-container" xs="11" sm="6">
                        <Row className="contact-container-row">
                            <Col xs="12" sm="4"><span className="contact-container-icon"> <IconHome /> </span> Address:</Col>
                            <Col  xs="12" sm="8" className="contact-information">
                                {currentUser.company.address.address1} &nbsp;
                                {currentUser.company.address.address2} &nbsp;
                                {currentUser.company.address.city}, &nbsp; {currentUser.company.address.state} {currentUser.company.address.zip}
                            </Col>
                        </Row>
                        
                        <Row className="contact-container-row" >
                            <Col xs="12" sm="4" ><span className="contact-container-icon"><IconPhone /></span> Phone: </Col>
                            <Col xs="12" sm="8" className="contact-information">{user.attributes.phone_number}</Col>
                        </Row>
                        <Row className="contact-container-row">
                            <Col xs="12" sm="4" ><span className="contact-container-icon"><IconEmail /> </span> Email:</Col>
                            <Col  xs="12" sm="8" className="contact-information"> {user.attributes.email} </Col>
                        </Row>
                    </Col>
                    <Col sm="6" xs="1"></Col>
                </Row>
                                {/* TODO: add stripe cards */}
                {/* <Row className="profile-contact-container">
                    <h3>Credit Cards On File</h3>
                </Row> */}
                </>
                ) : null}
                </>
            )}
        </Container>
        )}
    </>
    );
}
export default ProfilePage;