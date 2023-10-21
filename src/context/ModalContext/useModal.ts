import { ModalContext } from ".";
import { ModalContextProps } from "./types";
import { useContext } from "react";

const useModal = () => {
  return <ModalContextProps>useContext(ModalContext);
};

export default useModal;
