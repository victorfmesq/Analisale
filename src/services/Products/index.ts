import { AxiosResponse } from "axios";
import api from "../api";
import { FAILED_REQUEST_RES, Result } from "../result";

const BASE_URL = "products";

// TODO: check response types match with api

export const getAllProducts = async (): Promise<Result<Product.Entity[]>> => {
  let result: Result<Product.Entity[]> = FAILED_REQUEST_RES;

  await api
    .get<Product.Entity[]>(`${BASE_URL}`)
    .then((response: AxiosResponse<Product.Entity[]>) => {
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
): Promise<Result<Product.Entity>> => {
  let result: Result<Product.Entity> = FAILED_REQUEST_RES;

  await api
    .get<Product.Entity>(`${BASE_URL}/${id}`)
    .then((response: AxiosResponse<Product.Entity>) => {
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
  payload: Product.Payload,
): Promise<Result<Product.Entity>> => {
  let result: Result<Product.Entity> = FAILED_REQUEST_RES;

  await api
    .post<Product.Entity>(`${BASE_URL}`, payload)
    .then((response: AxiosResponse<Product.Entity>) => {
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
  payload: Product.Payload,
): Promise<Result<Product.Entity>> => {
  let result: Result<Product.Entity> = FAILED_REQUEST_RES;

  await api
    .put<Product.Entity>(`${BASE_URL}/${id}`, payload)
    .then((response: AxiosResponse<Product.Entity>) => {
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
): Promise<Result<Product.Entity>> => {
  let result: Result<Product.Entity> = FAILED_REQUEST_RES;

  await api
    .delete<Product.Entity>(`${BASE_URL}/${id}`)
    .then((response: AxiosResponse<Product.Entity>) => {
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
