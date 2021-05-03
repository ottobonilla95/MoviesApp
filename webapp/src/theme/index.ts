import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5e35b1',
    },
    secondary: {
      main: '#b388ff',
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
});
