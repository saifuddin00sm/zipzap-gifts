import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DataChart from "./DataChart";
import Header from "../Header";

const Orders = () => {
  return (
    <Container component="main">
      <Header>
        <Box>
          <Typography variant="h1">Orders</Typography>{" "}
          <Typography variant="h3">Coming Soon...!!</Typography>{" "}
        </Box>
      </Header>

      <Typography
        variant="h1"
        style={{
          color: "lightgrey",
          transform: "rotate(300deg)",
        }}
      >
        Coming Soon...!!
      </Typography>
      <DataChart />

      {/* <Box>
        <DataTable />
      </Box> */}
    </Container>
  );
};

export default Orders;
