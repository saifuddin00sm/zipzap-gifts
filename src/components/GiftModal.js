import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 700,
  width: "100%",
  minHeight: "80vh",
  maxHeight: "80vh",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
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
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: "2px 4px 8px 2px rgba(0, 0, 0, 0.25)",
  "& .closeBtn": {
    display: "flex",
    justifyContent: "flex-end",
    padding: "14px",
    "& .mainBtn": {
      background: "#343436",
      display: "flex",
      justifyContent: "center",
      borderRadius: "100%",
      alignItems: "center",
      width: "34px",
      cursor: "pointer",
      height: "34px",
    },
  },

  "& .modalContents": {
    padding: "0 40px",

    "& .img_box": {
      position: "relative",
      overflow: "hidden",
      height: "400px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      "& .slide": {
        width: "100%",
        height: "100%",
        "& img": {
          height: "100%",
          width: "100%",
          objectFit: "cover",
          padding: "0 12px",
        },
      },
      "& .arrows": {
        width: "45px",
        height: "47px",
        borderRadius: "100%",
        background: "#98B1C2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 10px",
        cursor: "pointer",
      },
    },
    "& .price": {
      fontWeight: 600,
      fontSize: "45px",
      lineHeight: "68px",
      color: "#98B1C2",
    },
    "& .list": {
      paddingLeft: "10px",
      "& > li": {
        fontWeight: 500,
        fontSize: "15px",
        lineHeight: "22px",
      },
      "& h6": {
        marginLeft: "-18px",
        marginBottom: "10px",
        fontWeight: 700,
        fontSize: "20px",
        lineHeight: "30px",
      },
    },
  },
};

export default function GiftModal({
  openModal,
  setOpenModal,
  selectable,
  setSelectedGift,
}) {
  const [slideIndex, setSlideIndex] = React.useState(0);

  const handleClose = () => {
    setSlideIndex(0);
    setOpenModal({ open: false, modalData: {} });
  };
  const { modalData, open } = openModal;
  const { description, name, price, items, pictures } = modalData;

  const included = items?.items?.map((item) => item.item).map((i) => i.name);

  const itemImgs = items?.items
    ?.map((item) => item.item)
    .map((i) => i.pictures.items)
    .reduce((imgs, pictures) => {
      return [...imgs, ...pictures];
    }, [])
    .filter(({ alt }) => alt !== "thumbnail");

  const imgs = [
    ...pictures.items.filter(({ alt }) => alt !== "thumbnail"),
    ...itemImgs,
  ];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box className="closeBtn">
          <IconButton className="mainBtn" onClick={handleClose}>
            <ClearIcon sx={{ color: "#ffff" }} />
          </IconButton>
        </Box>
        <Box className="modalContents">
          <Box className="img_box">
            <IconButton
              onClick={() => {
                setSlideIndex(
                  slideIndex > 0 ? slideIndex - 1 : imgs.length - 1
                );
              }}
              className="left_arrow arrows"
            >
              <ChevronLeftIcon sx={{ fontSize: "2.5rem" }} />
            </IconButton>
            <Box className="slide">
              {!imgs ? (
                <Typography>Loading...</Typography>
              ) : imgs.length > 0 ? (
                <img src={imgs[slideIndex].src} alt="gift images" />
              ) : (
                <Typography sx={{ textAlign: "center" }}>
                  No images found
                </Typography>
              )}
            </Box>
            <IconButton
              onClick={() => {
                setSlideIndex(
                  slideIndex < imgs.length - 1 ? slideIndex + 1 : 0
                );
              }}
              className="right_arrow arrows"
            >
              <ChevronRightIcon sx={{ fontSize: "2.5rem" }} />
            </IconButton>
          </Box>
          <Box>
            <Typography
              sx={{ textAlign: "center" }}
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              {name}
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            {included.length > 0 ? (
              <ul className="list">
                <Typography variant="h6">Items Inlcuded</Typography>
                {included.map((list) => (
                  <li key={list}>{list}</li>
                ))}
              </ul>
            ) : (
              <Typography>No Inlcuded data</Typography>
            )}
            <Typography className="price">{"$" + price}</Typography>
          </Box>
        </Box>
        <Box>
          {selectable && (
            <Button
              onClick={() => setSelectedGift(modalData)}
              fullWidth
              sx={{
                background: "#ABC4D6",
                padding: "15px",
                textAlign: "center",
                color: "#505050",
                fontWeight: 500,
                fontSize: "30px",
                lineHeight: "45px",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              Select Gift
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
