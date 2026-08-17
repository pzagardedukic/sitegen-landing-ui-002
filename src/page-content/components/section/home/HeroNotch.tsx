import { Box } from "@mui/material";

/*
 * The white notch in the hero card's top-left corner, with the two concave fillets that
 * carry it back into the card edge. Copied from the Aiero reference the design system is
 * derived from: 350x102 with a 25px radius on the top-left and bottom-right, and 24x23
 * fillets to its right and below it.
 *
 * The fillets are quarter-circle cut-outs rather than shapes: a white square with a
 * transparent circle bitten out of its far corner reads as the notch curving away.
 * The site header sits over this, which is why the notch is light — a customer's logo is
 * usually dark artwork and would disappear against the photograph otherwise.
 */
export default function HeroNotch() {
  const width = { xs: 190, sm: 260, md: 350 };
  const height = { xs: 64, sm: 82, md: 102 };
  const fillet = { xs: 16, sm: 20, md: 24 };
  const radius = { xs: 14, sm: 20, md: 25 };

  const filletSx = (theme: import("@mui/material/styles").Theme) => ({
    position: "absolute" as const,
    width: fillet,
    height: fillet,
    background: `radial-gradient(circle at 100% 100%, transparent 0, transparent ${fillet.md - 1}px, ${theme.palette.background.default} ${fillet.md}px)`,
    [theme.breakpoints.down("sm")]: {
      background: `radial-gradient(circle at 100% 100%, transparent 0, transparent ${fillet.xs - 1}px, ${theme.palette.background.default} ${fillet.xs}px)`,
    },
    [theme.breakpoints.only("sm")]: {
      background: `radial-gradient(circle at 100% 100%, transparent 0, transparent ${fillet.sm - 1}px, ${theme.palette.background.default} ${fillet.sm}px)`,
    },
  });

  return (
    <Box aria-hidden sx={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}>
      <Box
        sx={(theme) => ({
          width,
          height,
          backgroundColor: theme.palette.background.default,
          borderTopLeftRadius: radius,
          borderBottomRightRadius: radius,
        })}
      />

      {/* to the right of the notch */}
      <Box sx={(theme) => ({ ...filletSx(theme), top: 0, left: width })} />

      {/* below the notch */}
      <Box sx={(theme) => ({ ...filletSx(theme), top: height, left: 0 })} />
    </Box>
  );
}
