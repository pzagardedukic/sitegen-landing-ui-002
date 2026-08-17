"use client";

import { getPricingItems, getPricingSection } from "@/core/runtime";
import { Box, Button, Divider, Typography } from "@mui/material";
import SectionDescription from "../common/SectionDescription";
import { CustomGallery } from "../common/CustomGallery";
import { useLanguage } from "@/core/runtime";
import RelatedItems from "./store/RelatedItems";
import { FALLBACK_IMAGE } from "@/core/static";
import PriceValue from "./common/PriceValue";
import DiscountBadge from "./common/DiscountBadge";
import StatusBadge from "./common/StatusBadge";
import { getPageSlugByKey } from "@/core/static";
import { getPricingTranslation_priceListWithImages } from "@/core/translations";
import ShareActions from "../common/ShareActions";
import { useBackToList } from "@/core/react";

export default function PricingItemSection({ id }: { id: number }) {
  const { lang } = useLanguage();
  const pricingSection = getPricingSection(lang);

  if (!pricingSection) {
    return null;
  }

  const handleBackToPricing = useBackToList(`/${getPageSlugByKey("pricing")}`);

  // NOTE Currently, only one type of pricing section has more info.
  if (pricingSection.type !== "PRICING_STORE") {
    return null;
  }

  const pricingItem = getPricingItems(lang).find((item) => item.id === id);

  if (!pricingItem) {
    return null;
  }

  const pricingItemTranslation =
    getPricingTranslation_priceListWithImages(lang).items;

  const relatedItemIds = getPricingItems(lang)
    .filter(
      (item) =>
        item.id !== pricingItem.id && item.category === pricingItem.category,
    )
    .map((item) => item.id);

  return (
    <Box display="flex" flexDirection="column" gap={4} flex={1}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
        flex={1}
        mb={4}
      >
        <Box
          width={{ xs: "100%", md: "440px" }}
          flexDirection="column"
          display="flex"
          gap={2}
        >
          <Box
            component="img"
            src={pricingItem.images[0] || FALLBACK_IMAGE}
            alt={pricingItem.title}
            loading="lazy"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              objectFit: "cover",
            }}
          />
          <CustomGallery
            items={pricingItem.images}
            align="left"
            itemWidth="140px"
            gap="10px"
          />
        </Box>

        <Box flex={1} gap={2} display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            pr={2}
          >
            <Typography
              variant="h2"
              color="text.primary"
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              {pricingItemTranslation.description}
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <StatusBadge status={pricingItem.status} />

              <DiscountBadge
                price={pricingItem.price.value}
                discountedValue={pricingItem.price.discountedValue}
              />
            </Box>
          </Box>

          <Divider />

          <SectionDescription description={pricingItem.text} />

          <Box display="flex" flexDirection="column" gap={1} mb={2}>
            {pricingItem.features.map((feature, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                gap={{ xs: 0.5, sm: 1 }}
              >
                <Typography
                  flex={{ xs: 1, sm: 0.15 }}
                  variant="body2"
                  color="text.secondary"
                  fontStyle="italic"
                >
                  {feature.label}:
                </Typography>
                <Typography
                  flex={1}
                  variant="body2"
                  color="text.secondary"
                  fontStyle="italic"
                >
                  {feature.value}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: 1, sm: 0 }}
            px={1}
            mt={-1}
          >
            <Typography variant="body2" color="text.primary">
              {pricingItemTranslation.price}:
            </Typography>

            <PriceValue
              value={pricingItem.price.value}
              currency={pricingItem.price.currency}
              unit={pricingItem.price.unit}
              onAgreement={pricingItem.price.onAgreement}
              discountedValue={pricingItem.price.discountedValue}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 4,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            fontSize: "14px",
            width: { xs: "100%", sm: "auto" },
          }}
          onClick={handleBackToPricing}
        >
          {pricingItemTranslation.goBackButton}
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "flex-end" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <ShareActions title={pricingItem.title} />
        </Box>
      </Box>

      {relatedItemIds.length > 0 && (
        <Box display="flex" flexDirection="column" gap={6} mb={4}>
          <Divider
            sx={{
              position: "relative",
              width: "100vw",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          <RelatedItems itemIds={relatedItemIds} />
        </Box>
      )}
    </Box>
  );
}
