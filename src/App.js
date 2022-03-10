/* src/App.js */
import React from "react";
import {Amplify} from "aws-amplify";
import { Outlet } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import "./App.css";
import useAuth from "./hooks/useAuth";

import { Authenticator, AmplifyProvider, Grid, View, Image} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import awsExports from "./aws-exports";
import 'bootstrap/dist/css/bootstrap.min.css';
Amplify.configure(awsExports);

const App = () => {

  const theme = {
    name: 'my-theme',
    tokens: {
      colors: {
        background: {
          primary: { value: 'white' }
        },
      }
    },
  };


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
            <Outlet context={[user]} />
          </div>
        </>
      ) }
    </Authenticator>) 
    : 
    (
      <Grid
      templateColumns="1fr 1fr"
      templateRows="10rem 10rem"
      gap="var(--amplify-space-small)">
        <View className="sidebar-image">
          <Image
          alt="Zip Zap logo"
          src="https://s3.amazonaws.com/content.zipzapgifts.com/login-photo.jpg"
          className="sign-in-image"
          />
        </View>
        <View className="authentication-side">
        <h1 className="authentication-title">An Automated Gift Giving Platform Built for Businesses</h1>
        <Authenticator >
        {({ signOut, user }) => (
          <>
            <NavigationMenu signOut={signOut} user={user} />
            <div style={styles.container}>
              <Outlet context={[user]}/>
            </div>
          </>
        ) }
        </Authenticator>

        </View>
        </Grid>
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
