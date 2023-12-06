import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 5px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

export const FormLabel = styled.label`
  font-weight: bold;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const FormSelect = styled.select`
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 3px;
  /* position: relative; */

  & > div {
    display: flex;
    position: absolute; /* Adiciona posicionamento absoluto à div interna */
    top: 100%; /* Move a div interna para baixo do select */
    left: 0; /* Alinha a div interna à esquerda do select */
    width: 100%; /* Garante que a div interna tenha a largura completa do select */

    /* Adicione estilos adicionais para a div interna conforme necessário */
  }
`;

// export const StyledSelectContainer = styled.div`
//   position: relative;
//   margin-top: 10px;
// `;

export const Button = styled.button`
  height: 50px;
  width: 50%;
  margin-top: 50px;
`;

export const StyledListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

export const Label = styled.span`
  flex: 1;
  margin-right: 16px;
`;
