import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import Link from "@mui/material/Link";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Root = styled("div")(({ theme }) => ({
  "& .cards": {
    background: "#F4F4F4",
    padding: "30px",
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

const Accordions = ({ recentGifts }) => {
  return (
    <Root>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {recentGifts.map(({ gifts, id, status, icon, type }) => (
          <Grid key={id} item lg={6} xl={6} md={6} xs={12} sm={12}>
            <Box className="cards">
              <Box
                sx={{ display: "flex", alignItems: "center", gap: "0 10px" }}
              >
                {icon}
                <Typography variant="h5">{status}</Typography>
              </Box>
              <Box sx={{ mt: 4 }}>
                {gifts.length === 0 ? (
                  <Box
                    sx={{
                      padding: "20px",
                      background: "#ffff",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography>
                      No Gift this month!{" "}
                      <Link
                        sx={{ color: "#000", fontWeight: 700 }}
                        href="https://dummyLink.com"
                      >
                        Create one now
                      </Link>
                    </Typography>
                  </Box>
                ) : (
                  gifts.map(
                    ({
                      id,
                      subItems: {
                        dateShipped,
                        timeLine,
                        recipient,
                        image: { src, alt } = {},
                      } = {},
                      name,
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
                            {name}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "0 20px",
                              textTransform: "capitalize",
                            }}
                          >
                            <Box>
                              <img
                                height="100px"
                                width="100"
                                src={src}
                                alt={alt}
                              />
                            </Box>
                            <Box>
                              <Typography>Recipient: {recipient}</Typography>
                              <Typography>
                                {type === "recurring"
                                  ? "Timeline"
                                  : "Date shipped"}
                                : {type === "oneTime" ? dateShipped : timeLine}
                              </Typography>
                            </Box>
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
