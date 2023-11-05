import { FC } from "react";
import * as S from "./styles";
import useSession from "../../../context/SessionContext/useSession";

interface TabPagesProps {
  children: React.ReactNode;
}

const TabPage: FC<TabPagesProps> = ({ children }) => {
  const { isAuthenticated } = useSession();

  return <S.Container>{children}</S.Container>;
};

export default TabPage;
