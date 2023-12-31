type AxiosHeader = { [key: string]: string };

interface AxiosConfig {
  baseURL: string;
  timeout: number;
  headers: AxiosHeader;
}

const BASE_URL: string = "http://localhost:3000/";
const TIMEOUT: number = 30000;
const HEADERS: AxiosHeader = {
  Autorization: `Bearer ${JSON.parse(
    localStorage.getItem("accessToken") as string,
  )}`,
};

export default {
  baseURL: BASE_URL,
  headers: HEADERS,
  timeout: TIMEOUT,
} as AxiosConfig;
