export const zipZapTheme = {
  palette: {
    type: "light",
    primary: {
      main: "#abc4d6",
    },
    secondary: {
      main: "#97afa7",
    },
    gitCardsbackground: {
      paper: "#E1E1E1",
      white: "#fffff",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: "#464646",
      fontSize: 40,
    },
    h3: {
      fontWeight: 600,
      fontSize: 30,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
  },
};
