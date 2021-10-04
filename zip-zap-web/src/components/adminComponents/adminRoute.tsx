import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
	isAdmin: boolean;
	children: React.ReactNode;
}

const AdminRoute: React.FC<Props> = ({ isAdmin, children, ...props }) => {
	return (
		<Route {...props}>{!isAdmin ? <Redirect to="/" /> : children}</Route>
	);
};

export default AdminRoute;
