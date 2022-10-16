import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import { useRecipients } from "../../hooks/recipients";
import Fuse from "fuse.js";
import { format, parseISO } from "date-fns";

const style = {
  "& .list_items": {
    "& .plus": {
      width: "19px",
      height: "19px",
      borderRadius: "100%",
      textAlign: "center",
      marginRight: "10px",
      cursor: "pointer",
      padding: "0",
    },
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 10px",
    background: "#FFFFFF",
    border: "1px solid #E5E5E5",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    marginBottom: "15px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "21px",
    textTransform: "capitalize",
    color: "#343436",
    letterSpacing: "0.03em",
  },

  "& .MuiFormControl-root": {
    width: "100%",
    marginBottom: "1.5rem",
  },
  "& .head": {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "30px",
    textTransform: "capitalize",
    color: "#343436",
  },

  "& .table_head": {
    fontWeight: 500,
    fontSize: ".9rem",
    textTransform: "uppercase",
  },
};

const ChooseRecipient = ({
  selectedRecipients,
  setRecipients,
  orderDateType,
}) => {
  const { isLoading, recipients } = useRecipients();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const searchOptions = {
      tokenize: false,
      threshold: 0.3,
      keys: [
        { name: "firstName", weight: 2 },
        { name: "lastName", weight: 2 },
        "fullName",
        "jobTitle",
        "department.name",
        "birthday",
        "startDate",
      ],
    };
    if (recipients) {
      if (searchValue) {
        const fuse = new Fuse(
          recipients.map((r) => {
            return { ...r, fullName: `${r.firstName} ${r.lastName}` };
          }),
          searchOptions
        );
        setData(fuse.search(searchValue).map((i) => i.item));
      } else {
        setData(
          // Sort alphabetically
          recipients.sort((a, b) =>
            a.firstName > b.firstName ? 1 : b.firstName > a.firstName ? -1 : 0
          )
        );
      }
    }
  }, [searchValue, recipients]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={style}>
      <Grid
        sx={{ justifyContent: "center" }}
        container
        rowSpacing={1}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={6}>
          <Box sx={{ padding: "30px" }}>
            <Box>
              <Box sx={{ display: "flex" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Search For A Recipient"
                  onChange={(e) => setSearchValue(e.target.value)}
                />

                <Tooltip
                  title="Filter your Recipients by Birthday, Department, Name or Anniversary!"
                  placement="right-start"
                  arrow={true}
                  enterTouchDelay={0}
                >
                  <QuestionMarkIcon
                    sx={{
                      border: "2px solid #000",
                      padding: "2px",
                      borderRadius: "100%",
                      marginLeft: "15px",
                      marginTop: "6px",
                    }}
                  />
                </Tooltip>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: ".8rem",
                }}
              >
                <Typography variant="body2" className="table_head">
                  Name
                </Typography>
                <Typography variant="body2" className="table_head">
                  {orderDateType}
                </Typography>
              </Box>
            </Box>
            {data.length > 0 ? (
              data
                .filter(({ id }) => !selectedRecipients.includes(id))
                .sort((a, b) => a.firstName.localeCompare(b.firstName))
                .map(({ id, firstName, lastName, birthday, startDate }) => {
                  let date;
                  if (orderDateType === "BIRTHDAY") {
                    date = birthday;
                  } else if (orderDateType === "ANNIVERSARY") {
                    date = startDate;
                  }
                  return (
                    <Box className="list_items" key={id}>
                      <Box>
                        <Box>
                          <IconButton
                            className="plus"
                            sx={{
                              background: "#ABC6BD",
                            }}
                            onClick={() =>
                              setRecipients([...selectedRecipients, id])
                            }
                          >
                            <AddIcon sx={{ fontSize: "15px", color: "#000" }} />
                          </IconButton>
                          <Typography variant="body">{`${firstName} ${lastName}`}</Typography>
                        </Box>
                      </Box>
                      {date && (
                        <Box>
                          <Typography variant="body">
                            {format(parseISO(date), "M/d")}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  );
                })
            ) : (
              <Typography>No Recipients!</Typography>
            )}
            <Box sx={{ textAlign: "center" }}>
              <Button
                size="small"
                onClick={() =>
                  setRecipients([
                    ...selectedRecipients,
                    ...data
                      .filter(({ id }) => !selectedRecipients.includes(id))
                      .map(({ id }) => id),
                  ])
                }
              >
                Add all
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ background: "#F4F4F4", height: "100%", padding: "30px" }}>
            <Typography
              sx={{ marginBottom: "20px" }}
              variant="h6"
              className="head"
            >
              Recipients for this Gift
            </Typography>
            {selectedRecipients.length > 0 &&
              recipients
                .filter(({ id }) => selectedRecipients.includes(id))
                .sort((a, b) => a.firstName.localeCompare(b.firstName))
                .map(({ id, firstName, lastName, birthday, startDate }) => {
                  let date;
                  if (orderDateType === "BIRTHDAY") {
                    date = birthday;
                  } else if (orderDateType === "ANNIVERSARY") {
                    date = startDate;
                  }
                  return (
                    <Box className="list_items" key={id}>
                      <Box>
                        <Box>
                          <IconButton
                            className="plus"
                            sx={{
                              background: "#D38D77",
                            }}
                            onClick={() =>
                              setRecipients(
                                selectedRecipients.filter((f) => f !== id)
                              )
                            }
                          >
                            <HorizontalRuleIcon
                              sx={{ fontSize: "15px", color: "#000" }}
                            />
                          </IconButton>
                          <Typography variant="body">{`${firstName} ${lastName}`}</Typography>
                        </Box>
                      </Box>
                      {date && (
                        <Box>
                          <Typography variant="body">
                            {format(parseISO(date), "M/d")}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  );
                })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChooseRecipient;
