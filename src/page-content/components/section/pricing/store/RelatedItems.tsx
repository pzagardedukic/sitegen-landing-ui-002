"use client";

import { getPricingItems } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { Box, Typography } from "@mui/material";
import HoverZoomImage from "@/components/image/HoverZoomImage";
import { useRouter } from "next/navigation";
import { getPageSlugByKey, getPricingSlugById } from "@/core/static";
import { getPricingTranslation_priceListWithImages } from "@/core/translations";

export default function RelatedItems({ itemIds }: { itemIds: number[] }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = getPricingTranslation_priceListWithImages(lang);

  const relatedItems = getPricingItems(lang)
    .filter((item) => itemIds.includes(item.id))
    .slice(0, 5);

  const handleItemClick = (id: number) => {
    router.push(`/${getPageSlugByKey("pricing")}/${getPricingSlugById(id)}`);
  };

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Typography variant="h2" color="text.primary" alignSelf="center">
        {t.relatedItemsTitle}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {relatedItems.map((item) => (
          <Box
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            sx={{
              flex: {
                xs: "1 1 calc(50% - 4px)",
                sm: "1 1 calc(33.333% - 6px)",
                md: "1 1 180px",
              },
              maxWidth: {
                xs: "calc(50% - 4px)",
                sm: "calc(33.333% - 6px)",
                md: "180px",
              },
              minWidth: 0,
              cursor: "pointer",
            }}
          >
            <HoverZoomImage
              src={item.images[0] ?? ""}
              width="100%"
              sx={{
                borderRadius: 2,
                width: "100%",
                height: {
                  xs: "160px",
                  sm: "170px",
                  md: "180px",
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
