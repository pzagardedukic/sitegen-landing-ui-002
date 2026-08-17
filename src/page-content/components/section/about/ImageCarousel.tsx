"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import RotatingItems from "@/components/common/RotatingItems";
import SolidCircle from "@/components/shape/SolidCircle";

export type ImageCarouselItem = {
  image: string;
  text: string;
};

type Props = {
  items: ImageCarouselItem[];
  interval?: number;
  maxVisible?: number;
};

export default function ImageCarousel({
  items,
  interval,
  maxVisible = 2,
}: Props) {
  const theme = useTheme();

  return (
    <RotatingItems<ImageCarouselItem>
      items={items}
      interval={interval}
      maxVisible={maxVisible}
      sx={{
        display: "grid",
        gap: 4,
        gridTemplateColumns: {
          xs: "1fr",
          md: `repeat(${maxVisible}, 1fr)`,
        },
        py: { xs: 4, lg: 8 },
      }}
      renderItem={(item, i) => {
        const isFirst = i % 2 === 0;

        const textBlock = (
          <Box
            sx={{
              display: "flex",
              flexDirection: isFirst ? "row-reverse" : "row",
              justifyContent: isFirst ? "flex-end" : "flex-start",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <Box sx={{ flexShrink: 0 }}>
              <SolidCircle size={50} color="grey.200">
                <SolidCircle size={20} color={theme.palette.primary.main} />
              </SolidCircle>
            </Box>

            <Typography
              color="text.secondary"
              variant="body2"
              textAlign={isFirst ? "right" : "left"}
            >
              {item.text}
            </Typography>
          </Box>
        );

        const imageBlock = (
          <Box
            sx={{
              width: "100%",
              aspectRatio: "4 / 3",
              overflow: "hidden",
              borderRadius: 4,
              backgroundColor: "grey.100",
            }}
          >
            <motion.img
              src={item.image}
              alt={`image-${i}`}
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        );

        return (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${item.image}-${item.text}-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Box
                sx={{
                  px: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {isFirst ? (
                  <>
                    {imageBlock}
                    {textBlock}
                  </>
                ) : (
                  <>
                    {textBlock}
                    {imageBlock}
                  </>
                )}
              </Box>
            </motion.div>
          </AnimatePresence>
        );
      }}
    />
  );
}
