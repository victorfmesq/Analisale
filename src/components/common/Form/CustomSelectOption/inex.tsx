import React, { useState } from "react";

const CustomSelectOption = (props) => {
  const { innerProps, label } = props;
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div {...innerProps}>
      <span>{label}</span>
      <input
        type="number"
        min="0"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
    </div>
  );
};

export default CustomSelectOption;
