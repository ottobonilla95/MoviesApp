import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// appConfig
import { appConfig } from "../config";

// sweetalert
import swal from "sweetalert";

// notification
import { toast } from "react-toastify";

const requestHandler = (request: AxiosRequestConfig) => {
  const user = localStorage.getItem("user");

  if (user) {
    const token = JSON.parse(user).token;
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return request;
};
const successHandler = (response: AxiosResponse) => {
  const message = response.data.message;

  if (message) {
    toast(message, {
      type: "success",
      hideProgressBar: true,
    });
  }

  return response;
};
const errorHandler = (error: any) => {
  // if there is no answer from server
  if (!error.response) {
    swal({
      title: "Error!",
      text: "Connection error.",
      icon: "error",
      buttons: {
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          closeModal: true,
        },
      },
    });
    return;
  }
  const errors: any[] = error.response.data.errors || [];

  let errorsText = "";

  errors.forEach((error) => {
    errorsText = errorsText + `${error.message}\n`;
  });

  swal({
    title: "Error!",
    text: errorsText,
    icon: "error",
    buttons: {
      confirm: {
        text: "OK",
        value: true,
        visible: true,
        closeModal: true,
      },
    },
  });

  return Promise.reject(error);
};

const axiosInstance = axios.create({
  baseURL:appConfig.baseURL

});

axiosInstance.interceptors.request.use((request) => requestHandler(request));

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default axiosInstance;
