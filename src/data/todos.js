import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import { createTodo } from "../graphql/mutations";

async function fetchTodos(token = "") {
  const variables = { limit: 3 };
  if (token) {
    variables.nextToken = token;
  }

  const {
    data: {
      listTodos: { items, nextToken },
    },
  } = await API.graphql(graphqlOperation(listTodos, variables));
  return { todos: items, nextToken };
}

async function addTodo() {
  /*
  try {
    if (!formState.name || !formState.description) return;
    const todo = { ...formState };
    setTodos([...todos, todo]);
    setFormState(initialState);
    await API.graphql(graphqlOperation(createTodo, { input: todo }));
  } catch (err) {
    console.log("error creating todo:", err);
  }
  */
}

export { fetchTodos, addTodo };
