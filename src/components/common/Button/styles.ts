import styled from "styled-components";

export const Button = styled.button<{
  isFulfilled?: boolean;
  isCompressed?: boolean;
  background?: boolean;
}>`
  display: flex;
  width: ${({ isFulfilled }) => (isFulfilled ? "100%" : "auto")};
  justify-content: ${({ isCompressed }) =>
    isCompressed ? "center" : "initial"};
  align-items: center;
  background-color: ${({ color }) => (color ? `${color}` : "#abc")};
  color: #000;
  padding: 8px 12px;
  border: 1px solid #abb;
  border-radius: ${({ isFulfilled }) => (!isFulfilled ? "4px" : "0")};
  cursor: pointer;
  transform: scale(1);
  opacity: 0.9;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0);
  will-change: transform, opacity;

  &:hover {
    transform: scale(1.05);
    opacity: 1;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  }
`;

export const LeftIcon = styled.span<{ isCompressed?: boolean }>`
  margin-right: ${({ isCompressed }) => !isCompressed && "8px"};
`;

export const RightIcon = styled.span<{ isCompressed?: boolean }>`
  margin-left: ${({ isCompressed }) => !isCompressed && "8px"};
`;

export const Text = styled.label<{ isCompressed?: boolean }>`
  opacity: ${({ isCompressed }) => (!isCompressed ? 1 : 0)};
  display: ${({ isCompressed }) => isCompressed && "none"};
  font-size: 1rem;
  font-family: sans-serif;
  font-weight: 400;
  transition: opacity 0.6s ease-in-out;
`;
