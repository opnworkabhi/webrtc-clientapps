import axios from "axios";
import { API_BASE_PATH } from "../../constants/network.constant";

const AxiosInstance = axios.create({
  baseURL: API_BASE_PATH,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
