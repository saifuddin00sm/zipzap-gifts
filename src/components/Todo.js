import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchTodos, useAddTodo } from "../data/todos";
import { Loader, View } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

const initialState = { name: "", description: "" };
const limit = 3; // The number of todos to show on a single page

const Todo = () => {
  const { addTodo } = useAddTodo();
  const [previousTokens, setPreviousTokens] = useState([]);
  const [token, setToken] = useState("");
  const [formState, setFormState] = useState(initialState);
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

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  const submitTodo = () => {
    addTodo({ ...formState });
    setFormState(initialState);
  };

  const previousPageClick = () => {
    setPreviousTokens((prevTokens) => prevTokens.slice(0, -1));
    setToken(previousTokens[previousTokens.length - 1]);
  };

  const nextPageClick = () => {
    if (!isPreviousData && nextToken) {
      setPreviousTokens([...previousTokens, token]);
      setToken(nextToken);
    }
  };

  if (isLoading) {
    return <Loader variation="linear" />;
  }

  if (isError) {
    return <View>Error: {error.message}</View>;
  }

  return (
    <main style={styles.main}>
      <h2>Amplify Todos</h2>
      <input
        onChange={(event) => setInput("name", event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) => setInput("description", event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <br />
      <button style={styles.button} onClick={submitTodo}>
        Create Todo
      </button>
      <br />
      <button onClick={previousPageClick} disabled={!previousTokens.length}>
        Previous Page
      </button>

      {todos.map((todo, index) => (
        <div key={todo.id ? todo.id : index} style={styles.todo}>
          <p style={styles.todoName}>{todo.name}</p>
          <p style={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}

      {isFetching && <Loader variation="linear" />}
      <button onClick={nextPageClick} disabled={isPreviousData || !nextToken}>
        Next Page
      </button>
    </main>
  );
};

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    margin: 20,
    width: 400,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

export default Todo;
