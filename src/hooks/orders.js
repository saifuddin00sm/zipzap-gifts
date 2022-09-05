import { API, graphqlOperation } from "aws-amplify";
import { Auth } from "@aws-amplify/auth";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createOrder, updateOrder } from "../graphql/mutations";

const listOrders = /* GraphQL */ `
  query GetOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        orderType
        name
        toDate
        fromDate
        recipientIDs
        giftImage
      }
      nextToken
    }
  }
`;

/**
 * Gets the given number of orders from the backend from the location
 * of the token. The returned nextToken can be used to call this function
 * again to get the next group of orders if there are more than the limit
 * specified.
 *
 * @param {string|undefined} token The token returned from a previous call
 *     to get the next group. Empty string or omit to start at the beginning.
 * @param {number} limit The max number of orders to return.
 * @return {{orders: Array, nextToken: string }} The list of orders and the next token
 */
const fetchOrders = async (token = "", limit = 100) => {
  const variables = { limit };
  if (token) {
    variables.nextToken = token;
  }

  const {
    data: {
      listOrders: { items, nextToken },
    },
  } = await API.graphql(graphqlOperation(listOrders, variables));
  return { orders: items, nextToken };
};

/**
 * Gets all of the orders from the backend.
 *
 * @todo Update this so that it only gets a window of orders
 * of a month or so? We'll need to do this after they've been using it for a bit.
 *
 * @return {Array} An array of all of the orders.
 */
const getAllOrders = async () => {
  let token = "";
  let ordersList = [];

  do {
    const { orders, nextToken } = await fetchOrders(token);
    token = nextToken;
    ordersList = ordersList.concat(orders);
  } while (token);

  return ordersList;
};

const addOrder = async ({
  id,
  giftID,
  giftImage,
  giftPrice,
  name,
  note,
  to: toDate,
  from: fromDate,
  orderType,
  orderDateType,
  recipients: recipientIDs,
  totalPrice,
  shippingAddressType,
  paymentID,
}) => {
  const currentSession = await Auth.currentSession();
  const user = currentSession.idToken.payload.email;
  const order = {
    giftID,
    giftImage,
    giftPrice,
    name,
    note,
    toDate,
    fromDate,
    recipientIDs,
    totalPrice,
    shippingAddressType,
    paymentID,
    orderType,
    orderDateType,
  };
  if (!orderDateType) {
    delete order.orderDateType;
  }

  if (id) {
    order.id = id;
    order.updatedBy = user;
    await API.graphql(graphqlOperation(updateOrder, { input: order }));
  } else {
    order.createdBy = user;
    await API.graphql(graphqlOperation(createOrder, { input: order }));
  }
};

export const useOrders = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: orders,
    error,
  } = useQuery("orders", getAllOrders);

  const mutation = useMutation(addOrder, {
    onSuccess: () => {
      // Invalidate and refresh all of the orders queries
      queryClient.invalidateQueries("orders");
    },
  });

  return {
    orders,
    isLoading,
    isError,
    error,
    addOrder: mutation.mutateAsync,
  };
};
