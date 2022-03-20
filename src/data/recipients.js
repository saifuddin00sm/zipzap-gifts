import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { listRecipients } from "../graphql/queries";
import { createRecipient } from "../graphql/mutations";

const fetchRecipients = async (token = "", limit = 25) => {
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

const addRecipient = async (recipient) => {
  /* TODO: Error checking here
  if (!todo.name || !todo.description)
    throw new Error("Missing name or description");
  */
  await API.graphql(graphqlOperation(createRecipient, { input: recipient }));
};

const useRecipients = ({ limit }) => {
  const queryClient = useQueryClient();
  const [previousTokens, setPreviousTokens] = useState([]);
  const [token, setToken] = useState("");
  const {
    isLoading,
    isError,
    data: { recipients = [], nextToken } = {},
    error,
    isFetching,
    isPreviousData,
  } = useQuery(
    ["recipients", { token, limit }],
    () => fetchRecipients(token, limit),
    {
      keepPreviousData: true,
    }
  );

  const getPreviousPage = () => {
    setPreviousTokens((prevTokens) => prevTokens.slice(0, -1));
    setToken(previousTokens[previousTokens.length - 1]);
  };

  const getNextPage = () => {
    if (!isPreviousData && nextToken) {
      setPreviousTokens([...previousTokens, token]);
      setToken(nextToken);
    }
  };

  const hasNext = !isPreviousData && nextToken;
  const hasPrevious = previousTokens.length > 0;

  const mutation = useMutation(addRecipient, {
    onSuccess: () => {
      // Remove the tokens since they might not be valid anymore
      setToken("");
      setPreviousTokens([]);
      // Invalidate and refresh all of the recipients queries
      queryClient.invalidateQueries("recipients");
    },
  });

  return {
    recipients,
    isLoading,
    isError,
    error,
    isFetching,
    getNextPage,
    getPreviousPage,
    hasNext,
    hasPrevious,
    addRecipient: mutation.mutate,
  };
};

export { fetchRecipients, useRecipients };
