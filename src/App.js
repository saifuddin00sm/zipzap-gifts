/* src/App.js */
import React from "react";
import { Amplify } from "aws-amplify";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import NavigationMenu from "./components/NavigationMenu";
import LoginPage from "./components/LoginPage";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { zipZapTheme } from "./theme";

import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const theme = createTheme(zipZapTheme);
const queryClient = new QueryClient();

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LoginPage>
            <Authenticator>
              {({ signOut, user }) => (
                <>
                  <NavigationMenu signOut={signOut} />
                  <div style={styles.container}>
                    <Outlet context={[user]} />
                  </div>
                </>
              )}
            </Authenticator>
          </LoginPage>
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
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
