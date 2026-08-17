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
        variant="h4"
        sx={{
          alignSelf: "center",
          py: 1.5,
          letterSpacing: "-0.2px",
          transition: "opacity 0.2s ease",
          "&:hover": { opacity: 0.8 },
        }}
      >
        {name}
      </Typography>
    </a>
  );
}

export default memo(LogoText);
