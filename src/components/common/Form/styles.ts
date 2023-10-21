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
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const Button = styled.button`
  height: 50px;
  width: 50%;
  margin-top: 50px;
`;
