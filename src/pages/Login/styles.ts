import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
`;

export const LoginForm = styled.div`
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 500px;
  z-index: 900;
  background-color: lightgray;
  border-radius: 5px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);

  > label {
    font-size: 24px; /* Tamanho da fonte */
    font-weight: bold; /* Texto em negrito */
    text-align: center; /* Alinhamento centralizado */
    color: #333; /* Cor do texto (pode ser personalizada) */
    margin-bottom: 20px; /* Espaçamento inferior opcional */
  }
`;
