import styled from "styled-components";

export const Container = styled.div<{ small: boolean }>`
  width: ${({ small }) => (small ? "50px" : "100px")};
  height: ${({ small }) => (small ? "50px" : "100px")};
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
