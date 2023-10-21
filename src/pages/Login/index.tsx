import Form from "../../components/common/Form";
import * as S from "./styles";

const FORM_FIELDS = [
  {
    title: "usuário",
    type: "text",
    value: "",
  },
  {
    title: "senha",
    type: "text",
    value: "",
  },
];

const Login = () => {
  return (
    <S.Overlay>
      <S.LoginForm>
        <label>Analisale</label>

        <Form
          fields={FORM_FIELDS}
          buttonLabel="Login"
          onSubmit={() => console.log("Login")}
        ></Form>
      </S.LoginForm>
    </S.Overlay>
  );
};

export default Login;
