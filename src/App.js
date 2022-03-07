/* src/App.js */
import React, {useState} from "react";
import {Amplify, AmplifyTheme} from "aws-amplify";
import { Outlet } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import "./App.css";

import { Authenticator, useTheme, View, Image } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => {
  const components = {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" >
          <br/>
          <br/>
          <Image
            alt="Zip Zap logo"
            src="https://s3.amazonaws.com/content.zipzapgifts.com/login-photo.jpg"
          />
        </View>
      );
    }
  }
  //const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, { background: 'orange' });
  // const MyTheme = Object.assign({}, AmplifyTheme, { sectionHeader: MySectionHeader });

  return (
    <>
    
    <Authenticator components={components} >

      {({ signOut, user }) => (
        <>
          <NavigationMenu signOut={signOut} user={user} />
          <div style={styles.container}>
            <Outlet />
          </div>
        </>
      ) }
    </Authenticator>
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
