import { Edit, Delete } from "styled-icons/material";
import IconButton from "../../common/Button";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "5px",
      }}
    >
      <IconButton
        isCompressed
        leftIcon={<Edit size={15} />}
        color={"lightgray"}
        onClick={onEdit}
      ></IconButton>

      <IconButton
        isCompressed
        color={"lightgray"}
        leftIcon={<Delete size={15} color="DarkRed" />}
        onClick={onDelete}
      ></IconButton>
    </div>
  );
};

export default ActionButtons;
