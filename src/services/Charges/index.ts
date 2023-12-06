import { AxiosResponse } from "axios";
import api from "../api";
import { FAILED_REQUEST_RES, Result } from "../result";

const BASE_URL = "Charges";

// TODO: check response types match with api

export const getAllCharges = async (): Promise<Result<Charge.Entity[]>> => {
  let result: Result<Charge.Entity[]> = FAILED_REQUEST_RES;

  await api
    .get<Charge.Entity[]>(`${BASE_URL}`)
    .then((response: AxiosResponse<Charge.Entity[]>) => {
      console.log("getAllCharges: ", response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })

    .catch((err) => {
      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no getAllCharges",
      };

      console.log(err);
    });

  return result;
};

export const getChargeById = async (
  id: string,
): Promise<Result<Charge.Entity>> => {
  let result: Result<Charge.Entity> = FAILED_REQUEST_RES;

  await api
    .get<Charge.Entity>(`${BASE_URL}/${id}`)
    .then((response: AxiosResponse<Charge.Entity>) => {
      console.log("getAllCharges: ", response);

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
        message: "Falha no getChargeById",
      };
    });

  return result;
};

export const createCharge = async (
  payload: Charge.Payload,
): Promise<Result<Charge.Entity>> => {
  let result: Result<Charge.Entity> = FAILED_REQUEST_RES;

  await api
    .post<Charge.Entity>(`${BASE_URL}`, payload)
    .then((response: AxiosResponse<Charge.Entity>) => {
      console.log("createCharges: ", response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })
    .catch((err) => {
      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no createCharge",
      };

      console.log(err);
    });

  return result;
};

export const updateCharge = async (
  id: string,
  payload: Charge.Payload,
): Promise<Result<Charge.Entity>> => {
  let result: Result<Charge.Entity> = FAILED_REQUEST_RES;

  await api
    .put<Charge.Entity>(`${BASE_URL}/${id}`, payload)
    .then((response: AxiosResponse<Charge.Entity>) => {
      console.log(`UpdateCharge/${id}: `, response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })
    .catch((err) => {
      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no updateCharge",
      };

      console.log(err);
    });

  return result;
};

export const deleteCharge = async (
  id: string,
): Promise<Result<Charge.Entity>> => {
  let result: Result<Charge.Entity> = FAILED_REQUEST_RES;

  await api
    .delete<Charge.Entity>(`${BASE_URL}/${id}`)
    .then((response: AxiosResponse<Charge.Entity>) => {
      console.log(`UpdateCharge/${id}: `, response);

      result = {
        isSuccess: true,
        message: response.statusText,
        value: response.data,
      };
    })
    .catch((err) => {
      result = {
        ...FAILED_REQUEST_RES,
        message: "Falha no deleteCharge",
      };

      console.log(err);
    });

  return result;
};
