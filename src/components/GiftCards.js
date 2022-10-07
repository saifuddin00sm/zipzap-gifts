import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import GiftModal from "./GiftModal";
import S3Image from "./S3Image";

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

const GiftCards = ({ data, loading, error, selectedGift, setSelectedGift }) => {
  const [openModal, setOpenModal] = useState({ open: false, modalData: {} });
  const [stateData, setStateData] = useState([]);

  const categories = [
    {
      name: "Zip it!",
      category: "zipIt",
      subText:
        "Virtual Gifts: choose your amount and send via email | COMING SOON",
    },
    { name: "Upcoming Holiday Gifts", category: "upcomingHoliday" },
    { name: "Recommended gifts", category: "recommendedGifts" },
    { name: "Birthday Gifts", category: "birthday" },
    { name: "Anniversary / Promotion Gifts", category: "anniversaryPromotion" },
    { name: "Sympathy/ Get Well", category: "sympathyGetWell" },
    { name: "Just because", category: "justBecause" },
    { name: "Life Event", category: "lifeEvent" },
  ];

  const showModal = (gift) => {
    setOpenModal({ open: true, modalData: gift });
  };

  const updatePrice = (id, count) => {
    setStateData((prevState) =>
      prevState.map((i) => {
        if (i.id === id) {
          return { ...i, price: +i.price + count };
        }
        return i;
      })
    );
  };

  useEffect(() => {
    if (data) {
      setStateData(data);
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
                <i>{subText}</i>
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
                    <Grid
                      sx={{
                        ...(selectedGift &&
                          selectedGift !== item.id && {
                            filter: "grayscale(90%)",
                          }),
                      }}
                      key={item.id}
                      item
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <StyledCard
                        sx={{
                          ...(selectedGift &&
                            selectedGift === item.id && {
                              border: 5,
                            }),
                        }}
                      >
                        <Box className="inner_card">
                          <S3Image
                            component="img"
                            style={{
                              width: "100%",
                              height: "174px",
                              objectFit: "cover",
                            }}
                            s3key={item?.pictures?.items[0]?.src}
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
                                    "&:disabled": { border: "none" },
                                  }}
                                  disabled={item.price <= 0}
                                  onClick={() => updatePrice(item.id, -1)}
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
                                    "&:disabled": { border: "none" },
                                  }}
                                  disabled={item.price >= 1000}
                                  onClick={() => updatePrice(item.id, 1)}
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
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default GiftCards;
