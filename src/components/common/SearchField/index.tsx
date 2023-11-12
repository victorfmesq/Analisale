import React, { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";

interface SearchFieldProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  fetchData: (value: any) => Promise<void>;
  width?: string;
}

const REQUEST_DELAY = 2000;

const SearchField: React.FC<SearchFieldProps> = ({
  label,
  value,
  width,
  setValue,
  fetchData,
}) => {
  const [searchTimeoutId, setSearchTimeoutId] = useState<number | null>(null);

  const requestCall = useCallback(
    async (term: string) => {
      console.log("Fazendo a requisição com:", term);
      await fetchData(term);
    },
    [fetchData],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;
    setValue(inputValue);

    // Cancela o timeout anterior
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
    }

    // Inicia um novo timeout
    const newTimeoutId = setTimeout(() => {
      requestCall(inputValue);
    }, REQUEST_DELAY);

    setSearchTimeoutId(newTimeoutId);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <TextField
        id="search-bar"
        label={label}
        variant="outlined"
        size="small"
        value={value}
        onChange={handleInputChange}
        sx={{
          width: `100%`,
          "& label.Mui-focused": {
            color: "#444",
          },
          "& .MuiOutlinedInput-root": {
            "&:hover": {
              borderColor: "#888",
            },
            "&.Mui-focused": {
              borderColor: "#333",
            },
            "& .MuiOutlinedInput-input": {
              color: "#222",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00000071",
              color: "#222",
            },
          },
        }}
      />
    </div>
  );
};

export default SearchField;
