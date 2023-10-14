import styled from "styled-components";

export const DrawerContainer = styled.div<{
  isOpen: boolean;
  position?: string;
  closedWidth?: number;
  openWidth?: number;
}>`
  display: flex;
  flex-direction: column;
  width: ${({ isOpen, closedWidth, openWidth }) =>
    isOpen ? `${openWidth}px` : `${closedWidth}px`};
  height: 100vh;
  background-color: #333;
  position: fixed;
  top: 0;
  left: ${({ position }) => position === "left" && "0"};
  right: ${({ position }) => position === "right" && "0"};
  transition: width 0.3s ease-in-out;
  z-index: 999;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5));
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0px 50px;
  gap: 20px;
`;

export const Body = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0px 50px;
  gap: 20px;
`;
