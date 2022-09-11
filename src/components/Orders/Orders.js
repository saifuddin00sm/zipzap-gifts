import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DataTable from "./DataTable";
import DataChart from "./DataChart";
import Header from "../Header";

const Orders = () => {
  return (
    <Container component="main">
      <Header>
        <Typography variant="h1">Coming Soon...!!</Typography>
        <Typography variant="h1">Orders</Typography>
      </Header>
      <Box sx={{ marginBottom: "56px" }}>
        <DataChart />
      </Box>
      <Box>
        <DataTable />
      </Box>
    </Container>
  );
};

export default Orders;
