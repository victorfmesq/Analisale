import { AxiosResponse } from "axios";
import api from "../api";
import { FAILED_REQUEST_RES, Result } from "../result";

const BASE_URL = "products";

// TODO: check response types match with api

export const getAllProducts = async (): Promise<Result<Sale.Entity[]>> => {
  let result: Result<Sale.Entity[]> = FAILED_REQUEST_RES;

  await api
    .get<Sale.Entity[]>(`${BASE_URL}`)
    .then((response: AxiosResponse<Sale.Entity[]>) => {
      console.log("getAllProducts: ", response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })

    .catch((err) => {
      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no getAllProducts",
      };

      console.log(err);
    });

  return result;
};

export const getProductById = async (
  id: string,
): Promise<Result<Sale.Entity>> => {
  let result: Result<Sale.Entity> = FAILED_REQUEST_RES;

  await api
    .get<Sale.Entity>(`${BASE_URL}/${id}`)
    .then((response: AxiosResponse<Sale.Entity>) => {
      console.log("getAllProducts: ", response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })
    .catch((err) => {
      console.log(err);

      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no getProjectById",
      };
    });

  return result;
};

export const createProduct = async (
  payload: Sale.Payload,
): Promise<Result<Sale.Entity>> => {
  let result: Result<Sale.Entity> = FAILED_REQUEST_RES;

  await api
    .post<Sale.Entity>(`${BASE_URL}`, payload)
    .then((response: AxiosResponse<Sale.Entity>) => {
      console.log("createProducts: ", response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })
    .catch((err) => {
      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no createProduct",
      };

      console.log(err);
    });

  return result;
};

export const updateProduct = async (
  id: string,
  payload: Sale.Payload,
): Promise<Result<Sale.Entity>> => {
  let result: Result<Sale.Entity> = FAILED_REQUEST_RES;

  await api
    .put<Sale.Entity>(`${BASE_URL}/${id}`, payload)
    .then((response: AxiosResponse<Sale.Entity>) => {
      console.log(`UpdateProduct/${id}: `, response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })
    .catch((err) => {
      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no updateProduct",
      };

      console.log(err);
    });

  return result;
};

export const deleteProduct = async (
  id: string,
): Promise<Result<Sale.Entity>> => {
  let result: Result<Sale.Entity> = FAILED_REQUEST_RES;

  await api
    .delete<Sale.Entity>(`${BASE_URL}/${id}`)
    .then((response: AxiosResponse<Sale.Entity>) => {
      console.log(`UpdateProduct/${id}: `, response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })
    .catch((err) => {
      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no deleteProduct",
      };

      console.log(err);
    });

  return result;
};
