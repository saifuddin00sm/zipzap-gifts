/* src/App.js */
import React from "react";
import Amplify from "aws-amplify";
import { Outlet } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <NavigationMenu signOut={signOut} user={user} />
          <div style={styles.container}>
            <Outlet />
          </div>
        </>
      )}
    </Authenticator>
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
