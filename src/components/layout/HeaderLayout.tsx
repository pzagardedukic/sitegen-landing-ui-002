import { AppBar, Toolbar } from "@mui/material";

type HeaderLayoutProps = {
  children: React.ReactNode;
  scrolled: boolean;
};

/*
 * Transparent over the hero, solid once the page moves.
 *
 * The bar carries no content container and nothing sits in its row: the logo hangs off the
 * left edge and the navigation off the right, both positioned against the bar itself. A
 * Container would have held the navigation on the 36 / 64 / 120 content grid, which at 1440
 * leaves it 144 from the edge against the logo's 24 and reads lopsided.
 *
 * Both are hung on the same `--logo-y`, so they share a centre line — the middle of the
 * white notch, which is lower than the middle of the bar. In the row the navigation
 * centred on the bar instead and sat visibly higher than the logo beside it.
 */
export default function HeaderLayout({
  children,
  scrolled,
}: HeaderLayoutProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={(theme) => ({
        backgroundColor: scrolled
          ? theme.palette.header.background
          : "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        transition: theme.transitions.create(["background-color"], {
          duration: theme.transitions.duration.short,
        }),
      })}
    >
      <Toolbar
        disableGutters
        sx={(theme) => ({
          minHeight: 72,
          /*
           * The logo is placed against the hero's white notch, not against this bar, so it
           * is taken out of the row and positioned on the AppBar itself.
           *
           * `--logo-y` is the centre it sits on. Unscrolled that is the middle of the
           * notch, which is not the middle of the bar — the notch starts 12/24/20 below
           * the top and is 64/82/102 tall, against a bar of 72/72/96:
           *
           *   xs  12 + 32 = 44     sm  24 + 41 = 65     md  20 + 51 = 71
           *
           * Scrolled the notch is gone and the bar is a solid slab, so the logo returns to
           * the middle of the bar. `--logo-x` stays put through both, so nothing slides
           * sideways when the bar changes state.
           *
           * `--logo-x` is the notch's own left edge plus 4. The notch sits at the top-left
           * of the hero card, and the card is inset 12/24/20 from the page edge, so:
           *
           *   xs  12 + 4 = 16      sm  24 + 4 = 28      md  20 + 4 = 24
           *
           * Four is as tight as it goes: the notch corner is rounded 14/20/25, and any
           * less puts the artwork on the curve instead of against the flat edge.
           *
           * The bar height is written into these same breakpoint blocks on purpose. As a
           * responsive `minHeight: { xs, md }` beside an explicit `breakpoints.up("md")`
           * key, both produce a `@media (min-width:900px)` block and the later one wins
           * the whole block — the height silently reverted to the xs value on desktop.
           */
          "--logo-y": scrolled ? "36px" : "44px",
          "--logo-x": "16px",
          "--nav-x": "24px",
          [theme.breakpoints.up("sm")]: {
            // MUI's own Toolbar rule drops the bar to 64 from 600 up; restated here so
            // the tablet bar keeps the 72 the rest of the header is measured against.
            minHeight: 72,
            "--logo-y": scrolled ? "36px" : "65px",
            "--logo-x": "28px",
            "--nav-x": "40px",
          },
          [theme.breakpoints.up("md")]: {
            minHeight: scrolled ? 80 : 96,
            "--logo-y": scrolled ? "40px" : "71px",
            "--logo-x": "24px",
            "--nav-x": "48px",
          },
          transition: theme.transitions.create(["min-height"], {
            duration: theme.transitions.duration.short,
          }),
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          color: theme.palette.header.text,
        })}
      >
        {children}
      </Toolbar>
    </AppBar>
  );
}
