import React, { useState, useEffect } from "react";
import { parseISO, isAfter, format } from "date-fns";
import { API, graphqlOperation } from "aws-amplify";
import { useQuery } from "react-query";
import { getUser } from "../../graphql/queries";
import { useRecipients } from "../../hooks/recipients";
import Container from "@mui/material/Container";
import Header from "../Header.js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import Accordions from "./Accordions.js";
import UtilizationAndDefault from "./UtilizationAndDefault";
import GiftCalendar from "./GiftCalendar";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import TodayIcon from "@mui/icons-material/Today";
import CakeIcon from "@mui/icons-material/Cake";
import GiftDashboardModal from "./GiftDashboardModal";

// TODO: Put the holidays in the database or something. They need to be updated again next May
const holidaysData = [
  { name: "my day", date: "2022-05-22" },
  { name: "National Cheese Day", date: "2022-06-04" },
  { name: "National Donut Day", date: "2022-06-04" },
  { name: "Father's Day", date: "2022-06-19" },
  { name: "International Yoga Day", date: "2022-06-21" },

  { name: "Canada Day", date: "2022-07-01" },
  { name: "Independence Day", date: "2022-07-04" },
  { name: "World Chocolate Day", date: "2022-07-07" },
  { name: "National Video Game Day", date: "2022-07-08" },
  { name: "National Ice Cream Day", date: "2022-07-18" },
  { name: "Parents Day", date: "2022-07-25" },

  { name: "National Friendship Day", date: "2022-08-01" },
  { name: "International Cat's Day", date: "2022-08-08" },
  { name: "National Women's Day", date: "2022-08-09" },
  { name: "Back to School", date: "2022-08-20" },

  { name: "Labor Day", date: "2022-09-05" },
  { name: "Patriot Day", date: "2022-09-11" },
  { name: "Software Developer Day", date: "2022-09-13" },
  { name: "Batman Day", date: "2022-09-17" },
  { name: "National IT Professionals Day", date: "2022-09-20" },
  { name: "National Pancake Day", date: "2022-09-26" },

  { name: "National Custodian Day", date: "2022-10-02" },
  { name: "National Golf Lovers Day", date: "2022-10-04" },
  { name: "National Taco Day", date: "2022-10-04" },
  { name: "World Teachers day", date: "2022-10-05" },
  { name: "World Smile Day", date: "2022-10-07" },
  { name: "World Mental Health Day", date: "2022-10-10" },
  { name: "Indigenous People Day", date: "2022-10-10" },
  { name: "Colombus Day", date: "2022-10-10" },
  { name: "National Bosses Day", date: "2022-10-16" },
  { name: "National Paralegal Day", date: "2022-10-23" },
  { name: "Diwali", date: "2022-10-24" },
  { name: "National First Responders Day", date: "2022-10-28" },
  { name: "Halloween", date: "2022-10-31" },

  { name: "World Vegan Day", date: "2022-11-01" },
  { name: "Day of the Dead", date: "2022-11-02" },
  { name: "National Candy Day", date: "2022-11-04" },
  { name: "National Team Manager Day", date: "2022-11-06" },
  { name: "Veterans Day", date: "2022-11-11" },
  { name: "World Kindness Day", date: "2022-11-13" },
  { name: "National Hiking Day", date: "2022-11-17" },
  { name: "Thanksgiving", date: "2022-11-24" },
  { name: "Small Business Saturday", date: "2022-11-26" },
  { name: "Giving Tuesday", date: "2022-11-29" },

  { name: "National Bar Tender Day", date: "2022-12-02" },
  { name: "National Cookie Day", date: "2022-12-04" },
  { name: "National Pearl harbor Day of Remembrance", date: "2022-12-07" },
  { name: "National Sales Person Day", date: "2022-12-09" },
  { name: "National App Day", date: "2022-12-11" },
  { name: "Christmas Eve", date: "2022-12-24" },
  { name: "Christmas", date: "2022-12-25" },
  { name: "New Years Eve", date: "2022-12-31" },

  { name: "New Years Day", date: "2023-01-01" },
  { name: "Martin Luther King Day", date: "2023-01-16" },
  { name: "Popcorn Day", date: "2023-01-19" },
  { name: "Chinese New Year", date: "2023-01-22" },
  { name: "National Fun at Work Day", date: "2023-01-27" },
  { name: "National Hot Chocolate Day", date: "2023-01-31" },

  { name: "Ground Hogs Day", date: "2023-02-02" },
  { name: "National Pizza Day", date: "2023-02-09" },
  { name: "Galentine's Day", date: "2023-02-13" },
  { name: "Valentines Day", date: "2023-02-14" },
  { name: "Random Act of Kindness Day", date: "2023-02-17" },
  { name: "Mardi Gras", date: "2023-02-21" },
  { name: "National Pokemon Day", date: "2023-02-27" },

  { name: "Employee Appreciation Day", date: "2023-03-03" },
  { name: "Pi Day", date: "2023-03-14" },
  { name: "St Patrick's Day", date: "2023-03-17" },
  { name: "First Day of Spring", date: "2023-03-20" },

  { name: "April Fools Day", date: "2023-04-01" },
  { name: "National Pet Day", date: "2023-04-11" },
  { name: "Easter", date: "2023-04-09" },
  { name: "Earth Day", date: "2023-04-22" },
  { name: "National Picnic Day", date: "2023-04-23" },
  { name: "National Pretzel Day", date: "2023-04-26" },
  { name: "Administrative Assistant Day", date: "2023-04-26" },

  { name: "International Harry Potter Day", date: "2023-05-02" },
  { name: "National Fitness Day", date: "2023-05-02" },
  { name: "Star Wars Day", date: "2023-05-04" },
  { name: "Cinco De Mayo", date: "2023-05-05" },
  { name: "National Nurses Day", date: "2023-05-06" },
  { name: "Mother's Day", date: "2023-05-14" },
  { name: "Receptionist Day", date: "2023-05-10" },
  { name: "National Armed Forces Day", date: "2023-05-20" },
  { name: "National BBQ Day", date: "2023-05-16" },
];

// utilization and default gift dummy data
const utilization = 60;

// Grab the next three holidays to display on the dashboard. Assumes holidaysData is in order.
const upcomingHolidays = holidaysData.reduce((upcomingHolidays, holiday) => {
  if (
    isAfter(parseISO(holiday.date), new Date()) &&
    upcomingHolidays.length < 3
  ) {
    upcomingHolidays.push(holiday);
  }
  return upcomingHolidays;
}, []);
const defaultGifts = [
  {
    giftType: "Upcoming Holidays",
    gifts: [
      ...upcomingHolidays.map(({ name, date }, index) => ({
        name,
        date,
        icon: (
          <TodayIcon sx={{ fontSize: { lg: "2.7rem" } }} color="secondary" />
        ),
        id: index,
      })),
    ],
    id: 1,
  },
  // {
  //   giftType: "Upcoming Recipient Events",
  //   gifts: [
  //     {
  //       name: "[Name] Birthday|Anniversary",
  //       date: "2022-09-09T00:00:00",
  //       icon: (
  //         <CakeIcon sx={{ fontSize: { lg: "2.7rem" } }} color="secondary" />
  //       ),
  //       id: 1,
  //     },
  //    ...
  //   ],
  //   id: 2,
  //  },
];

function GiftDashboard() {
  // TODO: Check if we want to still use this: show the modal if the user has no recipients
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [user] = useOutletContext();
  const userID = user?.username;
  const { data: { data: { getUser: userData } = {} } = {} } = useQuery(
    ["users", userID],
    () => API.graphql(graphqlOperation(getUser, { id: userID })),
    { enabled: !!userID }
  );
  const { recipients } = useRecipients();
  const [open, setOpen] = useState(false);
  const handleDayClick = (day) => {};

  // Display the "Finish Setting Up Profile" message if they don't have a Company yet
  useEffect(() => {
    if (userData && !userData.company?.name) {
      setOpen(true);
    }
  }, [userData]);

  let calendarEvents = [];
  if (recipients?.length > 0) {
    // Move all anniversaries and birthdays to this year so they show up on the Calendar
    const thisYear = new Date().getFullYear();
    calendarEvents = recipients.flatMap((recipient) => [
      {
        name: `${recipient.firstName} ${recipient.lastName} Birthday`,
        icon: (
          <CakeIcon
            sx={{ fontSize: { lg: "2.5rem", xs: "1rem" } }}
            color="secondary"
          />
        ),
        date: format(parseISO(recipient.birthday), `${thisYear}-MM-dd`),
        id: `${recipient.id}-birthday`,
      },
      {
        name: `${recipient.firstName} ${recipient.lastName} Anniversary`,
        icon: (
          <EventRepeatIcon
            sx={{ fontSize: { lg: "2.5rem", xs: "1rem" } }}
            color="secondary"
          />
        ),
        date: format(parseISO(recipient.startDate), `${thisYear}-MM-dd`),
        id: `${recipient.id}-anniversary`,
      },
    ]);
  }

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
          <Accordions />
        </Box>
        <Box>
          <UtilizationAndDefault
            utilization={utilization}
            defaultGifts={defaultGifts}
          />
        </Box>
        <Box>
          <GiftCalendar
            showDetailsHandle={handleDayClick}
            giftDates={calendarEvents}
            holidaysData={holidaysData}
          />
        </Box>
      </Container>
      {/* when there is no recipient, you can render this modal by passing the open prop as true up in the state */}
      <GiftDashboardModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
export default GiftDashboard;
