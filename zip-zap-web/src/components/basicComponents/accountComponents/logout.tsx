import React, { useEffect, useState, useContext } from "react";
import { UserContext, log, fetchRequest } from "../../../App";
import { Redirect, Link, RouteComponentProps } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";

const Logout: React.FC<RouteComponentProps> = ({ location, match }) => {
  const { user: appUser, setUser: setAppUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState("");

  function useQuery() {
    return new URLSearchParams(location.search);
  }

  // let query = useQuery();
  const logout = () => {
    localStorage.removeItem("user");
    setAppUser();
    setRedirect("/");
  };

  useEffect(() => {
    logout();
  }, []);

  return redirect ? (
    <Redirect to={redirect} />
  ) : // <div>{redirect}</div>
  loading ? (
    <LoadingIcon />
  ) : (
    <div className=" sign-in-background column center">
      Error, Please Contact Support
    </div>
  );
};

export default Logout;
