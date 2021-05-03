import React from "react";
import ReactDOM from "react-dom";

// notifications
import { ToastContainer } from "react-toastify";

// app
import App from "./app";

// css
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "cropperjs/dist/cropper.css";
import "react-dropzone-component/styles/filepicker.css";

// redux
import { Provider } from "react-redux";
import { configureStore } from "./redux";

// theme
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
