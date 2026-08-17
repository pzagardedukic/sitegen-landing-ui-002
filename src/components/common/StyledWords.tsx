import React from "react";
import {
  Box,
  Typography,
  TypographyProps,
  SxProps,
  Theme,
} from "@mui/material";

type Mode = "start" | "end" | "alternate";

type StyledWordsProps = {
  text?: unknown;
  mode?: Mode;
  styleA: SxProps<Theme>;
  styleB?: SxProps<Theme>;
  count?: number;
} & Omit<TypographyProps, "children">;

export default function StyledWords({
  text,
  mode = "alternate",
  styleA,
  styleB = {},
  count = 1,
  ...typographyProps
}: StyledWordsProps) {
  const safeText = typeof text === "string" ? text : String(text ?? "");
  const words = safeText.trim().split(/\s+/).filter(Boolean);

  const styledWords = words.map((word, i) => {
    const applyStyle =
      mode === "start"
        ? i < count
        : mode === "end"
          ? i >= words.length - count
          : i % 2 === 0;

    return (
      <Box
        key={`${word}-${i}`}
        component="span"
        sx={applyStyle ? styleA : styleB}
      >
        {word}
        {i < words.length - 1 && " "}
      </Box>
    );
  });

  return <Typography {...typographyProps}>{styledWords}</Typography>;
}
