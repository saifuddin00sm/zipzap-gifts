import { API, graphqlOperation } from "aws-amplify";
import {
  //createGift as createGiftMutation,
  //createItem as createItemMutation,
  createGiftImage as createGiftImageMutation,
} from "../graphql/mutations";

const addGiftImage = async (img) => {
  const {
    data: {
      createGiftImage: { id },
    },
  } = await API.graphql(
    graphqlOperation(createGiftImageMutation, { input: img })
  );
  return id;
};

const createGift = async (data) => {
  const id = await addGiftImage(data);
  console.log({ id });
};

export { createGift };
