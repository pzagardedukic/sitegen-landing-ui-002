import { Box } from "@mui/material";
import React from "react";

export type OptionSelectorProps = {
  options: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  renderOption: (
    option: string,
    isSelected: boolean,
    onClick: () => void
  ) => React.ReactNode;
};

export default function OptionSelector({
  options,
  selectedIndex,
  onSelect,
  renderOption,
}: OptionSelectorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        gap: 2,
      }}
    >
      {options.map((option, index) =>
        renderOption(option, selectedIndex === index, () => onSelect(index))
      )}
    </Box>
  );
}
