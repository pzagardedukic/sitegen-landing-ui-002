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
      }}
    >
      {/*
        Sized in pixels, not as a percentage of the bar.
        A logo is customer-supplied artwork of unknown proportions — the demo data ships
        a 720x240 image — so a percentage height only works while some ancestor happens to
        have a resolved height. Capping both dimensions keeps any logo inside the bar.
      */}
      <Box
        component="img"
        src={imageSrc}
        alt={`${name} Logo`}
        sx={(theme) => ({
          height: { xs: 28, md: 40 },
          maxWidth: { xs: 120, md: 220 },
          width: "auto",
          objectFit: "contain",
          objectPosition: "left center",
          // Centres the logo on the white notch rather than on the bar — see HeaderLayout.
          transform: "translateY(var(--logo-drop, 0px))",
          transition: theme.transitions.create(["opacity", "transform"], {
            duration: theme.transitions.duration.short,
          }),
          "&:hover": { opacity: 0.8 },
        })}
      />
    </a>
  );
}

export default memo(LogoImage);
