import styled from "styled-components";

export const Container = styled.div<{
  width?: string;
  heigth?: string;
  column?: boolean;
}>`
  width: ${({ width }) => width};
  height: ${({ heigth }) => heigth};
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: center;
  padding: 20px;
  background-color: #fff;
  min-height: 300px;
  min-width: 300px;
  /* background-color: #d9d9d9; */
  border-radius: 6px;
`;

export const ChartTitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const TooltipWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Intro = styled.p`
  font-style: italic;
  color: #555;
  margin-bottom: 8px;
`;

export const InsightsWrapper = styled.div`
  margin-top: 10px;
`;

export const Insight = styled.p<{ color?: string }>`
  margin: 5px 0;
  font-size: 14px;
  color: ${(props) => props.color ?? " #333"};
`;
