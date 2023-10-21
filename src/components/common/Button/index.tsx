import { FC } from "react";
import * as S from "./styles";

interface IconButtonProps {
  text: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick: () => void;
  isCompressed: boolean;
  isFulfilled?: boolean;
}

const IconButton: FC<IconButtonProps> = ({
  onClick,
  text,
  leftIcon,
  rightIcon,
  isCompressed,
  isFulfilled,
}) => {
  return (
    <S.Button
      onClick={onClick}
      isFulfilled={isFulfilled}
      isCompressed={isCompressed}
    >
      {leftIcon && (
        <S.LeftIcon isCompressed={isCompressed}>{leftIcon}</S.LeftIcon>
      )}
      <S.Text isCompressed={isCompressed}>{text}</S.Text>
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
};

export default IconButton;
