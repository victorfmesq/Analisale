import axios, { AxiosInstance } from "axios";
import AxiosConfig from "../configurations/AxiosConfig";

const api: AxiosInstance = axios.create({
  ...AxiosConfig,
});

export default api;
