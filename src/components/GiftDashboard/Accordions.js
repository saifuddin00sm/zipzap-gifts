import React from "react";
import { format, compareAsc, compareDesc, parseISO } from "date-fns";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import { Link } from "react-router-dom";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TodayIcon from "@mui/icons-material/Today";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import S3Image from "../S3Image";
import { useOrders } from "../../hooks/orders";

const Root = styled("div")(({ theme }) => ({
  "& .cards": {
    background: "#F4F4F4",
    height: "320px",
    borderRadius: "10px",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
    },

    "&::-webkit-scrollbar-track": {
      background: "#ffff",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "#98B1C2",
      borderRadius: "15px",
    },
  },
}));

const Accordions = () => {
  const { orders = [] } = useOrders();

  const today = new Date();
  const prevOneTime = [];
  const oneTime = [];
  const prevRecurring = [];
  const recurring = [];

  // Separate the orders into Recurring and OneTime gifts for display
  orders.forEach((o) => {
    let orderDate = parseISO(o.toDate);
    let date = format(orderDate, "M/d/yyyy");
    let prev = prevOneTime;
    let current = oneTime;

    if (o.orderType === "RECURRING") {
      orderDate = parseISO(o.fromDate);
      date = `${format(orderDate, "M/d/yyyy")}-` + date;
      prev = prevRecurring;
      current = recurring;
    }

    const gift = {
      ...o,
      orderDate,
      date,
    };
    if (parseISO(o.toDate) <= today) {
      prev.push({ ...gift, fulfilled: true });
    } else {
      current.push(gift);
    }
  });

  const dateSort = ({ orderDate: a }, { orderDate: b }) => compareAsc(a, b);
  const reverseSort = ({ orderDate: a }, { orderDate: b }) => compareDesc(a, b);

  const recentGifts = [
    {
      id: 1,
      status: "One Time Gifts",
      tooltip:
        "A One Time Gift is a gift that goes out once! EX: A Get Well Soon Box, A Sympathy Gift, a Welcome Little One Box.",
      icon: <TodayIcon />,
      gifts: [...oneTime.sort(dateSort), ...prevOneTime.sort(reverseSort)],
    },
    {
      id: 2,
      status: "Recurring Gifts",
      tooltip:
        "A Recurring Gift is a gift that happens multiple times during a set time frame for different people. EX: Anniversaries or Birthdays",
      icon: <EventRepeatIcon />,
      gifts: [...recurring.sort(dateSort), ...prevRecurring.sort(reverseSort)],
    },
  ];

  return (
    <Root>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {recentGifts.map(({ gifts, id, status, icon, tooltip }) => (
          <Grid key={id} item lg={6} xl={6} md={6} xs={12} sm={12}>
            <Box className="cards">
              <Box
                sx={{
                  background: "#F4F4F4",
                  display: "flex",
                  alignItems: "center",
                  padding: "30px 30px 8px 30px",
                  gap: "0 10px",
                  top: 0,
                  position: "sticky",
                  width: "100%",
                  zIndex: 2,
                }}
              >
                {icon}
                <Typography variant="h5">{status}</Typography>{" "}
                <Tooltip enterTouchDelay={0} title={tooltip}>
                  <InfoIcon sx={{ color: "text.secondary" }} />
                </Tooltip>
              </Box>
              <Box sx={{ mt: 3, px: 4 }}>
                {gifts.length === 0 ? (
                  <Box
                    sx={{
                      padding: "20px",
                      background: "#ffff",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography>
                      No Gifts Scheduled!{" "}
                      <Link sx={{ color: "#000", fontWeight: 700 }} to="/gifts">
                        Create one now
                      </Link>
                    </Typography>
                  </Box>
                ) : (
                  gifts.map(
                    ({
                      id,
                      name,
                      date,
                      recipientIDs,
                      giftImage,
                      fulfilled,
                    }) => (
                      <Accordion sx={{ mb: 1 }} key={id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${id}bh-content`}
                          id={`panel${id}bh-header`}
                        >
                          <Typography
                            sx={{
                              width: "100%",
                              flexShrink: 0,
                              textTransform: "capitalize",
                            }}
                          >
                            {name}{" "}
                            {fulfilled && (
                              <CheckCircleIcon
                                color="secondary"
                                fontSize="small"
                              />
                            )}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "0 20px",
                            }}
                          >
                            <Box>
                              <S3Image
                                component="img"
                                width="100px"
                                s3key={giftImage}
                                alt="gift"
                              />
                            </Box>
                            <Box>
                              <Typography>Date: {date}</Typography>
                              <Typography>
                                Shipping to {recipientIDs.length} Recipient
                                {recipientIDs.length > 1 && "s"}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/gifts/${id}`}
                            >
                              <Button
                                sx={{ marginLeft: "auto" }}
                                color="secondary"
                                size="small"
                                aria-label="edit"
                              >
                                Edit Gift
                              </Button>
                            </Link>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    )
                  )
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

export default Accordions;
