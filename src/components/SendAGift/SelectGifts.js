import React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import GiftCards from "../GiftCards";
import { useGifts } from "../../hooks/catalog";
import { Link } from "@mui/material";

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

const Root = styled("div")(({ theme }) => ({
  "& .topItems": {
    margin: "5px 0px 41px 0",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  "& .infoBox": {
    padding: "10px",
    background: "#FFFFFF",
    border: "1px solid #000000",
    maxWidth: "475px",
    width: "100%",
    "& p": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "21px",
      letterSpacing: "0.03em",
      color: "#6D6E70",
    },
  },
}));

const SelectGifts = ({ setSelectedGift }) => {
  const { isLoading, isError, gifts } = useGifts();
  return (
    <Root>
      <Box className="topItems">
        <Box>
          <Input fullWidth placeholder="Search for a gift" />
        </Box>
        <Box className="infoBox">
          <Typography>
            Don't see The perfect gift? Email{" "}
            <Link href="mailto:connect@zipzapgifts.com">
              connect@zipzapgifts.com
            </Link>{" "}
            to have a custom gift created just for you
          </Typography>
        </Box>
      </Box>
      <Box>
        <GiftCards
          data={gifts}
          loading={isLoading}
          error={isError}
          setSelectedGift={setSelectedGift}
        />
      </Box>
    </Root>
  );
};

export default SelectGifts;
