import { Box } from "@mui/material";

type DiscountBadgeProps = {
  price: string;
  discountedValue?: string;
};

export default function DiscountBadge({
  price,
  discountedValue,
}: DiscountBadgeProps) {
  if (!price || !discountedValue) return null;

  const original = Number(price);
  const discounted = Number(discountedValue);

  if (
    Number.isNaN(original) ||
    Number.isNaN(discounted) ||
    discounted >= original
  ) {
    return null;
  }

  const discountPercent = Math.round(
    ((original - discounted) / original) * 100
  );

  if (discountPercent <= 0) return null;

  return (
    <Box
      sx={{
        backgroundColor: "error.main",
        color: "common.white",
        px: 1.2,
        py: 1,
        borderRadius: 1,
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1,
        whiteSpace: "nowrap",
        alignSelf: "center",
      }}
    >
      - {discountPercent} %
    </Box>
  );
}
