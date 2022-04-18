import React from "react";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
    padding: "10px 12px",
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

const style = {
  display: "flex",
  width: "100%",
  "& .MuiFormControl-root": {
    width: "100%",
    marginBottom: "2.5rem",
  },
  "& .label": {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "28px",
    lineHeight: "42px",
    textTransform: "capitalize",
    color: "#343436",
  },
};

const GiftDetails = () => {
  return (
    <Box sx={style}>
      <Grid container rowSpacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={6}>
          <Box sx={{ padding: "30px" }}>
            <Box className="left" component="form">
              <FormControl variant="standard">
                <InputLabel className="label" shrink htmlFor="Gitf-name">
                  Gift Name
                </InputLabel>
                <Input fullWidth placeholder="Birthdays" id="Gitf-name" />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel className="label" shrink htmlFor="custom-note">
                  Custome note
                </InputLabel>
                <Input
                  multiline
                  rows={10}
                  placeholder="Thanks for being a great
                    Employee"
                />
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            className="right"
            sx={{ background: "#F4F4F4", height: "100%", padding: "30px" }}
          >
            <Box sx={{ marginBottom: "2.5rem" }}>
              <Typography variant="h6">Gift Type</Typography>
              <Box sx={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                <Button>One Time</Button>
                <Button variant="outlined">Recurring</Button>
              </Box>
            </Box>

            <Box>
              <Typography variant="h6">Gift Date</Typography>
              <Box sx={{ marginTop: "20px" }}>
                <Input placeholder="mm/dd/yyyy" />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GiftDetails;
