import React from "react";
import Box from "@mui/material/Box";
import GiftCards from "../GiftCards";
import { useGifts } from "../../hooks/catalog";

const ChooseGift = () => {
  const { isLoading, isError, gifts } = useGifts();

  return (
    <Box>
      <GiftCards data={gifts} loading={isLoading} error={isError} />
    </Box>
  );
};

export default ChooseGift;
