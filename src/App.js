/* src/App.js */
import React from "react";
import Amplify from "aws-amplify";
import { Outlet } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import { QueryClient, QueryClientProvider } from "react-query";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
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
