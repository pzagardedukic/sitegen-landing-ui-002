import { getExperienceItems } from "@/core/runtime";
import { Grid, Box } from "@mui/material";

export default function ExperienceItems() {
  const experience = getExperienceItems();

  return (
    <Grid
      container
      spacing={10}
      justifyContent="flex-start"
      alignItems="center"
      flex={1}
      alignSelf="center"
    >
      {experience.map((item, index) => (
        <Grid key={index}>
          <Box
            component="img"
            src={item.image}
            alt={`Experience ${index + 1}`}
            sx={{
              width: "100%",
              maxHeight: 80,
              objectFit: "contain",
              cursor: "pointer",
              "&:hover": { scale: 1.1, transition: "scale 0.3s ease" },
            }}
            onClick={() => window.open(item.url, "_blank")}
          />
        </Grid>
      ))}
    </Grid>
  );
}
