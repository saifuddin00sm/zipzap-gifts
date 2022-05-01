import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Header from "../Header.js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { useOutletContext, useNavigate } from "react-router-dom";
import { getUser } from "../../graphql/queries";
import { createUser } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { Link } from "react-router-dom";
import Accordions from "./Accordions.js";
import UtilizationAndDefault from "./UtilizationAndDefault";
import GiftCalendar from "./GiftCalendar";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import TodayIcon from "@mui/icons-material/Today";
import GiftDashboardModal from "./GiftDashboardModal";

const recentGifts = [
  {
    type: "oneTime",
    status: "One Time Gifts This Month",
    icon: <TodayIcon />,
    gifts: [
      {
        name: "Skill Achievement Reward",
        subItems: {
          dateShipped: "4/26/2020",
          recipient: "Victoria Black",
          image: {
            src: "https://i.etsystatic.com/18853869/r/il/e79240/2325509792/il_340x270.2325509792_995t.jpg",
            alt: "gift image",
          },
        },
        id: 1,
      },
      {
        name: "Valentine's Day",
        subItems: {
          dateShipped: "4/26/2022",
          recipient: "Malia Morley",
          image: {
            src: "https://i.etsystatic.com/18853869/r/il/e79240/2325509792/il_340x270.2325509792_995t.jpg",
            alt: "gift image",
          },
        },
        id: 2,
      },
    ],
    id: 1,
  },

  {
    type: "recurring",
    status: "Recurring Gifts this month",
    icon: <EventRepeatIcon />,
    id: 2,
    gifts: [
      {
        name: "Saif Uddin birthday",
        subItems: {
          timeLine: "3/2/22- 4/2/22",
          recipient: "Saif uddin",
          image: {
            src: "https://i.etsystatic.com/18853869/r/il/e79240/2325509792/il_340x270.2325509792_995t.jpg",
            alt: "gift image",
          },
        },
        id: 1,
      },
      {
        name: "Amelia Ostler birthday",
        subItems: {
          timeLine: "3/2/22 - 4/2/24",
          recipient: "Amelia Ostler",
          image: {
            src: "https://i.etsystatic.com/18853869/r/il/e79240/2325509792/il_340x270.2325509792_995t.jpg",
            alt: "gift image",
          },
        },
        id: 2,
      },
      {
        name: "Nathan Humphrey anniversary",
        id: 3,
        subItems: {
          timeLine: "3/2/22 - 4/2/20",
          recipient: "Nathan Humphrey",
          image: {
            src: "https://i.etsystatic.com/18853869/r/il/e79240/2325509792/il_340x270.2325509792_995t.jpg",
            alt: "gift image",
          },
        },
      },
      {
        name: "Krista Humphrey birthday",
        subItems: {
          timeLine: "3/2/20 - 4/2/22",
          recipient: "Krista Humphrey",
          image: {
            src: "https://i.etsystatic.com/18853869/r/il/e79240/2325509792/il_340x270.2325509792_995t.jpg",
            alt: "gift image",
          },
        },
        id: 4,
      },
    ],
  },
];

// utilization and default gift dummy data
const utilization = 60;

const defaultGifts = [
  {
    giftType: "default birthday gift",
    status: "Small Birthday Box",
    image: {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVpoHhv49yIxz0hKqzcb1UuqRtaGCCHksmSQ&usqp=CAU",
      alt: "gift image",
    },
    id: 1,
  },
  {
    giftType: "default anniversary gift",
    status: "Good Job Basket",
    image: {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5FidWWXA-75zfe8xcZFjFBbajsjErCBaVWQ&usqp=CAU",
      alt: "gift image",
    },
    id: 2,
  },
];

function GiftDashboard() {
  // set this true when user have no recipient from the api/backend
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  //congito user information
  const [user] = useOutletContext();
  const [open, setOpen] = useState(false);

  // TODO: Refactor this into a custom hook and move it out of this file
  useEffect(() => {
    async function addUser() {
      const newUser = {
        id: user.username,
        email: user.attributes.email,
        name: user.attributes.name,
        phoneNumber: user.attributes.phone_number,
      };
      await API.graphql(graphqlOperation(createUser, { input: newUser }));
      fetchCurrentUser();
    }

    async function fetchCurrentUser() {
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: user.username })
      );

      if (!userData.data.getUser) {
        addUser();
      } else if (!userData.data.getUser.company) {
        setOpen(true);
      }
    }

    fetchCurrentUser();
  }, [
    user.username,
    user.attributes.email,
    user.attributes.name,
    user.attributes.phone_number,
  ]);

  return (
    <>
      <Container component="main">
        <Header>
          <Typography variant="h1">Gift Dashboard</Typography>
          <Button onClick={() => navigate("gifts")}>Send a Gift</Button>
        </Header>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            icon={false}
            severity="info"
            sx={{ mb: 2 }}
          >
            <Typography variant="h3" sx={{ my: 1 }}>
              Welcome to Zip Zap!
            </Typography>
            <Typography>
              Do you want to finish setting up your account?
            </Typography>
            <Link to="/profile" className="button-link">
              <Button sx={{ my: 2 }}>Go to Profile</Button>
            </Link>
          </Alert>
        </Collapse>
        {user.attributes.name && (
          <Typography>Welcome, {user.attributes.name}!</Typography>
        )}
        {/* bottom components */}
        <Box sx={{ mt: 3, mb: 5 }}>
          <Accordions recentGifts={recentGifts} />
        </Box>
        <Box>
          <UtilizationAndDefault
            utilization={utilization}
            defaultGifts={defaultGifts}
          />
        </Box>
        <Box>
          <GiftCalendar />
        </Box>
      </Container>
      {/* when there is no recipient, you can render this modal by passing the open prop as true up in the state */}
      <GiftDashboardModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
export default GiftDashboard;
