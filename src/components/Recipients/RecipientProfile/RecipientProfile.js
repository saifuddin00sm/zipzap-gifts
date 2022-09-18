import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../../Header";
import { useLocation, useNavigate } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { useQuery } from "react-query";
import { getRecipient } from "../../../graphql/queries";
import { styled } from "@mui/material/styles";
import { Image } from "@aws-amplify/ui-react";
// import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import GeneralInfo from "./GeneralInfo";
import GiftProfile from "./GiftProfile";
import GiftHistory from "./GiftHistory";
import DeleteModal from "../DeleteModal";

const giftProfileData = {
  suggestedGift: [
    {
      giftName: "Coming Soon!",
      image: {
        src: "https://s3.amazonaws.com/content.zipzapgifts.com/login-photo.jpg",
        alt: "Suggested Gifts Coming Soon!",
      },
      id: 1,
    },
  ],
};

const Root = styled("div")(({ theme }) => ({
  marginTop: "20px",
  "& .tabsPanel": {
    "& .infoBox": {
      border: "1px solid #F1F1F1",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      padding: "20px",
      marginTop: "20px",
      "& .titles": {
        color: "#343436",
        fontWeight: 700,
        fontSize: "30px",
        lineHight: "45px",
      },
    },
  },
  "& .profileBox": {
    background: "#ABC4D6",
    padding: "30px",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    "& .img_box": {
      position: "relative",
      "& .pen": {
        height: "50px",
        width: "50px",
        position: "absolute",
        top: "73px",
        left: "55px",
      },
    },
  },
}));

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabIndecators = {
  border: "1px solid #000",
  borderRadius: "5px",
  padding: "0px 20px",
};

const RecipientProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;
  const id = pathname.split("/")[2];
  const {
    isLoading,
    isError,
    data: { data: { getRecipient: recipient = {} } = {} } = {},
    error,
  } = useQuery(["recipients", id], () =>
    API.graphql(graphqlOperation(getRecipient, { id }))
  );

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let userData;

  if (isLoading) {
    userData = <Typography>Loading...</Typography>;
  } else if (isError) {
    userData = (
      <Typography>Error loading recipient: {error.message}</Typography>
    );
  } else {
    userData = (
      <Box>
        <Box key={recipient.id}>
          <Box
            className="profileBox"
            sx={{
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "0 25px",
                flexDirection: {
                  xs: "column",
                  lg: "row",
                },
              }}
            >
              <Box className="img_box" sx={{ margin: "auto" }}>
                <Image
                  borderRadius="50%"
                  objectFit="cover"
                  objectPosition="50% 50%"
                  maxWidth="100px"
                  src="/BluePersonalLogo.png"
                  width="100px"
                  height="100px"
                />
                {/* <Box className="pen">
                  <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" />
                    <IconButton
                      sx={{ color: "#263238" }}
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Box> */}
              </Box>
              <Box>
                <Typography
                  sx={{
                    marginBottom: "16px",
                    textAlign: {
                      xs: "center",
                      md: "left",
                    },
                  }}
                  variant="h3"
                  className="titles"
                >
                  {recipient?.firstName} {recipient?.lastName}
                </Typography>
                <Box className="tabs">
                  <Box>
                    <Tabs
                      sx={{
                        "& .Mui-selected": {
                          background: "#fff",
                          border: "1px solid #ffff",
                        },
                        "& .MuiTabs-flexContainer": {
                          gap: "10px 15px",
                          marginBottom: "15px",
                          flexDirection: {
                            xs: "column",
                            md: "row",
                          },
                        },
                      }}
                      value={value}
                      onChange={handleChange}
                    >
                      <Tab
                        sx={tabIndecators}
                        label="General Information"
                        {...a11yProps(0)}
                      />
                      <Tab
                        sx={tabIndecators}
                        label="Gift Profile"
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpen(true)}
              >
                Delete
              </Button>
              <DeleteModal
                open={open}
                setOpen={setOpen}
                recipientId={recipient.id}
              />
            </Box>
          </Box>

          {/* tab panels */}
          <Box className="tabsPanel">
            <TabPanel value={value} index={0}>
              <Box className="infoBox">
                <Typography variant="h5" className="titles">
                  General Information
                </Typography>
                <GeneralInfo info={recipient} />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box className="infoBox">
                <Typography className="titles" variant="h5">
                  Gift Profile
                </Typography>
                <GiftProfile
                  info={{
                    favorites: recipient?.favorites?.items,
                    ...giftProfileData,
                  }}
                />
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Container component="main">
      <Header>
        <Typography variant="h1">Recipient Dashboard</Typography>
      </Header>
      <Button onClick={() => navigate("/recipients")}>Back</Button>
      <Root>{userData}</Root>
    </Container>
  );
};

export default RecipientProfile;
