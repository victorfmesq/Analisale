import React, { FC, createContext, useMemo, useState } from "react";
import { ModalProviderProps } from "./types";
import Modal from "../../components/common/Modal";

export const ModalContext = createContext({});

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const handleModalContent = (
    isOpen: boolean,
    content: React.ReactNode = null,
  ) => {
    setIsOpen(isOpen);

    setModalContent(isOpen ? content : null);
  };

  const value = useMemo(
    () => ({ handleModalContent, isOpen }),
    [handleModalContent, isOpen],
  );

  return (
    <ModalContext.Provider value={value}>
      <Modal isOpen={isOpen}>{modalContent}</Modal>

      {children}
    </ModalContext.Provider>
  );
};
