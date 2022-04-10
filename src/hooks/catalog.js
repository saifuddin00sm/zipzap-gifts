import { API, graphqlOperation } from "aws-amplify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createGift } from "../graphql/mutations";

const listGifts = /* GraphQL */ `
  query MyQuery {
    listGifts {
      items {
        active
        category
        description
        id
        name
        pictures {
          items {
            src
            alt
          }
        }
        price
        items {
          items {
            item {
              id
              name
              pictures {
                items {
                  src
                  alt
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Gets the given number of gifts from the backend from the location
 * of the token. The returned nextToken can be used to call this function
 * again to get the next group of gifts if there are more than the limit
 * specified.
 *
 * @param {string|undefined} token The token returned from a previous call
 *     to get the next group. Empty string or omit to start at the beginning.
 * @param {number} limit The max number of gifts to return.
 * @return {{gifts: Array, nextToken: string }} The list of gifts and the next token
 */
const fetchGifts = async (token = "", limit = 100) => {
  const variables = { limit };
  if (token) {
    variables.nextToken = token;
  }

  const {
    data: {
      listGifts: { items, nextToken },
    },
  } = await API.graphql(graphqlOperation(listGifts, variables));
  return { gifts: items, nextToken };
};

/**
 * Gets all of the gifts from the backend.
 * We get all of the gifts at once because we need to know
 * the total number of them and it shouldn't be too arduous to keep them
 * all in memory at the same time for any given company.
 *
 * @return {Array} An array of all of the gifts.
 */
const getAllGifts = async () => {
  let token = "";
  let giftList = [];

  do {
    const { gifts, nextToken } = await fetchGifts(token);
    token = nextToken;
    giftList = giftList.concat(gifts);
  } while (token);

  return giftList;
};

const addGift = async (gift) => {
  /* TODO: Error checking here
  if (!todo.name || !todo.description)
    throw new Error("Missing name or description");
  */
  await API.graphql(graphqlOperation(createGift, { input: gift }));
};

const useGifts = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: gifts,
    error,
  } = useQuery("gifts", getAllGifts);

  const mutation = useMutation(addGift, {
    onSuccess: () => {
      // Invalidate and refresh all of the gifts queries
      queryClient.invalidateQueries("gifts");
    },
  });

  return {
    gifts,
    isLoading,
    isError,
    error,
    addGift: mutation.mutate,
  };
};

export { fetchGifts, getAllGifts, useGifts };
