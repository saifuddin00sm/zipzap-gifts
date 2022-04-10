import React from "react";
import Container from "@mui/material/Container";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import GiftCards from "../GiftCards";
import { useGifts } from "../../hooks/catalog";

const GiftCatalog = () => {
  const { isLoading, isError, gifts } = useGifts();

  return (
    <Container component="main">
      <Header>
        <Typography variant="h1">Gift catalog</Typography>
      </Header>
      <GiftCards data={gifts} loading={isLoading} error={isError} />
    </Container>
  );
};

export default GiftCatalog;
