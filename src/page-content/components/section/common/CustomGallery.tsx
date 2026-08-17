"use client";

import React from "react";
import { Box } from "@mui/material";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/style.css";
import HoverZoomImage from "@/components/image/HoverZoomImage";

type CustomGalleryProps = {
  items: string[];
  currentPageItems?: string[];
  itemWidth?: number | string;
  gap?: number | string;
  align?: "left" | "center" | "right";
};

const alignMap: Record<NonNullable<CustomGalleryProps["align"]>, string> = {
  left: "start",
  center: "center",
  right: "end",
};

type ImgSize = { w: number; h: number };

export const CustomGallery = ({
  items,
  currentPageItems,
  itemWidth = "300px",
  gap = 4,
  align = "center",
}: CustomGalleryProps) => {
  const [sizes, setSizes] = React.useState<Record<string, ImgSize>>({});

  React.useEffect(() => {
    let cancelled = false;

    const missing = items.filter((src) => !sizes[src]);
    if (!missing.length) return;

    missing.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;

        setSizes((prev) => ({
          ...prev,
          [src]: {
            w: img.naturalWidth,
            h: img.naturalHeight,
          },
        }));
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [items, sizes]);

  const visibleSet = new Set(currentPageItems ?? items);

  return (
    <Gallery options={{ loop: true, wheelToZoom: true }}>
      <Box
        sx={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: `repeat(auto-fit, ${
            typeof itemWidth === "number" ? `${itemWidth}px` : itemWidth
          })`,
          gap,
          justifyContent: alignMap[align],
        }}
      >
        {items.map((src, index) => {
          const size = sizes[src];

          if (!size) return null;

          const isVisible = visibleSet.has(src);

          return (
            <Item
              key={`${src}-${index}`}
              original={src}
              thumbnail={src}
              width={size.w}
              height={size.h}
            >
              {({ ref, open }) => (
                <HoverZoomImage
                  ref={ref}
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  onClick={open}
                  width={itemWidth}
                  sx={{
                    borderRadius: 2,
                    display: isVisible ? undefined : "none",
                  }}
                />
              )}
            </Item>
          );
        })}
      </Box>
    </Gallery>
  );
};
