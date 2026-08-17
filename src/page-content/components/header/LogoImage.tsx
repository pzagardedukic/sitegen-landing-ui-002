"use client";

import { withBasePath } from "@/core/static";
import { Box } from "@mui/material";
import { memo } from "react";

interface LogoImageProps {
  imageSrc: string;
  name: string;
}

function LogoImage({ imageSrc, name }: LogoImageProps) {
  return (
    <a
      href={withBasePath("/")}
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={`${name} Logo`}
        sx={{
          height: "86%",
          objectFit: "contain",
          py: 1.5,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />
    </a>
  );
}

export default memo(LogoImage);
