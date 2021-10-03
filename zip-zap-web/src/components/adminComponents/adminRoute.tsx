import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
	admin: boolean;
}

const AdminRoute: React.FC<Props> = ({ admin, ...props }) => {
	return !admin ? <Redirect to="" /> : <Route {...props} />;
};

export default AdminRoute;
