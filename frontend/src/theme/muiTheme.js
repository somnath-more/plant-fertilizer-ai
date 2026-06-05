import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#16a34a",
      dark: "#047857",
      light: "#86efac",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#475569",
    },
    error: {
      main: "#dc2626",
    },
    background: {
      default: "#f7fdf9",
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#4b5563",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Poppins', sans-serif" },
    h2: { fontFamily: "'Poppins', sans-serif" },
    h3: { fontFamily: "'Poppins', sans-serif" },
    h4: { fontFamily: "'Poppins', sans-serif" },
    h5: { fontFamily: "'Poppins', sans-serif" },
    h6: { fontFamily: "'Poppins', sans-serif" },
    button: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

export default muiTheme;
