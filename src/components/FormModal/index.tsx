import { FC } from "react";
import * as S from "./styles";
import useModal from "../../context/ModalContext/useModal";

interface FormModalProps {
  title: string;
  children: React.ReactNode;
}

const FormModal: FC<FormModalProps> = ({ children, title }) => {
  const { handleModalContent } = useModal();
  return (
    <>
      <S.Header>
        <label>{title}</label>

        <button type="button" onClick={() => handleModalContent(false)}>
          X
        </button>
      </S.Header>

      <S.Body>{children}</S.Body>
    </>
  );
};

export default FormModal;
