import { API, graphqlOperation } from "aws-amplify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  createGiftItems,
  createGift as createGiftMutation,
  createItem as createGiftItemMutation,
  createGiftImage as createGiftImageMutation,
} from "../graphql/mutations";

const listGiftItems = /* GraphQL */ `
  query ListGiftItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;

const fetchGiftItems = async (token = "", limit = 100) => {
  const variables = { limit };
  if (token) {
    variables.nextToken = token;
  }

  const {
    data: {
      listItems: { items, nextToken },
    },
  } = await API.graphql(graphqlOperation(listGiftItems, variables));
  return { giftItems: items, nextToken };
};

const getAllGiftItems = async () => {
  let token = "";
  let giftItemsList = [];

  do {
    const { giftItems, nextToken } = await fetchGiftItems(token);
    token = nextToken;
    giftItemsList = giftItemsList.concat(giftItems);
  } while (token);

  return giftItemsList;
};

const addGiftItemWithPictures = async ({ pictures, ...giftItem }) => {
  const {
    data: {
      createItem: { id },
    },
  } = await API.graphql(
    graphqlOperation(createGiftItemMutation, { input: giftItem })
  );
  if (id) {
    pictures.forEach((pic) => addGiftImage({ ...pic, itemPicturesId: id }));
  }
  return id;
};

const useGiftItems = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: giftItems,
    error,
  } = useQuery("giftItems", getAllGiftItems);

  const mutation = useMutation(addGiftItemWithPictures, {
    onSuccess: () => {
      queryClient.invalidateQueries("giftItems");
    },
  });

  return {
    giftItems,
    isLoading,
    isError,
    error,
    addGiftItem: mutation.mutate,
  };
};

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

const createGift = async ({ items, pictures, ...gift }) => {
  if (!items || !pictures) {
    throw new Error("Missing items or pictures!");
  }

  const {
    data: {
      createGift: { id },
    },
  } = await API.graphql(graphqlOperation(createGiftMutation, { input: gift }));
  if (id) {
    pictures.forEach((pic) => addGiftImage({ ...pic, giftPicturesId: id }));
    items.forEach((itemID) =>
      API.graphql(
        graphqlOperation(createGiftItems, { input: { itemID, giftID: id } })
      )
    );
  }
  return id;
};

export { useGiftItems, createGift };
