import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: gray;
`;

export const Content = styled.div<{ paddingLeft: number }>`
  padding-left: ${({ paddingLeft }) => `${paddingLeft}px`};
  transition: padding-left 0.3s ease-in-out;
`;
