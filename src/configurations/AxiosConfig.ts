type AxiosHeader = { [key: string]: string };

interface AxiosConfig {
  baseURL: string;
  timeout: number;
  headers: AxiosHeader;
}

const BASE_URL: string = "http://localhost:3002/";
const TIMEOUT: number = 30000;
const HEADERS: AxiosHeader = {
  Autorization: `Bearer ${localStorage.getItem("@auth-token")}`,
};

export default {
  baseURL: BASE_URL,
  // headers: HEADERS,
  timeout: TIMEOUT,
} as AxiosConfig;
