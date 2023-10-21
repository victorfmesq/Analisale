export interface ModalProviderProps {
  children: React.ReactNode;
}

export interface ModalContextProps {
  isOpen: boolean;
  handleModalContent(isVisible: boolean, content?: React.ReactNode): void;
}
