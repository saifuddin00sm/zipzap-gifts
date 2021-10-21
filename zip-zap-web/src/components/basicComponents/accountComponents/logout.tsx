import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../App";
import { Redirect, RouteComponentProps } from "react-router-dom";

const Logout: React.FC<RouteComponentProps> = ({ location, match }) => {
  const { setUser: setAppUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("user");
      setAppUser({});
      setRedirect("/");
    };

    logout();
  }, [setAppUser]);

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <div className=" sign-in-background column center">
      Error, Please Contact Support
    </div>
  );
};

export default Logout;
