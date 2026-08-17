import { getPricingItems, getPricingSection } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { Box, Typography, Divider } from "@mui/material";
import CategorySelector from "../../common/CategorySelector";
import { useMemo, useState } from "react";
import PriceValue from "../common/PriceValue";
import { stripRichText } from "@/core/utils";

export default function PriceList() {
  const { lang } = useLanguage();

  const pricingSection = getPricingSection(lang);
  const pricingItems = getPricingItems(lang);
  const categories = pricingSection?.categories ?? [];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const selectedCategory =
    selectedIndex === 0 ? undefined : categories[selectedIndex - 1];

  const filteredItems = selectedCategory
    ? pricingItems.filter((item) => item.category.includes(selectedCategory))
    : pricingItems;

  const groupedItems = useMemo(() => {
    return filteredItems.reduce<Record<string, typeof filteredItems>>(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      },
      {},
    );
  }, [filteredItems]);  

  return (
    <>
      <Box display="flex" justifyContent="center" mb={4}>
        <CategorySelector
          categories={categories}
          selectedIndex={selectedIndex}
          onSelectIndex={setSelectedIndex}
        />
      </Box>

      {Object.entries(groupedItems).map(([category, items]) => (
        <Box key={category} mb={5}>
          <Typography
            variant="h3"
            color="text.primary"
            textAlign="center"
            gutterBottom
            mb={3}
          >
            {category}
          </Typography>

          {items.map((item, i) => (
            <Box key={i} mb={2} mt={2}>
              <Divider sx={{ mb: 0.5 }} />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                gap={2}
              >
                {/* Left side: title + description */}
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{
                      wordBreak: "break-word",
                    }}
                  >
                    {item.title}
                  </Typography>

                  {item.text && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 0.5,
                        wordBreak: "break-word",
                      }}
                    >
                      {stripRichText(item.text)}
                    </Typography>
                  )}
                </Box>

                {/* Right side: price wins */}
                <Box
                  sx={{
                    flexShrink: 0,
                    minWidth: 140,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  <PriceValue
                    value={item.price.value}
                    currency={item.price.currency}
                    unit={item.price.unit}
                    onAgreement={item.price.onAgreement}
                    discountedValue={item.price.discountedValue ?? ""}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
}
