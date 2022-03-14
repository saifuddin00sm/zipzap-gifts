import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import { createTodo } from "../graphql/mutations";
import { useMutation, useQueryClient } from "react-query";

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

const useAddTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  return { addTodo: mutation.mutate };
};

export { fetchTodos, useAddTodo };
