import { API, graphqlOperation } from "aws-amplify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  createRecipient,
  createAddress,
  deleteAddress,
  deleteRecipient,
} from "../graphql/mutations";
import format from "date-fns/format";

const listRecipients = /* GraphQL */ `
  query ListRecipients(
    $filter: ModelRecipientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        shippingAddress {
          id
          address1
          address2
          city
          state
          zip
        }
        email
        phone
        jobTitle
        birthday
        startDate
        departmentID
        department {
          id
          name
        }
        recipientShippingAddressId
      }
      nextToken
    }
  }
`;

/**
 * Gets the given number of recipients from the backend from the location
 * of the token. The returned nextToken can be used to call this function
 * again to get the next group of recipients if there are more than the limit
 * specified.
 *
 * @param {string|undefined} token The token returned from a previous call
 *     to get the next group. Empty string or omit to start at the beginning.
 * @param {number} limit The max number of recipients to return.
 * @return {{recipients: Array, nextToken: string }} The list of recipients and the next token
 */
const fetchRecipients = async (token = "", limit = 100) => {
  const variables = { limit };
  if (token) {
    variables.nextToken = token;
  }

  const {
    data: {
      listRecipients: { items, nextToken },
    },
  } = await API.graphql(graphqlOperation(listRecipients, variables));
  return { recipients: items, nextToken };
};

/**
 * Gets all of the recipients from the backend.
 * We get all of the recipients at once because we need to know
 * the total number of them and it shouldn't be too arduous to keep them
 * all in memory at the same time for any given company.
 *
 * @return {Array} An array of all of the recipients.
 */
const getAllRecipients = async () => {
  let token = "";
  let recipientsList = [];

  do {
    const { recipients, nextToken } = await fetchRecipients(token);
    token = nextToken;
    recipientsList = recipientsList.concat(recipients);
  } while (token);

  return recipientsList;
};

const addRecipient = async ({ shippingAddress, ...recipient }) => {
  if (!recipient.email) {
    recipient.email = null;
  }
  if (!recipient.phone) {
    recipient.phone = null;
  }
  if (!recipient.firstName && !recipient.lastName) {
    new Error("Missing First and Last Name");
    return;
  }
  if (recipient.birthday) {
    recipient.birthday = format(recipient.birthday, "yyyy-MM-dd");
  }
  if (recipient.startDate) {
    recipient.startDate = format(recipient.startDate, "yyyy-MM-dd");
  }
  const {
    data: {
      createAddress: { id },
    },
  } = await API.graphql(
    graphqlOperation(createAddress, { input: shippingAddress })
  );
  recipient.recipientShippingAddressId = id;
  await API.graphql(graphqlOperation(createRecipient, { input: recipient }));
};

const removeRecipient = async ({ id }) => {
  await API.graphql(graphqlOperation(deleteRecipient, { input: id }));
};

const useRecipients = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: recipients,
    error,
  } = useQuery("recipients", getAllRecipients);

  const mutation = useMutation(addRecipient, {
    onSuccess: () => {
      // Invalidate and refresh all of the recipients queries
      queryClient.invalidateQueries("recipients");
    },
  });

  return {
    recipients,
    isLoading,
    isError,
    error,
    addRecipient: mutation.mutate,
  };
};

export { fetchRecipients, getAllRecipients, useRecipients, removeRecipient };
