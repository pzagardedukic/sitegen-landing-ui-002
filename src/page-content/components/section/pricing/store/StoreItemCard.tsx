import HoverZoomImage from "@/components/image/HoverZoomImage";
import { Box, Typography, Paper } from "@mui/material";
import PriceValue from "../common/PriceValue";
import DiscountBadge from "../common/DiscountBadge";
import StatusBadge from "../common/StatusBadge";
import { stripRichText, truncateWordSafe } from "@/core/utils";
import { PriceUnitType, PricingItemStatus } from "@/core/types";

type StoreItemCardProps = {
  image?: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  unit?: PriceUnitType;
  onAgreement: boolean;
  discountedValue: string;
  status?: PricingItemStatus;
};

export default function StoreItemCard({
  image,
  title,
  description,
  price,
  currency,
  unit,
  onAgreement,
  discountedValue,
  status,
}: StoreItemCardProps) {
  const truncatedText = stripRichText(truncateWordSafe(description, 100));

  return (
    <Paper
      elevation={2}
      className="zoom-image-parent"
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textAlign: "center",
        "&:hover": { cursor: "pointer" },
      }}
    >
      {/* Status */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 2,
        }}
      >
        <StatusBadge status={status} />
      </Box>

      {/* Discount */}
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

      {/* Image */}
      <HoverZoomImage
        src={image}
        alt={title}
        zoomOnParentHover
        sx={{
          width: "100%",
          height: 180,
          objectFit: "cover",
        }}
      />

      {/* Content */}
      <Box px={2} py={2} flexGrow={1}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          {truncatedText}
        </Typography>
      </Box>

      {/* Price */}
      <Box px={2} py={1} borderTop="1px solid #f0f0f0" mt="auto">
        <PriceValue
          value={price}
          currency={currency}
          unit={unit}
          onAgreement={onAgreement}
          discountedValue={discountedValue}
        />
      </Box>
    </Paper>
  );
}
