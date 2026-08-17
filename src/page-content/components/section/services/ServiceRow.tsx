import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

type ServiceRowProps = {
  image: string;
  title: string;
  text: string;
  features?: string[];
  reverse?: boolean;
};

export default function ServiceRow({
  image,
  title,
  text,
  features,
  reverse = false,
}: ServiceRowProps) {
  const visibleFeatures = features?.filter(Boolean) ?? [];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: reverse ? "row-reverse" : "row",
        },
        alignItems: "center",
        gap: { xs: 3, md: 8 },
        py: { xs: 3, md: 5 },
      }}
    >
      {/* Image + text side */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          loading="lazy"
          sx={{
            width: "100%",
            maxHeight: 320,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />

        <Typography variant="h3">{title}</Typography>

        <Typography variant="body1" color="text.secondary">
          {text}
        </Typography>
      </Box>

      {/* Features side */}
      {visibleFeatures.length > 0 && (
        <Box sx={{ flex: 1, width: "100%" }}>
          <List disablePadding>
            {visibleFeatures.map((feature, index) => (
              <ListItem
                key={index}
                disableGutters
                alignItems="flex-start"
                sx={{ py: 0.75 }}
              >
                <ListItemText
                  primary={`• ${feature}`}
                  primaryTypographyProps={{
                    variant: "body1",
                    color: "text.primary",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
