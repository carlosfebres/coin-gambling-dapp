import React from "react";
import "fontsource-roboto";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HomePage } from "./pages/HomePage/HomePage";
import { DialogsContainer } from "./components/Dialogs/DialogsContainer";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import BackgroundImage from "./images/background.png";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#000a12",
    },
    text: {
      secondary: "rgba(255,255,255,.9)",
    },
    primary: {
      light: "#4f5b62",
      main: "#263238",
      dark: "#000a12",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffd64a",
      main: "#ffa500",
      dark: "#c67600",
      contrastText: "#000",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: `url(${BackgroundImage})`,
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <HomePage />
        <DialogsContainer />
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
