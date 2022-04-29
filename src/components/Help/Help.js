import React from "react";
import Container from "@mui/material/Container";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";

// accordion items
const questions = [
  {
    question: "How do I delete a gift?",
    answer:
      "To delete a recipient, go to the recipients page, and click on the recipeint you wish to delete. On the recipeint dashboard, in the top right corner, you will see a gray delete button. Press that to delete the recipeint.",
    id: 1,
    icon: <DeleteForeverIcon />,
  },
  {
    question: "How do I upload a list of recipeints?",
    answer:
      "To upload a list of recipeints, press the “Recipeints” button on the right hand side of the app. you will then navigate to the  top right hand corner and press “upload a list”. you can download our template and add your recipeint information to that document, then upload for ease of use.",
    id: 2,
    icon: <GroupAddIcon />,
  },
  {
    question: "Where can I see my next gift? ",
    answer:
      "to see your upcoming gifts, go to the gift dashboard and scroll down to the “gift calendar”. there you will see all the upcoming gifts. you can also see who the gift is going to. happy gifting!",
    id: 1,
    icon: <VisibilityIcon />,
  },
  {
    question: "How do I remove a recipeint from a gift?",
    answer:
      "if someone leaves your company and you need to remove them from a recurring gift, delete the reciepint. you can do this by navigating to their profile, and pressing the gray delete button.",
    id: 1,
    icon: <PersonRemoveAlt1Icon />,
  },
];

const Root = styled("div")(({ theme }) => ({
  "& .banner": {
    marginBottom: "30px",
    minHeight: "476px",
    width: "100%",
    backgroundImage: "url('/settings_banner.png')",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    "& .MuiFormControl-root": {
      marginTop: "20px",
      width: "100%",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  "& .questions": {
    margin: "40px 0px",
    paddingBottom: "20px",
    "& .answer, .question": {
      fontWeight: "500",
      fontSize: "1.2rem",
      lineHeight: "30px",
      textTransform: "capitalize",
      [theme.breakpoints.down(768)]: {
        fontSize: ".9rem",
        lineHeight: "20px",
      },
    },
  },
}));

const Input = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(4),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "6px 15px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Help = () => {
  return (
    <Container component="main">
      <Header>
        <Typography variant="h1">Help And Resources</Typography>
      </Header>
      <Root>
        <Box className="banner">
          <Box>
            <Typography variant="h3">How Can We Help?</Typography>
            <FormControl variant="standard">
              <Input fullWidth placeholder="Search" id="search" />
            </FormControl>
          </Box>
        </Box>
        <Box>
          <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: "1.6rem" } }}>
            Support
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                xs: "column",
                sm: "column",
              },
            }}
          >
            <Button>
              <AlternateEmailIcon sx={{ mr: 1 }} />
              <Link
                sx={{ color: "#343436" }}
                href="mailto:connect@zipzapgifts.com"
              >
                Email: connect@zipzapgifts.com
              </Link>
            </Button>
            <Button>
              <HeadsetMicIcon sx={{ mr: 1 }} />
              <Link
                sx={{ color: "#343436", textDecoration: "none" }}
                href="tel:+8801799023965"
              >
                Phone: (+880) 1799023965
              </Link>
            </Button>
          </Box>
        </Box>

        <Box className="questions">
          <Typography variant="h4" sx={{ mb: 2, fontSize: { xs: "1.6rem" } }}>
            Popular Questions
          </Typography>
          {questions.map(({ question, answer, id, icon }) => (
            <Accordion
              sx={{
                mb: 2,
                background: "#F1F1F1",
                maxWidth: "835px",
                width: "100%",
              }}
              key={id}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${id}bh-content`}
                id={`panel${id}bh-header`}
              >
                {icon}
                <Typography
                  className="question"
                  sx={{
                    width: "100%",
                    flexShrink: 0,
                    textTransform: "capitalize",
                    ml: 1,
                  }}
                >
                  {question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="answer">{answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Root>
    </Container>
  );
};

export default Help;
