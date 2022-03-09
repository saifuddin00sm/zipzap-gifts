/* src/App.js */
import React, {useState} from "react";
import {Amplify, AmplifyTheme} from "aws-amplify";
import { Outlet } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import "./App.css";
import useAuth from "./hooks/useAuth";

import { Authenticator, useTheme, View, Image } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import awsExports from "./aws-exports";
import 'bootstrap/dist/css/bootstrap.min.css';
Amplify.configure(awsExports);

const App = () => {
  //const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, { background: 'orange' });
  // const MyTheme = Object.assign({}, AmplifyTheme, { sectionHeader: MySectionHeader });


  const {currentUser} = useAuth();
  return (
    <>

    
    {currentUser ? 
    ( 
    <Authenticator >

      {({ signOut, user }) => (
        <>
          <NavigationMenu signOut={signOut} user={user} />
          <div style={styles.container}>
            <Outlet />
          </div>
        </>
      ) }
    </Authenticator>) 
    : 
    ( 
      <>
      <Image
        alt="Zip Zap logo"
        src="https://s3.amazonaws.com/content.zipzapgifts.com/login-photo.jpg"
      />
      <Authenticator >

      {({ signOut, user }) => (
        <>
          {/* <h1>Hello{user.username} {user.attributes.email}</h1> */}
          <NavigationMenu signOut={signOut} user={user} />
          <div style={styles.container}>
            <Outlet context={[user]}/>
          </div>
        </>
      ) }
      </Authenticator>
      </>
    ) }
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flex: 1,
    overflow: "auto",
  },
};

export default App;
