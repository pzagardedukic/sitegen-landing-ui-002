"use client";

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Divider,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Suspense, useMemo } from "react";

import PaginationControls from "@/components/button/PaginationControls";
import { getPricingItems, getPricingSection } from "@/core/runtime";
import { getPageSlugByKey, getPricingSlugById } from "@/core/static";
import { useListFilters } from "@/core/react";
import { useLanguage } from "@/core/runtime";
import {
  getButtonTranslation,
  getPriceTranslation,
  getPricingStoreTranslation,
} from "@/core/translations";
import { stripRichText } from "@/core/utils";
import { normalizeSearchValue, paginate } from "@/core/utils";
import StoreItemCard from "./StoreItemCard";

type StorePrice = {
  value: string;
  discountedValue: string;
  onAgreement: boolean;
};

const PER_PAGE = 9;

const parsePriceValue = (value: string): number | null => {
  let normalizedValue = value.trim().replace(/\s+/g, "");

  if (!normalizedValue) {
    return null;
  }

  normalizedValue = normalizedValue.replace(/[^\d,.-]/g, "");

  const lastCommaIndex = normalizedValue.lastIndexOf(",");
  const lastDotIndex = normalizedValue.lastIndexOf(".");

  if (lastCommaIndex >= 0 && lastDotIndex >= 0) {
    normalizedValue =
      lastCommaIndex > lastDotIndex
        ? normalizedValue.replace(/\./g, "").replace(",", ".")
        : normalizedValue.replace(/,/g, "");
  } else if (lastCommaIndex >= 0) {
    const decimalPlaces = normalizedValue.length - lastCommaIndex - 1;

    normalizedValue =
      decimalPlaces > 0 && decimalPlaces <= 2
        ? normalizedValue.replace(",", ".")
        : normalizedValue.replace(/,/g, "");
  } else if (lastDotIndex >= 0) {
    const dotCount = (normalizedValue.match(/\./g) ?? []).length;
    const decimalPlaces = normalizedValue.length - lastDotIndex - 1;

    if (dotCount > 1 || decimalPlaces === 3) {
      normalizedValue = normalizedValue.replace(/\./g, "");
    }
  }

  const parsedValue = Number(normalizedValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const getComparablePrice = (price: StorePrice): number | null => {
  if (price.onAgreement) {
    return null;
  }

  return parsePriceValue(price.discountedValue) ?? parsePriceValue(price.value);
};

function CustomStoreInner() {
  const router = useRouter();
  const { lang } = useLanguage();

  const pricingSection = getPricingSection(lang);
  const pricingItems = getPricingItems(lang);
  const categories = pricingSection?.categoryOptions ?? [];
  const pricingStoreTranslation = getPricingStoreTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);
  const priceTranslation = getPriceTranslation(lang);

  const {
    searchInput,
    setSearchInput,
    searchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    sortOrder,
    setSortOrder,
    page,
    setPage,
  } = useListFilters();

  const filteredAndSortedItems = useMemo(() => {
    const normalizedSearchQuery = normalizeSearchValue(searchQuery);

    return pricingItems
      .filter((item) => {
        if (selectedCategoryId && item.categoryId !== selectedCategoryId) {
          return false;
        }

        if (!normalizedSearchQuery) {
          return true;
        }

        const searchableValue = normalizeSearchValue(
          [
            item.title,
            stripRichText(item.text),
            item.category,
            item.price.value,
            item.price.discountedValue,
            item.price.currency,
            item.price.onAgreement ? priceTranslation.onAgreement : "",
            ...item.features.flatMap((feature) => [
              feature.label,
              feature.value,
            ]),
          ].join(" "),
        );

        return searchableValue.includes(normalizedSearchQuery);
      })
      .sort((firstItem, secondItem) => {
        const firstPrice = getComparablePrice(firstItem.price);
        const secondPrice = getComparablePrice(secondItem.price);

        if (firstPrice === null && secondPrice === null) {
          return firstItem.id - secondItem.id;
        }

        if (firstPrice === null) {
          return 1;
        }

        if (secondPrice === null) {
          return -1;
        }

        const priceDifference = firstPrice - secondPrice;

        if (priceDifference === 0) {
          return firstItem.id - secondItem.id;
        }

        return sortOrder === "ascending" ? priceDifference : -priceDifference;
      });
  }, [
    pricingItems,
    searchQuery,
    selectedCategoryId,
    sortOrder,
    priceTranslation,
  ]);

  const { pageCount, currentPage, pageItems } = paginate(
    filteredAndSortedItems,
    page,
    PER_PAGE,
  );

  const handleItemClick = (id: number) => {
    router.push(`/${getPageSlugByKey("pricing")}/${getPricingSlugById(id)}`);
  };

  return (
    <Box
      component="section"
      sx={{
        px: { xs: 2, md: 6 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          size="small"
          type="search"
          label={pricingStoreTranslation.search}
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ flex: 1, minWidth: 0 }}
        />

        {categories.length > 0 && (
          <TextField
            select
            fullWidth
            size="small"
            label={pricingStoreTranslation.category}
            value={selectedCategoryId}
            onChange={(event) => setSelectedCategoryId(event.target.value)}
            sx={{ width: { xs: "100%", md: 240 }, flexShrink: 0 }}
          >
            <MenuItem value="">{buttonTranslation.all}</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        )}

        <TextField
          select
          fullWidth
          size="small"
          label={pricingStoreTranslation.sortByPrice}
          value={sortOrder}
          onChange={(event) =>
            setSortOrder(event.target.value as "ascending" | "descending")
          }
          sx={{ width: { xs: "100%", md: 260 }, flexShrink: 0 }}
        >
          <MenuItem value="ascending">
            {pricingStoreTranslation.priceAscending}
          </MenuItem>
          <MenuItem value="descending">
            {pricingStoreTranslation.priceDescending}
          </MenuItem>
        </TextField>
      </Box>

      <Divider sx={{ mt: 5, mb: 6 }} />

      <Box mb={6} mt={3}>
        {pageItems.length > 0 ? (
          <Box display="flex" flexWrap="wrap" gap={4} mt={2}>
            {pageItems.map((item) => (
              <Box
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                sx={{
                  flex: "1 1 250px",
                  maxWidth: "300px",
                }}
              >
                <StoreItemCard
                  image={item.images[0] ?? ""}
                  title={item.title}
                  description={item.text}
                  price={item.price.value}
                  unit={item.price.unit}
                  currency={item.price.currency}
                  onAgreement={item.price.onAgreement}
                  discountedValue={item.price.discountedValue}
                  status={item.status}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography color="text.secondary" textAlign="center" py={8}>
            {pricingStoreTranslation.noResults}
          </Typography>
        )}
      </Box>

      {pageCount > 1 && (
        <PaginationControls
          page={currentPage}
          pageCount={pageCount}
          onChange={setPage}
        />
      )}
    </Box>
  );
}

export default function CustomStore() {
  return (
    <Suspense fallback={null}>
      <CustomStoreInner />
    </Suspense>
  );
}
