"use client";

import { useMemo } from "react";
import { Box } from "@mui/material";
import SubscriptionCard, { SubscriptionPlan } from "./SubscriptionCard";
import { getPricingItems } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { useRouter } from "next/navigation";
import { getPageSlugByKey } from "@/core/static";
import { getPricingTranslation_packagesNoImages } from "@/core/translations";

export default function SubscriptionSection() {
  const { lang } = useLanguage();
  const router = useRouter();
  const t = getPricingTranslation_packagesNoImages(lang);

  const pricingItems = getPricingItems(lang);
  const plans: SubscriptionPlan[] = useMemo(() => {
    return pricingItems.map((item) => ({
      id: String(item.id),
      name: item.title,
      subtitle: item.text || "",
      price: item.price.value,
      currency: item.price.currency,
      unit: item.price.unit,
      onAgreement: item.price.onAgreement,
      discountedValue: item.price.discountedValue ?? "",
      features: item.features.map((feature) => feature.value).filter(Boolean),
      highlight: item.recommended,
    }));
  }, [pricingItems]);

  const handleSelect = (title: string) => {
    router.push(
      `/${getPageSlugByKey("contact")}?subject=${encodeURIComponent(
        t.acquirementSubject,
      )}: ${encodeURIComponent(title)}`,
    );
  };

  return (
    <Box mb={6} mt={3}>
      <Box display="flex" flexWrap="wrap" gap={4} mt={2}>
        {plans.map((plan) => (
          <Box key={plan.id} flex="1 1 300px" maxWidth="340px">
            <SubscriptionCard plan={plan} onSelect={handleSelect} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
