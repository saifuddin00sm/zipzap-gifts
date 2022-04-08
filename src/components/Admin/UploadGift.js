import React, { useState } from "react";
import Header from "../Header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { createGift } from "../../hooks/admin";

const initialGiftState = {
  name: "",
  category: "",
  items: [],
  price: "",
  description: "",
  pictures: [{ alt: "thumbnail", src: "" }],
  needs_subscription: false,
};

const initialItemState = {
  name: "",
  description: "",
  weight: "",
  price: "",
  pictures: [],
  active: true,
  source: "",
};

const initialGiftImageState = {
  alt: "",
  src: "",
};

const categories = [
  { label: "Recommended Gifts", value: "recommendedGifts" },
  { label: "Upcoming Holiday Gifts", value: "upcomingHoliday" },
  { label: "Birthday Gifts", value: "birthday" },
  { label: "Anniversary/ Promotion Gifts", value: "anniversaryPromotion" },
  { label: "Sympathy/ Get Well", value: "sympathyGetWell" },
  { label: "Just Because", value: "justBecause" },
  { label: "Life Event", value: "lifeEvent" },
];

const GiftImageCard = ({
  isThumbnail = false,
  type = "Gift",
  alt,
  src,
  setInput,
  deleteImage,
}) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      {src && <CardMedia component="img" height="140" image={src} alt={alt} />}
      <CardHeader
        title={`${type} Image ${isThumbnail ? " Thumbnail" : ""}`}
        action={
          !isThumbnail && (
            <IconButton aria-label="remove image" onClick={deleteImage}>
              <CloseIcon />
            </IconButton>
          )
        }
      />
      <CardContent>
        <Button>Upload Image</Button>
        {isThumbnail && <Typography>Thumbnails must be 175px high</Typography>}
        <TextField
          required
          label="Alt Text"
          disabled={!!isThumbnail}
          value={alt}
          onChange={(event) => setInput("alt", event.target.value)}
          sx={{ marginTop: 2 }}
        />
      </CardContent>
    </Card>
  );
};

const UploadGift = () => {
  const [formState, setFormState] = useState(initialGiftState);

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  const setPicture = (index, key, value) => {
    setFormState({
      ...formState,
      pictures: formState.pictures.map((v, i) => {
        if (i === index) {
          return { ...v, [key]: value };
        }
        return v;
      }),
    });
  };

  const submit = () => {
    createGift({ ...formState });
    setFormState(initialGiftState);
  };

  const addImage = () => {
    setFormState({
      ...formState,
      pictures: [...formState.pictures, { ...initialGiftImageState }],
    });
  };

  const removeImage = (index) => {
    setFormState({
      ...formState,
      pictures: formState.pictures.filter((v, i) => i !== index),
    });
  };

  return (
    <Container component="main">
      <Header>
        <Typography variant="h1">Gift Upload</Typography>
      </Header>
      <Box display="inline-block">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Grid
            container
            component="form"
            direction={"column"}
            spacing={3}
            noValidate
            autoComplete="off"
          >
            <Grid item>
              <TextField
                label="Name"
                fullWidth
                value={formState.name}
                onChange={(event) => setInput("name", event.target.value)}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                disablePortal
                options={categories}
                label="Category"
                onChange={(event, newValue) => {
                  setInput("category", newValue.value);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Price"
                fullWidth
                value={formState.price}
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(event) => setInput("price", event.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={formState.description}
                onChange={(event) =>
                  setInput("description", event.target.value)
                }
              />
            </Grid>
            {formState.pictures.map(({ alt, src }, index) => (
              <Grid item key={`image-${index}`}>
                <GiftImageCard
                  alt={alt}
                  src={src}
                  isThumbnail={index === 0}
                  setInput={(key, val) => setPicture(index, key, val)}
                  deleteImage={() => removeImage(index)}
                />
              </Grid>
            ))}
            <Grid item>
              <Tooltip title="Add Image" placement="right">
                <IconButton aria-label="add image" onClick={addImage}>
                  <AddPhotoAlternateIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) =>
                      setInput("needs_subscription", event.target.checked)
                    }
                    inputProps={{ "aria-label": "controlled checkbox" }}
                  />
                }
                label="Needs Subscription"
              />
            </Grid>
            <Grid item>
              <Button onClick={submit}>Create Gift</Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default UploadGift;
