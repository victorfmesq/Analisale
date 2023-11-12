import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Form from "../../components/common/Form";
import * as S from "./styles";
import { ROUTES } from "../../routes";
import React, { useState, useCallback, useEffect } from "react";
import { FormData, FormField } from "../../components/common/Form/types";
import useSession from "../../context/SessionContext/useSession";

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

const FORM_FIELDS: FormField[] = [USER_FIELD, PASSWORD_FIELD];

const Login = () => {
  const { isAuthenticated, login } = useSession();
  const navigate = useNavigate();

  const onSubmitForm = useCallback(
    (formData: FormData) => {
      console.log(formData);
      // TODO: implementar verificação de autenticação
      if (
        formData[USER_FIELD.title] === "victor@victor.com" &&
        formData[PASSWORD_FIELD.title] === "victor"
      ) {
        navigate("/home");
        login();
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
