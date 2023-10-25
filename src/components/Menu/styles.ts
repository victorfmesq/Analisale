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

export const HeaderMobileContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.8;
  height: 65px;
  width: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  z-index: 1000;
  border-radius: 50%;
`;
