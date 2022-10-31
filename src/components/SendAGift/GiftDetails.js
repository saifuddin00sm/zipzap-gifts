import React from "react";
import { addDays } from "date-fns";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const style = {
  display: "flex",
  width: "100%",
  "& .MuiFormControl-root": {
    width: "100%",
    marginBottom: "2.5rem",
  },
};

const GiftDetails = ({
  name,
  note,
  orderType,
  orderDateType,
  canScheduleImmediately,
  to,
  from,
  setInput,
}) => {
  const minScheduleDate = addDays(new Date(), canScheduleImmediately ? 0 : 7);
  return (
    <Box sx={style}>
      <Grid container rowSpacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={6}>
          <Box sx={{ padding: "30px" }}>
            <Box className="left" component="form">
              <TextField
                fullWidth
                variant="outlined"
                label="Gift Name"
                value={name}
                onChange={(event) => setInput("name", event.target.value)}
              />
              <TextField
                label="Custom Note"
                multiline
                rows={10}
                placeholder="Thanks for being a great employee!"
                value={note}
                onChange={(event) => setInput("note", event.target.value)}
              />
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
                <Button
                  onClick={() => setInput("orderType", "ONE_TIME")}
                  variant={orderType === "ONE_TIME" ? "contained" : "outlined"}
                >
                  One Time
                </Button>
                <Button
                  onClick={() => setInput("orderType", "RECURRING")}
                  variant={orderType === "RECURRING" ? "contained" : "outlined"}
                >
                  Recurring
                </Button>
                <Tooltip
                  title={
                    <>
                      <Typography>
                        A <b>One Time Gift</b> is a gift that goes out once!{" "}
                        <em>
                          EX: A Get Well Soon Box, A Sympathy Gift, a Welcome
                          Little One Box, things that are not necessarily
                          planned on a specific day.
                        </em>
                      </Typography>
                      <Typography>
                        A <b>Recurring Gift</b> is a gift that happens multiple
                        times during a set time frame, for different people.{" "}
                        <em>EX: Anniversaries or Birthdays.</em>
                      </Typography>
                    </>
                  }
                  enterTouchDelay={0}
                  arrow={true}
                >
                  <InfoIcon sx={{ marginTop: "3px" }} />
                </Tooltip>
              </Box>
            </Box>

            {orderType === "ONE_TIME" ? (
              <Box>
                <Typography variant="h6">Gift Date</Typography>
                <DatePicker
                  value={to}
                  minDate={minScheduleDate}
                  inputFormat="MM/dd/yyyy"
                  maxDate={new Date().setDate(395)}
                  onChange={(value) => setInput("to", value)}
                  renderInput={(params) => (
                    <TextField variant="standard" {...params} />
                  )}
                />
              </Box>
            ) : (
              <Box>
                <Box>
                  <Typography sx={{ fontSize: "1.1rem" }} variant="h6">
                    Start Date
                  </Typography>
                  <DatePicker
                    value={from}
                    inputFormat="MM/dd/yyyy"
                    minDate={minScheduleDate}
                    maxDate={new Date().setDate(395)}
                    onChange={(value) => setInput("from", value)}
                    renderInput={(params) => (
                      <TextField variant="standard" {...params} />
                    )}
                  />
                  <Typography sx={{ fontSize: "1.1rem" }} variant="h6">
                    End Date
                  </Typography>
                  <DatePicker
                    value={to}
                    inputFormat="MM/dd/yyyy"
                    minDate={minScheduleDate}
                    maxDate={new Date().setDate(395)}
                    onChange={(value) => setInput("to", value)}
                    renderInput={(params) => (
                      <TextField
                        variant="standard"
                        {...params}
                        helperText="You can only plan Gifts for one year in advance. Don't worry, we will remind you to schedule these out again next year!"
                      />
                    )}
                  />
                  <Typography sx={{ fontSize: "1.1rem" }} variant="h6">
                    Select Recurring Type:
                  </Typography>
                  <Box sx={{ maxWidth: "118px", width: "100%" }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={orderDateType}
                        label="Select"
                        onChange={(event) =>
                          setInput("orderDateType", event.target.value)
                        }
                      >
                        <MenuItem value="BIRTHDAY">Birthday</MenuItem>
                        <MenuItem value="ANNIVERSARY">Anniversary</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GiftDetails;
