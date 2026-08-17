import React from "react";
import { Box, SxProps, Theme } from "@mui/material";

type SolidCircleProps = {
  size: number;
  color?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function SolidCircle({
  size,
  color = "grey.400",
  children,
  sx,
}: SolidCircleProps) {
  return (
    <Box
      sx={{
        width: size,
        aspectRatio: "1 / 1",
        borderRadius: "50%",
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
