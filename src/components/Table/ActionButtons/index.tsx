import { Edit, Delete } from "styled-icons/material";
import IconButton from "../../common/Button";

interface ActionButtonsProps {
  enableEdit: boolean;
  enableDelete: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  enableDelete,
  enableEdit,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "5px",
      }}
    >
      {enableEdit && (
        <IconButton
          isCompressed
          leftIcon={<Edit size={15} />}
          color={"lightgray"}
          onClick={onEdit}
        />
      )}

      {enableDelete && (
        <IconButton
          isCompressed
          color={"lightgray"}
          leftIcon={<Delete size={15} color="DarkRed" />}
          onClick={onDelete}
        />
      )}
    </div>
  );
};

export default ActionButtons;
