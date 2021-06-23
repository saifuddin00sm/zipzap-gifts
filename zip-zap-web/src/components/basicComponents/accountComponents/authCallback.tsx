import React, { useEffect, useState, useContext } from "react";
import { UserContext, log, fetchRequest } from "../../../App";
import { Redirect, Link, RouteComponentProps } from "react-router-dom";
import jwt_decode from "jwt-decode";
import LoadingIcon from "../LoadingIcon";

const getRefreshToken = async (refreshToken: string) => {
  let refreshTokenResponse = await fetch(
    `https://auth.zipzapgifts.com/oauth2/token?grant_type=refresh_token&client_id=1tg75l00qrm38t6riknsmsar2o&refresh_token=${refreshToken}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          `1tg75l00qrm38t6riknsmsar2o:l29leg906dd37sbls1jq0i60no6rk5k8qs8spakn96p90jo6gli`
        )}`,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return { error: err };
    });

  console.log("refresh token", refreshTokenResponse);
  return refreshTokenResponse;
};

const getNewToken = async (authCode: string, callback = "") => {
  let newTokenResponse = await fetch(
    `https://auth.zipzapgifts.com/oauth2/token?grant_type=authorization_code&client_id=1tg75l00qrm38t6riknsmsar2o&code=${authCode}&redirect_uri=${window.location.origin}/callback${callback}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          `1tg75l00qrm38t6riknsmsar2o:l29leg906dd37sbls1jq0i60no6rk5k8qs8spakn96p90jo6gli`
        )}`,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return { error: err };
    });

  console.log("new token", newTokenResponse);
  return newTokenResponse;
};

const newUserInfo = (response: {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
}) => {
  let decoded = jwt_decode(response.id_token);
  let userObject: any = {};
  if (
    "email" in decoded &&
    "family_name" in decoded &&
    "given_name" in decoded
  ) {
    userObject.firstName = decoded.given_name;
    userObject.lastName = decoded.family_name;
    userObject.email = decoded.email;
    if ("picture" in decoded) {
      userObject.picture = decoded.picture;
    } else {
      userObject.picture = "";
    }

    userObject.id = response.id_token;
    userObject.acc = response.access_token;
    userObject.refresh = response.refresh_token;
    userObject.expiresIn = new Date(decoded.exp * 1000).toUTCString();
  }

  return userObject;
};

const AuthCallback: React.FC<RouteComponentProps> = ({ location, match }) => {
  const { user: appUser, setUser: setAppUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState("");

  function useQuery() {
    return new URLSearchParams(location.search);
  }

  let query = useQuery();
  let code = query.get("code");
  let type = query.get("type");
  let state = query.get("state");

  const getTokens = async (code: string) => {
    console.log("CODE", code, window.location.origin, type);

    let response = await getNewToken(code, type ? `/${type}` : "");
    // console.log("JSON RES", code, response);

    if ("error" in response) {
      //TO-DO - Notify and re-try
      log("Token Error: ", response);
      // addNotifications({
      //   message: "Error Logging In... Please Contact Support",
      //   type: "Error",
      // });
      setRedirect("/");

      return false;
    }

    if ("id_token" in response) {
      let user = newUserInfo(response);
      setAppUser(user);
    }
  };

  const checkLogin = async () => {
    console.log("LOG", type, type && type === "register");
    // handle new user use case
    if (type && type === "register") {
      // console.log("here");
      // setAppUser();
      localStorage.removeItem("user");
      setRedirect("/register");
      return true;
    }

    let loginResponse = await fetchRequest(appUser, `user/login`, "GET");
    console.log("LOGIN", appUser, loginResponse);

    if ("error" in loginResponse && loginResponse.error === "No User Found") {
      // TO-DO - Redirect to Register Page and force Register before creating
      // setAppUser();
      localStorage.removeItem("user");
      setRedirect("/register");
      return true;

      let registerUser = await fetchRequest(appUser, "registerUser", "POST", {
        firstName: appUser.firstName,
        lastName: appUser.lastName,
        rawEmail: appUser.email,
      });

      if ("user" in registerUser && registerUser.user.userID) {
        localStorage.setItem("user", JSON.stringify(appUser));
        setRedirect("/");

        return true;
      }

      // console.log("Register Error", registerUser);
      setRedirect("/");
      setAppUser();
      return true;
    }

    if (
      ("error" in loginResponse && loginResponse.error) ||
      "message" in loginResponse
    ) {
      // addNotifications({
      //   message: "Error Logging In... Please Contact Support",
      //   type: "Error",
      // });
      setRedirect("/");
      setAppUser();
      return true;
    }

    if (
      "validUser" in loginResponse &&
      // "validToken" in loginResponse &&
      loginResponse.validUser
      // &&
      // loginResponse.validToken
    ) {
      localStorage.setItem("user", JSON.stringify(appUser));
      setRedirect("/");

      return true;
    }

    setRedirect("/");
  };

  useEffect(() => {
    if (code !== "" && code !== undefined && code !== null) {
      getTokens(code);
    }
  }, []);

  useEffect(() => {
    console.log("ALL USR", appUser);
    if (appUser && "email" in appUser && "id" in appUser) {
      checkLogin();
    }
  }, [appUser]);

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

export { getRefreshToken, getNewToken, newUserInfo };

export default AuthCallback;
