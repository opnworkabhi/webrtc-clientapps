import { API_BASE_PATH } from "../../constants/network.constant";
import AxiosInstance from "./axios.helper";

export const HTTP_GET_REQUEST = (endpoint, requestBody) => {
  const encodedToken = localStorage.getItem("encodedToken");
  const headers = {};
  if (encodedToken) {
    headers.Authorization = `Basic ${encodedToken}`;
  }
  return AxiosInstance.request({
    method: "GET",
    url: API_BASE_PATH + endpoint,
    responseType: "application/json",
    params: requestBody,
    headers,
  });
};

export const HTTP_POST_REQUEST = (endpoint, requestBody, authData) => {
  let encodedToken;
  
  try {
   encodedToken =  JSON.parse(localStorage.getItem("encodedToken"));
  }catch (err) {
    console.log("[test] error : ", err)
  }

  const headers = {};
  const axiosRequestBody = {
    method: "POST",
    url: API_BASE_PATH + endpoint,
    data: requestBody,
    responseType: "json",
    headers,
  };
  if (authData || encodedToken) {
    axiosRequestBody.auth = authData || encodedToken;
  }
  return AxiosInstance.request(axiosRequestBody);
};
