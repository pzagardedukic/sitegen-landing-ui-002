import { AppBar, Container, Toolbar } from "@mui/material";

type HeaderLayoutProps = {
  children: React.ReactNode;
  scrolled: boolean;
};

/*
 * Transparent over the hero, solid once the page moves. The Container is what keeps the
 * logo and navigation on the same 36 / 64 / 120 margin grid as every section below.
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
      <Container maxWidth="lg" disableGutters={false}>
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
             * The bar height is written into these same breakpoint blocks on purpose. As a
             * responsive `minHeight: { xs, md }` beside an explicit `breakpoints.up("md")`
             * key, both produce a `@media (min-width:900px)` block and the later one wins
             * the whole block — the height silently reverted to the xs value on desktop.
             */
            "--logo-y": scrolled ? "36px" : "44px",
            "--logo-x": "28px",
            [theme.breakpoints.up("sm")]: {
              // MUI's own Toolbar rule drops the bar to 64 from 600 up; restated here so
              // the tablet bar keeps the 72 the rest of the header is measured against.
              minHeight: 72,
              "--logo-y": scrolled ? "36px" : "65px",
              "--logo-x": "48px",
            },
            [theme.breakpoints.up("md")]: {
              minHeight: scrolled ? 80 : 96,
              "--logo-y": scrolled ? "40px" : "71px",
              "--logo-x": "56px",
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
      </Container>
    </AppBar>
  );
}
