import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
  flexWrap: "wrap",
  padding: theme.spacing(4),
}));

const Header = ({ children, ...props }) => {
  return (
    <>
      <StyledToolbar {...props}>{children}</StyledToolbar>
      <Divider sx={{ mb: 4 }} />
    </>
  );
};

export default Header;
