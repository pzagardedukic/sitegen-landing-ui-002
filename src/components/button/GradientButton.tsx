"use client";

import { Button, type ButtonProps } from "@mui/material";

/*
 * The brand gradient is reserved for calls to action and marquee bands — never as a card
 * background, except in the no-image fallback. The gradient itself comes from the palette,
 * so it follows the customer's primary and secondary rather than being written in here.
 */
export default function GradientButton({ sx, ...props }: ButtonProps) {
  return (
    <Button
      disableElevation
      {...props}
      sx={[
        (theme) => ({
          backgroundImage: theme.palette.brandGradient,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderRadius: 999,
          px: { xs: 3, md: 4 },
          py: { xs: 1.25, md: 1.5 },
          "&:hover": {
            backgroundImage: theme.palette.brandGradient,
            filter: "brightness(1.08)",
          },
          "&.Mui-disabled": {
            backgroundImage: "none",
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
