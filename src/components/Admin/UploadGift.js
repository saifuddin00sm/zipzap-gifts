import React, { useState, useRef } from "react";
import { Storage } from "aws-amplify";
import { v4 as uuid } from "uuid";
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
import { createGift, useGiftItems } from "../../hooks/admin";
import config from "../../aws-exports";

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

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
  pictures: [{ alt: "", src: "" }],
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
  const [fileName, setFileName] = useState("");
  const fileInput = useRef();

  const handleChange = async (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    const [name, extension] = file.name.split(".");
    setFileName(name);

    // Upload image to AWS S3
    if (!file) {
      return;
    }
    const { type: mimeType } = file;
    const key = `images/${uuid()}${name}.${extension}`;
    const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;

    await Storage.put(key, file, {
      contentType: mimeType,
    });
    setInput("src", url);
  };

  // TODO: Add spinner to show that image is uploading and disable submit button until it's done
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
        <input
          ref={fileInput}
          style={{ display: "none" }}
          accept="image/*"
          type="file"
          onChange={handleChange}
        />
        <Button onClick={() => fileInput.current.click()}>
          {fileName || "Upload Image"}
        </Button>
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

const ItemUpload = () => {
  const { addGiftItem } = useGiftItems();
  const [formState, setFormState] = useState(initialItemState);

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

  const submit = async () => {
    await addGiftItem({ ...formState });
    setFormState(initialItemState);
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
            <Typography variant="h2">Gift Item</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Name"
              fullWidth
              value={formState.name}
              onChange={(event) => setInput("name", event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={2}
              value={formState.description}
              onChange={(event) => setInput("description", event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Source"
              fullWidth
              value={formState.source}
              onChange={(event) => setInput("source", event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Weight"
              fullWidth
              value={formState.weight}
              onChange={(event) => setInput("weight", event.target.value)}
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
          {formState.pictures.map(({ alt, src }, index) => (
            <Grid item key={`image-${index}`}>
              <GiftImageCard
                type={"Item"}
                alt={alt}
                src={src}
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
            <Button onClick={submit}>Create Gift Item</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

const UploadGift = () => {
  const { giftItems } = useGiftItems();
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

  const submit = async () => {
    await createGift({ ...formState });
    // TODO: This doesn't place nice with the Autocomplete fields. Fix this.
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
      <Box display="inline-block" maxWidth={500}>
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
              <Typography variant="h2">Gift</Typography>
            </Grid>
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
              <Autocomplete
                multiple
                options={
                  giftItems?.sort((a, b) => (a.name > b.name ? 1 : -1)) || []
                }
                onChange={(event, values) =>
                  setInput(
                    "items",
                    values.map(({ id }) => id)
                  )
                }
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => {
                  return (
                    <li
                      {...props}
                      style={{
                        backgroundColor: props["aria-selected"] && "#97afa7",
                      }}
                      key={option.id}
                    >
                      {option.name}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Gift Items"
                    placeholder="Gift Items"
                  />
                )}
              />
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
      <ItemUpload />
    </Container>
  );
};

export default UploadGift;
