"use client";

import { getPricingSection } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import CustomStore from "./store/CustomStore";
import PriceList from "./price-list/PriceList";
import SubscriptionSection from "./subscription/SubscriptionSection";
import SingleColumnSection from "../common/SingleColumnSection";
import { Box, Typography } from "@mui/material";

export default function PricingSection() {
  const { lang } = useLanguage();
  const pricingSection = getPricingSection(lang);

  if (!pricingSection) {
    return null;
  }

  const renderContent = () => {
    switch (pricingSection.type) {
      case "PRICING_STORE":
        return <CustomStore />;
      case "PRICING_LIST":
        return <PriceList />;
      case "PRICING_PACKAGES":
        return <SubscriptionSection />;
      default:
        return null;
    }
  };

  return (
    <SingleColumnSection description={pricingSection.text}>
      <Box width="100%" display="flex" flexDirection="column" gap={4} mt={6}>
        {renderContent()}

        {/* Note */}
        <Typography
          color="text.secondary"
          variant="body2"
          sx={{ maxWidth: 600, mx: "auto", fontStyle: "italic" }}
        >
          {pricingSection.note}
        </Typography>
      </Box>
    </SingleColumnSection>
  );
}
