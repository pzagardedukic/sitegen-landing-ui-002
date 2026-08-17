"use client";

import { withBasePath } from "@/core/static";
import { Typography } from "@mui/material";
import { memo } from "react";

interface LogoTextProps {
  name: string;
}

function LogoText({ name }: LogoTextProps) {
  return (
    <a
      href={withBasePath("/")}
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="body1"
        fontSize="24px"
        sx={{
          alignSelf: "center",
          py: 1.5,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        {name}
      </Typography>
    </a>
  );
}

export default memo(LogoText);
