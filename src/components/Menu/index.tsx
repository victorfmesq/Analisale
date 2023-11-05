import React, { FC, useMemo, useState } from "react";
import Drawer from "../Drawer";
import { isMobile } from "react-device-detect";
import { Menu as MenuIcon, MenuOpen } from "@styled-icons/material";

import * as S from "./styles";
import IconButton from "../common/Button";

interface MenuProps {
  children: React.ReactNode | undefined;
}

const MIN_DRAWER_WIDTH = isMobile ? 0 : 80;
const MAX_DRAWER_WIDTH = 240;

const Menu: FC<MenuProps> = ({ children }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(
    isMobile ? false : true,
  );

  const contentPadding = useMemo(
    () => (isOpenDrawer ? MAX_DRAWER_WIDTH : MIN_DRAWER_WIDTH),
    [isOpenDrawer],
  );

  return (
    <S.Container>
      {isMobile && (
        <S.HeaderMobileContainer>
          <IconButton
            isCompressed
            text=""
            rightIcon={
              isOpenDrawer ? <MenuOpen size={20} /> : <MenuIcon size={20} />
            }
            onClick={() => setIsOpenDrawer((current) => !current)}
          />
        </S.HeaderMobileContainer>
      )}

      <div
        onMouseEnter={() => setIsOpenDrawer(true)}
        onMouseLeave={() => setIsOpenDrawer(false)}
      >
        <Drawer
          isOpen={isOpenDrawer}
          closedWidth={MIN_DRAWER_WIDTH}
          openWidth={MAX_DRAWER_WIDTH}
        />
      </div>

      <S.Content paddingLeft={!isMobile ? contentPadding : 0}>
        {children}
      </S.Content>
    </S.Container>
  );
};

export default Menu;
