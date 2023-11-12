import { AxiosResponse } from "axios";
import api from "../api";
import { FAILED_REQUEST_RES, Result } from "../result";

const BASE_URL = "sales";

// TODO: check response types match with api

export const getAllSales = async (): Promise<Result<Sale.Entity[]>> => {
  let result: Result<Sale.Entity[]> = FAILED_REQUEST_RES;

  await api
    .get<Sale.Entity[]>(`${BASE_URL}`)
    .then((response: AxiosResponse<Sale.Entity[]>) => {
      console.log("getAllSales: ", response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })

    .catch((err) => {
      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no getAllSales",
      };

      console.log(err);
    });

  return result;
};

export const getSaleById = async (id: string): Promise<Result<Sale.Entity>> => {
  let result: Result<Sale.Entity> = FAILED_REQUEST_RES;

  await api
    .get<Sale.Entity>(`${BASE_URL}/${id}`)
    .then((response: AxiosResponse<Sale.Entity>) => {
      console.log("getAllSales: ", response);

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
        message: "Falha no getSaleById",
      };
    });

  return result;
};

export const createSale = async (
  payload: Sale.Payload,
): Promise<Result<Sale.Entity>> => {
  let result: Result<Sale.Entity> = FAILED_REQUEST_RES;

  await api
    .post<Sale.Entity>(`${BASE_URL}`, payload)
    .then((response: AxiosResponse<Sale.Entity>) => {
      console.log("createSale: ", response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })
    .catch((err) => {
      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no createSale",
      };

      console.log(err);
    });

  return result;
};

export const updateSales = async (
  id: string,
  payload: Sale.Payload,
): Promise<Result<Sale.Entity>> => {
  let result: Result<Sale.Entity> = FAILED_REQUEST_RES;

  await api
    .put<Sale.Entity>(`${BASE_URL}/${id}`, payload)
    .then((response: AxiosResponse<Sale.Entity>) => {
      console.log(`updateSale/${id}: `, response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })
    .catch((err) => {
      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no updateSale",
      };

      console.log(err);
    });

  return result;
};

export const deleteSale = async (id: string): Promise<Result<Sale.Entity>> => {
  let result: Result<Sale.Entity> = FAILED_REQUEST_RES;

  await api
    .delete<Sale.Entity>(`${BASE_URL}/${id}`)
    .then((response: AxiosResponse<Sale.Entity>) => {
      console.log(`deleteSale/${id}: `, response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })
    .catch((err) => {
      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no deleteSale",
      };

      console.log(err);
    });

  return result;
};
