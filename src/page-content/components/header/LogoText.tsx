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
        sx={(theme) => ({
          alignSelf: "center",
          py: 1.5,
          letterSpacing: "-0.2px",
          // Same drop as the image logo, for sites that ship a name instead of artwork.
          transform: "translateY(var(--logo-drop, 0px))",
          transition: theme.transitions.create(["opacity", "transform"], {
            duration: theme.transitions.duration.short,
          }),
          "&:hover": { opacity: 0.8 },
        })}
      >
        {name}
      </Typography>
    </a>
  );
}

export default memo(LogoText);
