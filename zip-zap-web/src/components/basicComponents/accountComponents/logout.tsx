import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../App";
import { Redirect, RouteComponentProps } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";

const Logout: React.FC<RouteComponentProps> = ({ location, match }) => {
  const { setUser: setAppUser } = useContext(UserContext);
  const loading = true;
  const [redirect, setRedirect] = useState("");

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
