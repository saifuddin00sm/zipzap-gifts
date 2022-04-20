import React, { useState } from "react";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Tooltip from "@mui/material/Tooltip";

const Input = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "5px 12px",
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
  "& .list_items": {
    "& .plus": {
      width: "19px",
      height: "19px",
      // background: '#ABC6BD',
      borderRadius: "100%",
      display: "inline-block",
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

// searchable data
const data = [
  {
    name: "Wylieasd Sawyer",
    birthday: "12/5",
    id: 1,
  },
  {
    name: "Karen Holt",
    birthday: "1/5",
    id: 2,
  },
  {
    name: "Abreahm Mcdaniel",
    birthday: "12/5",
    id: 3,
  },
  {
    name: "Reed Gtreends",
    birthday: "2/5",
    id: 4,
  },
  {
    name: "Wesley Burnett",
    birthday: "3/5",
    id: 5,
  },
  {
    name: "Stephany Cardenas",
    birthday: "12/5",
    id: 6,
  },
];

const ChooseRecipient = () => {
  const usersData = data;
  const [searchValue, setSearchValue] = useState("");
  const [selectSearchValue, setSelectSearchValue] = useState("");
  const [selectedData, setSelectedData] = useState([]);

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
            <Typography
              sx={{ marginBottom: "20px" }}
              variant="h6"
              className="head"
            >
              Master List
            </Typography>
            <Head type="add" setSearchValue={setSearchValue} />
            {usersData.length > 0 ? (
              usersData
                .filter((i) =>
                  searchValue === ""
                    ? i
                    : i.name.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((item) => (
                  <Box className="list_items" key={item.id}>
                    <Box>
                      <Box>
                        <IconButton
                          className="plus"
                          sx={{
                            background: "#ABC6BD",
                          }}
                          onClick={() =>
                            setSelectedData([...selectedData, item])
                          }
                        >
                          <AddIcon sx={{ fontSize: "15px", color: "#000" }} />
                        </IconButton>
                        <Typography variant="body">{item.name}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body">{item.birthday}</Typography>
                    </Box>
                  </Box>
                ))
            ) : (
              <Typography>No data</Typography>
            )}
            <Box sx={{ textAlign: "center" }}>
              <Button size="small" onClick={() => setSelectedData(usersData)}>
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
            <Head type="remove" setSelectSearchValue={setSelectSearchValue} />
            {selectedData.length > 0 &&
              selectedData
                .filter((i) =>
                  selectSearchValue === ""
                    ? i
                    : i.name
                        .toLowerCase()
                        .includes(selectSearchValue.toLowerCase())
                )
                .map((data) => (
                  <Box className="list_items" key={data.id}>
                    <Box>
                      <Box>
                        <IconButton
                          className="plus"
                          sx={{
                            background: "#D38D77",
                          }}
                          onClick={() =>
                            setSelectedData(
                              selectedData.filter((f) => f.id !== data.id)
                            )
                          }
                        >
                          <HorizontalRuleIcon
                            sx={{ fontSize: "15px", color: "#000" }}
                          />
                        </IconButton>
                        <Typography variant="body">{data.name}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body">{data.birthday}</Typography>
                    </Box>
                  </Box>
                ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChooseRecipient;

// Header component
const Head = ({ type, setSearchValue, setSelectSearchValue }) => {
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <FormControl variant="standard" sx={{ display: "flex" }}>
          <Input
            fullWidth
            placeholder="Search For A Recipient"
            id="recipient"
            onChange={
              type === "add"
                ? (e) => setSearchValue(e.target.value)
                : (e) => setSelectSearchValue(e.target.value)
            }
          />
        </FormControl>
        {type === "add" && (
          <Tooltip
            title="Filter by Any attribute of the user"
            placement="right-start"
            arrow={true}
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
        )}
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
          Birthday
        </Typography>
      </Box>
    </Box>
  );
};
