import { Box, Typography, Avatar, Paper, Link } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

type Review = {
  text: string;
  author: string;
  image?: string;
  url?: string;
};

type Props = {
  review: Review;
};

export default function ReviewCard({ review }: Props) {
  const { text, author, image, url } = review;

  const CardContent = (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        transition: "scale 0.2s ease",
        cursor: url ? "pointer" : "default",
        transform: "scale(1)",
        "&:hover": {
          boxShadow: url ? 1 : 0,
          transition: "box-shadow 0.1s ease",
        },
      }}
    >
      {/* Quote + Review Text */}
      <Box display="flex" flexDirection="column">
        <FormatQuoteIcon sx={{ fontSize: 40, color: "grey.300", mb: 1 }} />
        <Typography variant="body2" color="text.primary" textAlign="left">
          {text}
        </Typography>
      </Box>

      {/* Author */}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={image} alt={author} sx={{ width: 48, height: 48 }} />
        <Typography variant="subtitle1" textAlign="left" fontWeight={600} color="text.primary">
          {author}
        </Typography>
      </Box>
    </Paper>
  );

  return url ? (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      sx={{ display: "inline-block", textDecoration: "none" }}
    >
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
}
