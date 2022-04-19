import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import GiftModal from "./GiftModal";

const StyledCard = styled(Toolbar)(({ theme }) => ({
  background: "#ffff",
  borderRadius: "10px",
  boxShadow: "2px 4px 8px 2px rgba(0, 0, 0, 0.25)",
  width: "254px",
  height: "100%",
  "& .inner_card": {
    textAlign: "center",
    fontfamily: "Poppins",
    fontStyle: "normal",
    color: "#505050",
    padding: "15px 0",
    "& .select_btn": {
      width: "146px",
      height: "29px",
      background: "#ABC4D6",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "5px",
      border: "none",
      outline: "none",
      cursor: "pointer",
      fontWeight: 500,
      fontSize: "15px",
      lineHeight: "22px",
      textAlign: "center",
      textTransform: "capitalize",
    },
  },
}));

const GiftCards = ({ data, loading, error, setSelectedGift }) => {
  const [openModal, setOpenModal] = useState({ open: false, modalData: {} });
  const categories = [
    { name: "Recommended gifts", category: "recommendedGifts" },
    { name: "Birthday Gifts", category: "birthday" },
    { name: "Upcoming Holiday Gifts", category: "upcomingHoliday" },
    { name: "Anniversary / Promotion Gifts", category: "anniversaryPromotion" },
    { name: "Sympathy/ Get Well", category: "sympathyGetWell" },
    { name: "Just because", category: "justBecause" },
    { name: "Life Event", category: "lifeEvent" },
  ];

  const showModal = (gift) => {
    setOpenModal({ open: true, modalData: gift });
    setSelectedGift(gift.id);
  };

  return (
    <>
      {categories.map(({ name, category }) => {
        const categoryGifts = data?.filter(
          ({ category: itemCategory }) => category === itemCategory
        );
        if (Array.isArray(categoryGifts)) {
          if (categoryGifts.length < 1) return null;
        }
        return (
          <Box key={category}>
            <Typography
              sx={{
                fontfamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "40px",
                lineHeight: "60px",
                color: "#505050",
                margin: "20px",
              }}
              variant="h4"
            >
              {name}
            </Typography>
            <Box
              sx={{
                bgcolor: "gitCardsbackground.paper",
                p: 9,
                borderRadius: "10px",
              }}
            >
              <Grid container spacing={5}>
                {categoryGifts &&
                  categoryGifts?.map((item) => (
                    <Grid key={item.id} item columns={{ xs: 4, sm: 8, md: 12 }}>
                      <StyledCard>
                        <Box className="inner_card">
                          <img
                            style={{
                              width: "100%",
                              height: "174px",
                              objectFit: "cover",
                            }}
                            src={item?.pictures?.items[0]?.src}
                            alt={item?.pictures?.items[0]?.alt}
                          />
                          <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                            {item.name}
                          </Typography>
                          <Typography sx={{ fontSize: "0.8rem" }}>
                            {item.description}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "20px",
                              lineHeight: "30px",
                              color: "#98B1C2",
                              margin: "3px 0px",
                            }}
                          >
                            ${item.price}
                          </Typography>
                          <Button
                            onClick={() => showModal(item)}
                            variant="contained"
                            className="select_btn"
                          >
                            Select
                          </Button>
                        </Box>
                      </StyledCard>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Box>
        );
      })}
      {openModal.open && (
        <GiftModal
          selectable={true}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default GiftCards;
