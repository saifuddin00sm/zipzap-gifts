/* src/App.js */
import React from "react";
import Amplify from "aws-amplify";
import { Outlet } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import awsExports from "./aws-exports";
import 'bootstrap/dist/css/bootstrap.min.css';
Amplify.configure(awsExports);

const App = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          {/* <h1>Hello{user.username} {user.attributes.email}</h1> */}
          <NavigationMenu signOut={signOut} user={user} />
          <div style={styles.container}>
            <Outlet context={[user]}/>
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
