import { FC } from "react";
import * as S from "./styles";
import isNullOrUndefinedOrEmpty from "../../../utils/isNullOrUndefinedOrEmpty";

interface IconButtonProps {
  isCompressed: boolean;
  onClick: () => void;
  text?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isFulfilled?: boolean;
  color?: string;
}

const IconButton: FC<IconButtonProps> = ({
  onClick,
  text,
  leftIcon,
  rightIcon,
  isCompressed,
  isFulfilled,
  color,
}) => {
  return (
    <S.Button
      color={color}
      onClick={onClick}
      isFulfilled={isFulfilled}
      isCompressed={isCompressed}
    >
      {leftIcon && (
        <S.LeftIcon isCompressed={isCompressed}>{leftIcon}</S.LeftIcon>
      )}

      {!isNullOrUndefinedOrEmpty(text) && (
        <S.Text isCompressed={isCompressed}>{text}</S.Text>
      )}

      {rightIcon && (
        <S.RightIcon isCompressed={isCompressed}>{rightIcon}</S.RightIcon>
      )}
    </S.Button>
  );
};

IconButton.defaultProps = {
  leftIcon: undefined,
  rightIcon: undefined,
  isFulfilled: false,
  isCompressed: false,
  text: undefined,
  color: undefined,
};

export default IconButton;
