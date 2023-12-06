import styled from "styled-components";

export const Container = styled.div<{ width?: string }>`
  width: ${({ width }) => width ?? "100%"};
  height: ${({ width }) => width ?? "300px"};
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #d9d9d9;
  border-radius: 6px;
`;
