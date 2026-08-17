import { Box, Typography, Paper } from "@mui/material";

type ServiceCardProps = {
  image: string;
  title: string;
  text: string;
};

export default function ServiceCard({ image, title, text }: ServiceCardProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        textAlign: "center",
        p: 4,
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 128,
          height: 128,
          backgroundColor: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Paper>
  );
}
