"use client";

import React, { useEffect, useState } from "react";
import { Box, SxProps, Theme } from "@mui/material";

type RotatingItemsProps<T> = {
  items: T[];
  maxVisible?: number;
  interval?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  wrapperStyle?: React.CSSProperties;
  sx?: SxProps<Theme>;
};

export default function RotatingItems<T>({
  items,
  maxVisible = 2,
  interval = 5000,
  renderItem,
  wrapperStyle,
  sx,
}: RotatingItemsProps<T>) {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (!items.length) return;

    const id = setInterval(() => {
      setStartIndex((prev) => (prev + maxVisible) % items.length);
    }, interval);

    return () => clearInterval(id);
  }, [items.length, maxVisible, interval]);

  if (!items.length) return null;

  const visibleItems = Array.from({
    length: Math.min(maxVisible, items.length),
  }).map((_, i) => items[(startIndex + i) % items.length]);

  return (
    <Box sx={sx} style={wrapperStyle}>
      {visibleItems.map((item, i) => (
        <Box key={`${startIndex}-${i}`}>{renderItem(item, i)}</Box>
      ))}
    </Box>
  );
}
