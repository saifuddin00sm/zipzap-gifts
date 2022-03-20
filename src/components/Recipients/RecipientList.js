import React from "react";

import "@aws-amplify/ui-react/styles.css";

const RecipientList = () => {
  return (
    <main style={styles.main}>
      <h1>Recipient Dashboard</h1>
      <div>Hello, World!</div>
    </main>
  );
};

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    margin: 20,
  },
};

export default RecipientList;
