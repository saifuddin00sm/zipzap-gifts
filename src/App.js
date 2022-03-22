/* src/App.js */
import React from "react";
import { Amplify } from "aws-amplify";
import { Outlet } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import NavigationMenu from "./components/NavigationMenu";
import LoginPage from "./components/LoginPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => {
  return (
    <LoginPage>
      <Authenticator>
        {({ signOut, user }) => (
          <>
            <NavigationMenu signOut={signOut} user={user} />
            <div style={styles.container}>
              <Outlet context={[user]} />
            </div>
          </>
        )}
      </Authenticator>
    </LoginPage>
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