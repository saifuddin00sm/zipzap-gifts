import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { useEffect, useState } from "react";

const getCurrentUser = async () => {
  try {
    return await Auth.currentAuthenticatedUser();
  } catch {
    // currentAuthenticatedUser throws an Error if not signed in
    return null;
  }
};

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const updateUser = async () => {
      setCurrentUser(await getCurrentUser());
    };
    Hub.listen("auth", updateUser); // listen for login/signup events
    updateUser(); // check manually the first time because we won't get a Hub event
    return () => Hub.remove("auth", updateUser);
  }, []);

  const signIn = () => Auth.federatedSignIn();

  const signOut = () => {
    Auth.signOut();
    window.location.href = "/";
  };
  return { currentUser, signIn, signOut };
};
export default useAuth;
export { getCurrentUser };
