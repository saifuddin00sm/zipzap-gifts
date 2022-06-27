import { API, graphqlOperation } from "aws-amplify";
import { Auth } from "@aws-amplify/auth";
import { useMutation, useQueryClient } from "react-query";
import { createOrder } from "../graphql/mutations";

const addOrder = async ({
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
  const createdBy = currentSession.idToken.payload.email;
  const order = {
    giftID,
    giftImage,
    giftPrice,
    name,
    note,
    toDate,
    fromDate,
    recipientIDs,
    createdBy,
    totalPrice,
    shippingAddressType,
    paymentID,
    orderType,
    orderDateType,
  };
  if (!orderDateType) {
    delete order.orderDateType;
  }

  await API.graphql(graphqlOperation(createOrder, { input: order }));
};

export const useOrders = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addOrder, {
    onSuccess: () => {
      // Invalidate and refresh all of the orders queries
      queryClient.invalidateQueries("orders");
    },
  });

  return {
    addOrder: mutation.mutateAsync,
  };
};
