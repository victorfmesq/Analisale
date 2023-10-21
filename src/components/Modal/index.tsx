import React, { FC } from "react";
import * as S from "./styles";
import useModal from "../../context/ModalContext/useModal";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, children }) => {
  const { handleModalContent } = useModal();

  return (
    <S.Overlay isOpen={isOpen} onClick={() => handleModalContent(false)}>
      <S.ModalWrapper>
        <S.ModalContent onClick={(e) => e.stopPropagation()}>
          {children}
        </S.ModalContent>
      </S.ModalWrapper>
    </S.Overlay>
  );
};

export default Modal;
