import React from "react";

interface CellListProps {
  items: Array<any>;
}

const CellList: React.FC<CellListProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return <div>Ausente</div>;
  }

  return (
    <ul>
      {items.map((item, index) => {
        return (
          <li key={index}>
            {typeof item === "object" ? `${item.id} - ${item.amount}` : item}
          </li>
        );
      })}
    </ul>
  );
};

export default CellList;
