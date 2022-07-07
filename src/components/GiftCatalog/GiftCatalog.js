import React from "react";
import Container from "@mui/material/Container";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import GiftCards from "../GiftCards";
import { useGifts } from "../../hooks/catalog";

// Zip It's dummy data
const zipIts = [
  {
    active: null,
    category: "zipIt",
    description: "Send a virtual gift card to Thread Wallets!",
    id: "sgab45f9-1x26-777-8edla-b73c6dcf5a26",
    items: { items: [] },
    name: "Thread Wallets",
    pictures: {
      items: [
        {
          src: "https://cdn.shopify.com/s/files/1/1030/4291/files/all-mobile_1200x.jpg?v=7400654666644309467",
          alt: "thumbnail",
        },
        {
          src: "https://cdn.shopify.com/s/files/1/1030/4291/files/all-mobile_1200x.jpg?v=7400654666644309467",
          alt: "Thread Wallets",
        },
      ],
    },
    price: "25",
  },
  {
    active: null,
    category: "zipIt",
    description: "Send a virtual gift card to Pillow Cube!",
    id: "deak45f9-1x26-8888-8edca-b73c6dcf5a26",
    items: { items: [] },
    name: "Pillow Cube",
    pictures: {
      items: [
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKK8P3i4hIasdgR4nMOKhFp1uJH6SF2I9vQ&usqp=CAU",
          alt: "thumbnail",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKK8P3i4hIasdgR4nMOKhFp1uJH6SF2I9vQ&usqp=CAU",
          alt: "Pillow Cube",
        },
      ],
    },
    price: "25",
  },
  {
    active: null,
    category: "zipIt",
    description: "Send a virtual gift card to Golden Coil!",
    id: "deab45y9-1x26-9999-8edla-b73c6dcf5a26",
    items: { items: [] },
    name: "Golden Coil",
    pictures: {
      items: [
        {
          src: "https://www.goldencoil.com/assets/information_notebook-cover-f962599d3e63ca3bd3d417b073edc3b620c35fe14188f12a0c4e47430367f4b2.jpg",
          alt: "thumbnail",
        },
        {
          src: "https://www.goldencoil.com/assets/information_notebook-cover-f962599d3e63ca3bd3d417b073edc3b620c35fe14188f12a0c4e47430367f4b2.jpg",
          alt: "Golden Coil",
        },
      ],
    },
    price: "25",
  },
];

const GiftCatalog = () => {
  const { isLoading, isError, gifts } = useGifts();

  return (
    <Container component="main">
      <Header>
        <Typography variant="h1">Gift catalog</Typography>
      </Header>
      <GiftCards
        data={gifts.concat(zipIts)}
        loading={isLoading}
        error={isError}
      />
    </Container>
  );
};

export default GiftCatalog;
