import { Box, Typography, Paper, Button, Chip } from "@mui/material";
import PriceValue from "../common/PriceValue";
import DiscountBadge from "../common/DiscountBadge";
import { stripRichText } from "@/core/utils";
import { PriceUnitType } from "@/core/types";
import { getPricingTranslation_packagesNoImages } from "@/core/translations";
import { useLanguage } from "@/core/runtime";

export type SubscriptionPlan = {
  id: string;
  name: string;
  subtitle?: string;
  price: string;
  currency: string;
  unit?: PriceUnitType;
  onAgreement: boolean;
  discountedValue: string;
  features: string[];
  highlight?: boolean;
};

type Props = {
  plan: SubscriptionPlan;
  onSelect: (title: string) => void;
};

export default function SubscriptionCard({ plan, onSelect }: Props) {
  const {
    name,
    subtitle,
    price,
    currency,
    unit,
    onAgreement,
    discountedValue,
    features,
    highlight = false,
  } = plan;

  const { lang } = useLanguage();
  const t = getPricingTranslation_packagesNoImages(lang);

  const cleanSubtitle = subtitle ? stripRichText(subtitle) : "";

  return (
    <Paper
      elevation={highlight ? 6 : 2}
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textAlign: "center",
        borderTop: highlight
          ? (theme) => `4px solid ${theme.palette.primary.main}`
          : "none",
      }}
    >
      {/* Discount badge */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,
        }}
      >
        <DiscountBadge price={price} discountedValue={discountedValue} />
      </Box>

      {/* Recommended */}
      {highlight && (
        <Box
          sx={{
            position: "absolute",
            top: 15.5,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <Chip label={t.items.recommended} color="primary" size="small" />
        </Box>
      )}

      {/* Header (SAFE ZONE for badge) */}
      <Box px={3} pt={8} pb={2} minHeight={90}>
        <Typography variant="h6" fontWeight={600}>
          {name}
        </Typography>

        {cleanSubtitle && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, wordBreak: "break-word" }}
          >
            {cleanSubtitle}
          </Typography>
        )}
      </Box>

      {/* Price */}
      <Box
        px={3}
        py={2}
        sx={{
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <PriceValue
          value={price}
          currency={currency}
          unit={unit}
          onAgreement={onAgreement}
          discountedValue={discountedValue}
        />
      </Box>

      {/* Features */}
      <Box px={3} py={2} flexGrow={1}>
        {features.map((feature, i) => (
          <Typography
            key={i}
            variant="body2"
            color="text.secondary"
            sx={{ py: 0.5, wordBreak: "break-word" }}
          >
            {feature}
          </Typography>
        ))}
      </Box>

      {/* CTA */}
      <Box p={3} pt={1}>
        <Button
          fullWidth
          variant={highlight ? "contained" : "outlined"}
          sx={{ fontWeight: 600 }}
          onClick={() => onSelect(plan.name)}
        >
          {t.items.callToAction}
        </Button>
      </Box>
    </Paper>
  );
}
