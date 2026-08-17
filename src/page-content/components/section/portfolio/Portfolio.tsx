import { getPortfolioItems, getPortfolioSection } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { Box } from "@mui/material";
import { useState } from "react";
import CategorySelector from "../common/CategorySelector";
import PortfolioPreviewCard from "./PortfolioPreviewCard";
import { usePagination } from "@/core/react";
import PaginationControls from "@/components/button/PaginationControls";
import { getPageSlugByKey, getPortfolioSlugById } from "@/core/static";
import { withBasePath } from "@/core/static";

type PortfolioProps = {
  maxCnt?: number;
};

export default function Portfolio({ maxCnt }: PortfolioProps) {
  const { lang } = useLanguage();

  const portfolioSection = getPortfolioSection(lang);
  const portfolioItems = getPortfolioItems(lang);
  const categories = portfolioSection?.categories ?? [];

  // Store selected category index (0 = "All")
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  // Compute selected category value (undefined means "All")
  const selectedCategory =
    selectedIndex === 0 ? undefined : categories[selectedIndex - 1];
  const filteredItems = selectedCategory
    ? portfolioItems.filter((item) => item.category.includes(selectedCategory))
    : portfolioItems;

  // We don't want pagination if maxCnt is set
  const { page, setPage, pageCount, paginatedItems, resetPage } = usePagination(
    filteredItems,
    6,
  );
  const displayedItems = maxCnt
    ? filteredItems.slice(0, maxCnt)
    : paginatedItems;

  return (
    <>
      {/* Categories */}
      <Box display="flex" justifyContent="center" mt={1}>
        <CategorySelector
          categories={categories}
          selectedIndex={selectedIndex}
          onSelectIndex={(index) => {
            setSelectedIndex(index);
            resetPage();
          }}
        />
      </Box>

      {/* Cards */}
      <Box display="flex" flexWrap="wrap" gap={4} px={2} py={4} mt={1}>
        {displayedItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              flex: "1 1 300px",
              maxWidth: "320px",
            }}
          >
            <PortfolioPreviewCard
              key={item.id}
              title={item.title}
              text={item.text}
              image={item.images[0]}
              href={withBasePath(
                `/${getPageSlugByKey("portfolio")}/${getPortfolioSlugById(item.id)}`,
              )}
            />
          </Box>
        ))}
      </Box>

      {!maxCnt && pageCount > 1 && (
        <PaginationControls
          page={page}
          pageCount={pageCount}
          onChange={setPage}
        />
      )}
    </>
  );
}
