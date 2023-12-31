import { FC, useState } from "react";

import { Logout } from "@styled-icons/material";
import { Boxes, BagCheck, CashCoin, BarChart } from "@styled-icons/bootstrap";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

import ProfilePicture from "../ProfilePictue";
import IconButton from "../common/Button";
import * as S from "./styles";
import { ROUTES } from "../../routes";
import useSession from "../../context/SessionContext/useSession";

const IMG =
  "data:image/jpeg;base64,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";

interface DrawerProps {
  isOpen: boolean;
  openWidth?: number;
  closedWidth?: number;
  shouldHide?: boolean;
  position?: "left" | "right";
}

const Drawer: FC<DrawerProps> = ({
  isOpen,
  closedWidth,
  openWidth,
  position,
}) => {
  const navigate = useNavigate();
  const { logout } = useSession();

  return (
    <S.DrawerContainer
      openWidth={openWidth}
      closedWidth={closedWidth}
      isOpen={isOpen}
      position={position}
    >
      {(!isMobile || isOpen) && (
        <>
          <S.Header>
            <ProfilePicture alt="teste" src={IMG} isSmall={!isOpen} />
          </S.Header>

          <S.Body>
            <IconButton
              onClick={() => navigate(ROUTES.products)}
              text="Produtos"
              leftIcon={<Boxes size={30} />}
              isCompressed={!isOpen}
              isFulfilled
            />

            <IconButton
              onClick={() => navigate(ROUTES.charges)}
              text="Encargos"
              leftIcon={<CashCoin size={30} />}
              isCompressed={!isOpen}
              isFulfilled
            />

            <IconButton
              onClick={() => navigate(ROUTES.sales)}
              text="Vendas"
              leftIcon={<BagCheck size={30} />}
              isCompressed={!isOpen}
              isFulfilled
            />

            <IconButton
              onClick={() => navigate(ROUTES.dashboards)}
              text="DashBoards"
              leftIcon={<BarChart size={30} />}
              isCompressed={!isOpen}
              isFulfilled
            />
          </S.Body>

          <S.Footer>
            <IconButton
              onClick={logout}
              text="Logout"
              leftIcon={<Logout size={20} />}
              isCompressed={!isOpen}
            />
          </S.Footer>
        </>
      )}
    </S.DrawerContainer>
  );
};

Drawer.defaultProps = {
  openWidth: 240,
  closedWidth: 80,
  position: "left",
};

export default Drawer;
