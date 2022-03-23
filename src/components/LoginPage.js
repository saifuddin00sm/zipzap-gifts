import React from "react";
import { Grid, View, Image } from "@aws-amplify/ui-react";
import useAuth from "../hooks/useAuth";

/**
 * A helper component that shows the Zip Zap Login design if the
 * user is currently not logged in.
 */
const LoginPage = ({ children }) => {
  const { currentUser } = useAuth();

  // If the user is already logged in, do not render the login page
  if (currentUser) {
    return children;
  }

  return (
    <Grid
      templateColumns="1fr 1fr"
      templateRows="10rem 10rem"
      gap="var(--amplify-space-small)"
    >
      <View className="sidebar-image">
        <Image
          alt="Zip Zap logo"
          src="https://s3.amazonaws.com/content.zipzapgifts.com/zip-zap-login+(1).png"
          className="sign-in-image"
        />
      </View>
      <View className="authentication-side">
        <h1 className="authentication-title">
          An Automated Gift Giving Platform Built for Businesses
        </h1>
        {children}
      </View>
    </Grid>
  );
};

export default LoginPage;
