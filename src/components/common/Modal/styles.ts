import styled from "styled-components";

export const ModalWrapper = styled.div<{
  height?: string;
  width?: string;
}>`
  display: flex;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  min-width: 350px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  gap: 5px;
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
`;
