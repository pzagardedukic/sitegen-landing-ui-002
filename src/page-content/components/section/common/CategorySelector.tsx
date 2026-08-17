import OptionSelector from "@/components/common/OptionSelector";
import { useLanguage } from "@/core/runtime";
import { getButtonTranslation } from "@/core/translations";
import { Button } from "@mui/material";

type CategorySelectorProps = {
  categories: string[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
};

export default function CategorySelector({
  categories,
  selectedIndex,
  onSelectIndex,
}: CategorySelectorProps) {
  const { lang } = useLanguage();
  const allLabel = getButtonTranslation(lang).all;
  const options = [allLabel, ...categories];

  return (
    <OptionSelector
      options={options}
      selectedIndex={selectedIndex}
      onSelect={onSelectIndex}
      renderOption={(category, isSelected, handleClick) => (
        <Button
          key={category}
          onClick={handleClick}
          disableRipple
          sx={(theme) => ({
            borderRadius: 999,
            textTransform: "uppercase",
            px: 3,
            py: 1,
            border: isSelected
              ? `1px solid ${theme.palette.grey[400]}`
              : "none",
            backgroundColor: isSelected
              ? theme.palette.background.paper
              : "transparent",
            color: isSelected
              ? theme.palette.text.primary
              : theme.palette.text.secondary,
            boxShadow: isSelected ? 1 : "none",
            "&:hover": {
              backgroundColor: isSelected ? "#f9f9f9" : "transparent",
            },
          })}
        >
          {category}
        </Button>
      )}
    />
  );
}
