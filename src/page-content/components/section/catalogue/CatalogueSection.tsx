"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import FileIcon from "./FileIcon";
import { getCatalogueSection } from "@/core/runtime";
import SingleColumnSection from "../common/SingleColumnSection";

export default function CatalogueSection() {
  const catalogueSection = getCatalogueSection();
  if (!catalogueSection) {
    return null;
  }

  return (
    <SingleColumnSection>
      <Grid container spacing={4} justifyContent="center">
        {catalogueSection.items.map((item, index) => (
          <Grid key={index}>
            <Card
              sx={{
                height: 300,
                width: 270,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
              }}
            >
              <CardActionArea
                onClick={() => window.open(item.file, "_blank")}
                sx={{
                  height: "100%",
                  width: "100%",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  "&:hover .file-icon": {
                    scale: 1.05,
                    transition: "scale 0.3s ease",
                  },
                  "&:hover .file-title": {
                    opacity: 0.8,
                    transition: "opacity 0.3s ease",
                  },
                }}
              >
                {/* BIG ICON */}
                <Box className="file-icon">
                  <FileIcon file={item.file} size={60} />
                </Box>

                {/* TITLE */}
                <CardContent>
                  <Typography
                    className="file-title"
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight={600}
                    textAlign="center"
                  >
                    {item.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </SingleColumnSection>
  );
}
