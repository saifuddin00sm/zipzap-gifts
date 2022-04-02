import React, { useState } from "react";
import { useTodos } from "../hooks/todos";
import { Loader, View } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

const initialState = { name: "", description: "" };
const limit = 5; // The number of todos to show on a single page

const Todo = () => {
  const {
    todos,
    isLoading,
    isError,
    error,
    isFetching,
    getNextPage,
    getPreviousPage,
    hasNext,
    hasPrevious,
    addTodo,
  } = useTodos({ limit });
  const [formState, setFormState] = useState(initialState);

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  const submitTodo = () => {
    addTodo({ ...formState });
    setFormState(initialState);
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
      <button onClick={getPreviousPage} disabled={!hasPrevious}>
        Previous Page
      </button>

      {todos.map((todo, index) => (
        <div key={todo.id ? todo.id : index} style={styles.todo}>
          <p style={styles.todoName}>{todo.name}</p>
          <p style={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}

      {isFetching && <Loader variation="linear" />}
      <button onClick={getNextPage} disabled={!hasNext}>
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
