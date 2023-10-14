import React, { FC, useMemo, useState } from "react";
import Drawer from "../Drawer";

import * as S from "./styles";

interface MenuProps {
  children: React.ReactNode | undefined;
}

const MIN_DRAWER_WIDTH = 80;
const MAX_DRAWER_WIDTH = 240;

const Menu: FC<MenuProps> = ({ children }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(true);

  const contentPadding = useMemo(
    () => (isOpenDrawer ? MAX_DRAWER_WIDTH : MIN_DRAWER_WIDTH),
    [isOpenDrawer],
  );

  return (
    <S.Container>
      <div
        onMouseEnter={() => setIsOpenDrawer(true)}
        onMouseLeave={() => setIsOpenDrawer(false)}
      >
        <Drawer
          isOpen={isOpenDrawer}
          closedWidth={MIN_DRAWER_WIDTH}
          openWidth={MAX_DRAWER_WIDTH}
        ></Drawer>
      </div>

      <S.Content paddingLeft={contentPadding}>{children}</S.Content>
    </S.Container>
  );
};

export default Menu;
