import { Chip } from "@mui/material";
import { PricingItemStatus } from "@/core/types";
import { useLanguage } from "@/core/runtime";
import { getPriceTranslation } from "@/core/translations";

type StatusBadgeProps = {
  status?: PricingItemStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { lang } = useLanguage();
  const t = getPriceTranslation(lang);

  if (status === "COMING_SOON") {
    return <Chip label={t.comingSoon} color="info" size="small" />;
  }

  if (status === "UNAVAILABLE") {
    return <Chip label={t.unavailable} color="default" size="small" />;
  }

  return null;
}
