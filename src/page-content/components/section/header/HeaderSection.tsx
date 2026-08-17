"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";

export type HeaderSectionProps = {
  title: string;
};

export default function HeaderSection({ title }: HeaderSectionProps) {
  return (
    <Box
      id="section-header"
      sx={{
        py: 12,
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          textTransform="uppercase"
        >
          {title}
        </Typography>
      </Container>
    </Box>
  );
}
