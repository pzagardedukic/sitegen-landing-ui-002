import { stripRichText, truncateWordSafe } from "@/core/utils";
import { Box, Typography } from "@mui/material";

type PortfolioPreviewCardProps = {
  image: string;
  title: string;
  text: string;
  href: string;
};

export default function PortfolioPreviewCard({
  image,
  title,
  text,
  href,
}: PortfolioPreviewCardProps) {
  const truncated = stripRichText(truncateWordSafe(text, 100));

  return (
    <a href={href} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1.1",
          overflow: "hidden",
          borderRadius: 2,
          cursor: "pointer",

          "&:hover .preview-img": {
            transform: "scale(1.05)",
          },
          "&:hover .preview-overlay": {
            opacity: 1,
          },
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src={image}
          alt={title}
          loading="lazy"
          className="preview-img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
        />

        {/* Hover Overlay */}
        <Box
          className="preview-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            opacity: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            px: 2,
            textAlign: "center",
            transition: "opacity 0.3s ease",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>

          <Typography variant="body2" color="gray.300">
            {truncated}
          </Typography>
        </Box>
      </Box>
    </a>
  );
}
