import { Box, Typography, Paper } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import HoverZoomImage from "@/components/image/HoverZoomImage";
import { stripRichText, truncateWordSafe } from "@/core/utils";

type BlogPreviewCardProps = {
  href: string;
  image: string;
  title: string;
  text: string;
  author: string;
  date: string;
};

export default function BlogPreviewCard({
  href,
  image,
  title,
  text,
  author,
  date,
}: BlogPreviewCardProps) {
  const truncatedText = stripRichText(truncateWordSafe(text, 150));

  return (
    <a href={href} style={{ textDecoration: "none" }}>
      <Paper
        className="zoom-image-parent"
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Image */}
        <HoverZoomImage
          src={image}
          alt={title}
          loading="lazy"
          className="preview-img"
          zoomOnParentHover
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
        />

        {/* Content */}
        <Box px={2} py={2} flexGrow={1}>
          <Typography variant="h6" textAlign="center">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {truncatedText}
          </Typography>
        </Box>

        {/* Footer */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={3}
          py={2}
          borderTop="1px solid #f0f0f0"
          mt="auto"
        >
          <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              {author}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonthIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </a>
  );
}
