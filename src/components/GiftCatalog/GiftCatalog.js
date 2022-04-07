import React from "react";
import Container from "@mui/material/Container";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import GiftCards from "../GiftCards";
import useGitfs from "../../hooks/catalog";

const GiftCatalog = () => {
  const gifts = useGitfs();
  return (
    <Container component="main">
      <Header>
        <Typography variant="h1">Gift catalog</Typography>
      </Header>
      <GiftCards data={gifts.data} />
    </Container>
  );
};

export default GiftCatalog;
