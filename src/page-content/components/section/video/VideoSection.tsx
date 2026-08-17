"use client";

import { Grid } from "@mui/material";
import { getVideoSection } from "@/core/runtime";
import VideoThumbnail from "./VideoThumbnail";
import SingleColumnSection from "../common/SingleColumnSection";

export default function VideoSection() {
  const videoSection = getVideoSection();

  if (!videoSection || videoSection.items.length === 0)
    return null;

  return (
    <SingleColumnSection>
      <Grid container spacing={4}>
        {videoSection.items.map((url: string, index: number) => (
          <Grid key={index}>
            <VideoThumbnail videoUrl={url} />
          </Grid>
        ))}
      </Grid>
    </SingleColumnSection>
  );
}
