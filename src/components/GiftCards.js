import React, { useState, useEffect } from "react";
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
  maxWidth: "254px",
  width: "100%",
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

// zip it dummy data
const zipIt = [
  {
    active: null,
    category: "zipIt",
    description: "send a virtual gift card to thread wallets",
    id: "sgab45f9-1x26-777-8edla-b73c6dcf5a26",
    items: { items: [] },
    name: "Small Baby Basket",
    pictures: { items: [] },
    price: "25",
  },
  {
    active: null,
    category: "zipIt",
    description: "send a virtual gift card to thread wallets",
    id: "deak45f9-1x26-8888-8edca-b73c6dcf5a26",
    items: { items: [] },
    name: "Small anniversary gift",
    pictures: { items: [] },
    price: "150",
  },
  {
    active: null,
    category: "zipIt",
    description: "send a virtual gift card to thread wallets",
    id: "deab45y9-1x26-9999-8edla-b73c6dcf5a26",
    items: { items: [] },
    name: "Valentine's day gift",
    pictures: { items: [] },
    price: "50",
  },
];

const GiftCards = ({ data, loading, error, setSelectedGift }) => {
  const [openModal, setOpenModal] = useState({ open: false, modalData: {} });
  const [stateData, setStateData] = useState([]);

  const categories = [
    { name: "Recommended gifts", category: "recommendedGifts" },
    {
      name: "Zip it!",
      category: "zipIt",
      subText: "Virtual Gifts: choose your amount and send via email",
    },
    { name: "Birthday Gifts", category: "birthday" },
    { name: "Upcoming Holiday Gifts", category: "upcomingHoliday" },
    { name: "Anniversary / Promotion Gifts", category: "anniversaryPromotion" },
    { name: "Sympathy/ Get Well", category: "sympathyGetWell" },
    { name: "Just because", category: "justBecause" },
    { name: "Life Event", category: "lifeEvent" },
  ];

  const showModal = (gift) => {
    setOpenModal({ open: true, modalData: gift });
  };

  // increasing zipit price
  const incPrice = (el) => {
    let checkPrice = false;
    stateData.forEach((i) => {
      if (i.id === el.id) {
        if (+i?.price === 200) {
          checkPrice = true;
        }
      }
    });
    if (checkPrice === true) return;
    const newArr = stateData.map((i) =>
      i?.id === el?.id ? { ...i, price: +i?.price + 1 } : i
    );
    setStateData(newArr);
  };

  // decreasing zipit price
  const decPrice = (el) => {
    let checkPrice = false;
    stateData.forEach((i) => {
      if (i.id === el.id) {
        if (+i?.price === 10) {
          checkPrice = true;
        }
      }
    });
    if (checkPrice === true) return;
    const newArr = stateData.map((i) =>
      i?.id === el?.id ? { ...i, price: +i?.price - 1 } : i
    );
    setStateData(newArr);
  };

  useEffect(() => {
    if (data) {
      const appendedData = data.concat(zipIt);
      setStateData(appendedData);
    }
  }, [data]);

  return (
    <>
      {categories.map(({ name, category, subText }) => {
        const categoryGifts = stateData?.filter(
          ({ category: itemCategory }) => category === itemCategory
        );

        if (Array.isArray(categoryGifts)) {
          if (categoryGifts.length < 1) return null;
        }

        return (
          <Box key={category}>
            <Box
              sx={{
                margin: "20px",
                display: "flex",
                alignItems: "end",
                gap: "5px",
              }}
            >
              <Typography
                sx={{
                  fontfamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "40px",
                  lineHeight: "60px",
                  color: "#505050",
                }}
                variant="h4"
              >
                {name}
              </Typography>
              <Typography variant="body" sx={{ marginBottom: "9px" }}>
                <i>{subText && subText}</i>
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "gitCardsbackground.paper",
                p: { xs: 2, md: 6, lg: 8 },
                borderRadius: "10px",
              }}
            >
              <Grid
                sx={{
                  justifyContent: { xs: "center", md: "start", lg: "start" },
                }}
                container
                spacing={5}
              >
                {categoryGifts.length > 0 &&
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
                          <Box
                            sx={{
                              margin: "3px 0px",
                            }}
                          >
                            {item.category === "zipIt" ? (
                              <Box>
                                <Button
                                  sx={{
                                    padding: 0,
                                    fontSize: "1.5rem",
                                    border: "none",
                                    "&:hover": { border: "none" },
                                  }}
                                  onClick={() => decPrice(item)}
                                  size="small"
                                  variant="outlined"
                                >
                                  -
                                </Button>
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: "20px",
                                    lineHeight: "30px",
                                    color: "#98B1C2",
                                  }}
                                  variant="body"
                                >
                                  ${item.price}
                                </Typography>
                                <Button
                                  sx={{
                                    padding: 0,
                                    fontSize: "1.5rem",
                                    border: "none",
                                    "&:hover": { border: "none" },
                                  }}
                                  onClick={() => incPrice(item)}
                                  size="small"
                                  variant="outlined"
                                >
                                  +
                                </Button>
                              </Box>
                            ) : (
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "20px",
                                  lineHeight: "30px",
                                  color: "#98B1C2",
                                }}
                                variant="body"
                              >
                                ${item.price}
                              </Typography>
                            )}
                          </Box>
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
          setSelectedGift={setSelectedGift}
          selectable={true}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default GiftCards;
