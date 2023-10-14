import styled from "styled-components";

const BaseDiv = styled.div`
  display: flex;
  border-radius: 5px;
  padding: 10px;
  background-color: darkgray;
`;

export const Container = styled(BaseDiv)`
  flex-direction: column;
  height: 100vh;
  background-color: #333;
  border-radius: 0px;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5));
  padding: 10px;
  gap: 20px;
`;

export const Header = styled(BaseDiv)`
  align-items: center;
  height: 10%;
  padding: 0px 10px;
`;

export const Body = styled(BaseDiv)`
  flex: 1;
`;
