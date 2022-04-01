import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { listTodos } from "../graphql/queries";
import { createTodo } from "../graphql/mutations";

const fetchTodos = async (token = "", limit = 100) => {
  const variables = { limit };
  if (token) {
    variables.nextToken = token;
  }

  const {
    data: {
      listTodos: { items, nextToken },
    },
  } = await API.graphql(graphqlOperation(listTodos, variables));
  return { todos: items, nextToken };
};

const addTodo = async (todo) => {
  if (!todo.name || !todo.description)
    throw new Error("Missing name or description");
  await API.graphql(graphqlOperation(createTodo, { input: todo }));
};

const useTodos = ({ limit }) => {
  const [previousTokens, setPreviousTokens] = useState([]);
  const [token, setToken] = useState("");
  const {
    isLoading,
    isError,
    data: { todos = [], nextToken } = {},
    error,
    isFetching,
    isPreviousData,
  } = useQuery(["todos", { token, limit }], () => fetchTodos(token, limit), {
    keepPreviousData: true,
  });

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

  const queryClient = useQueryClient();

  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      // Remove the tokens since they might not be valid anymore
      setToken("");
      setPreviousTokens([]);
      // Invalidate and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  return {
    todos,
    isLoading,
    isError,
    error,
    isFetching,
    getNextPage,
    getPreviousPage,
    hasNext,
    hasPrevious,
    addTodo: mutation.mutate,
  };
};

export { fetchTodos, useTodos };
