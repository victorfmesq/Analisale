import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Form from "../../components/common/Form";
import * as S from "./styles";
import React, { useCallback, useEffect } from "react";
import { FormData, FormField } from "../../components/common/Form/types";
import useSession from "../../context/SessionContext/useSession";
import { createProduct } from "../../services/Products";
import { createCharge } from "../../services/Charges";
import useTableData from "../../context/TableDataContext/useTableData";

const USER_FIELD: FormField = {
  title: "usuário",
  type: "email",
  value: "",
};

const PASSWORD_FIELD: FormField = {
  title: "senha",
  type: "password",
  value: "",
};

const mockProducts: Product.Payload[] = [
  { amount: 7, name: "Product 1", purchaseValue: 25, saleValue: 40 },
  { amount: 12, name: "Product 2", purchaseValue: 35, saleValue: 60 },
  { amount: 4, name: "Product 3", purchaseValue: 20, saleValue: 30 },
  { amount: 8, name: "Product 4", purchaseValue: 40, saleValue: 55 },
  { amount: 5, name: "Product 5", purchaseValue: 30, saleValue: 45 },
  { amount: 10, name: "Product 6", purchaseValue: 15, saleValue: 25 },
  { amount: 6, name: "Product 7", purchaseValue: 28, saleValue: 42 },
  { amount: 15, name: "Product 8", purchaseValue: 22, saleValue: 38 },
  { amount: 3, name: "Product 9", purchaseValue: 18, saleValue: 33 },
  { amount: 9, name: "Product 10", purchaseValue: 32, saleValue: 48 },
  { amount: 11, name: "Product 11", purchaseValue: 27, saleValue: 50 },
  { amount: 14, name: "Product 12", purchaseValue: 33, saleValue: 52 },
  { amount: 2, name: "Product 13", purchaseValue: 19, saleValue: 28 },
  { amount: 13, name: "Product 14", purchaseValue: 38, saleValue: 58 },
  { amount: 17, name: "Product 15", purchaseValue: 23, saleValue: 36 },
  { amount: 1, name: "Product 16", purchaseValue: 14, saleValue: 22 },
  { amount: 19, name: "Product 17", purchaseValue: 29, saleValue: 46 },
  { amount: 16, name: "Product 18", purchaseValue: 26, saleValue: 43 },
  { amount: 20, name: "Product 19", purchaseValue: 37, saleValue: 54 },
  { amount: 18, name: "Product 20", purchaseValue: 21, saleValue: 32 },
];
const mockCharges: Charge.Payload[] = [
  { name: "Encargo 1", value: 45.5, type: 0 },
  { name: "Encargo 2", value: 12, type: 1 },
  { name: "Encargo 3", value: 78.2, type: 0 },
  { name: "Encargo 4", value: 5.7, type: 1 },
  { name: "Encargo 5", value: 30, type: 0 },
  { name: "Encargo 6", value: 91.8, type: 1 },
  { name: "Encargo 7", value: 17.3, type: 0 },
  { name: "Encargo 8", value: 64, type: 1 },
  { name: "Encargo 9", value: 3.6, type: 0 },
  { name: "Encargo 10", value: 50, type: 1 },
  { name: "Encargo 11", value: 22.4, type: 0 },
  { name: "Encargo 12", value: 79, type: 1 },
  { name: "Encargo 13", value: 8.9, type: 0 },
  { name: "Encargo 14", value: 36, type: 1 },
  { name: "Encargo 15", value: 65.2, type: 0 },
  { name: "Encargo 16", value: 11, type: 1 },
  { name: "Encargo 17", value: 43.7, type: 0 },
  { name: "Encargo 18", value: 70, type: 1 },
  { name: "Encargo 19", value: 2.5, type: 0 },
  { name: "Encargo 20", value: 88, type: 1 },
];
const FORM_FIELDS: FormField[] = [USER_FIELD, PASSWORD_FIELD];

const Login = () => {
  const { isAuthenticated, login } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, []);

  const onSubmitForm = useCallback(
    async (formData: FormData) => {
      console.debug("Login form", "data:", formData);

      const user = formData[USER_FIELD.title] as string;
      const password = formData[PASSWORD_FIELD.title] as string;

      // inserindo dados mockados
      try {
        await login(user, password);

        mockProducts.forEach(async (p) => {
          try {
            await createProduct(p);
          } catch (err) {
            console.log(err);
          }
        });

        mockCharges.forEach(async (c) => {
          try {
            await createCharge(c);
          } catch (err) {
            console.log(err);
          }
        });

        navigate("/home");
      } catch (err) {
        console.debug("LOGIN", "error: ", err);
      }
    },
    [isAuthenticated],
  );

  return (
    <>
      {!isAuthenticated ? (
        <S.Overlay>
          <S.LoginForm>
            <label>Analisale</label>

            <Form
              fields={FORM_FIELDS}
              buttonLabel="Login"
              onSubmit={onSubmitForm}
            ></Form>
          </S.LoginForm>
        </S.Overlay>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Login;
