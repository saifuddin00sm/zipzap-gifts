import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import GiftCards from "../GiftCards";
import Fuse from "fuse.js";
import { useGifts } from "../../hooks/catalog";

const SelectGifts = ({ giftSearch, selectedGift, setSelectedGift }) => {
  const { isLoading, isError, gifts } = useGifts();
  const [data, setData] = useState([]);

  useEffect(() => {
    const searchOptions = {
      tokenize: false,
      threshold: 0.3,
      keys: ["name", "category"],
    };
    if (gifts) {
      if (giftSearch) {
        const fuse = new Fuse(
          gifts.map((r) => {
            return { ...r, fullName: `${r.firstName} ${r.lastName}` };
          }),
          searchOptions
        );
        setData(fuse.search(giftSearch).map((i) => i.item));
      } else {
        setData(gifts);
      }
    }
  }, [giftSearch, gifts]);

  return (
    <Box>
      <GiftCards
        data={data}
        loading={isLoading}
        error={isError}
        selectedGift={selectedGift}
        setSelectedGift={setSelectedGift}
      />
    </Box>
  );
};

export default SelectGifts;
