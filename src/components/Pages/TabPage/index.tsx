import { FC } from "react";
import * as S from "./styles";
import IconButton from "../../common/Button";

interface TabPagesProps {
  children: React.ReactNode;
}

const TabPage: FC<TabPagesProps> = ({ children }) => {
  return <S.Container>{children}</S.Container>;
};

export default TabPage;
