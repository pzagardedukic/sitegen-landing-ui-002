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
             * How far the logo drops to sit on the middle of the white notch instead of the
             * middle of the bar. Unscrolled, the logo is inside the hero's cut-out corner,
             * and the two centres do not coincide:
             *
             *   xs  notch 12 + 64/2 = 44   bar 72/2 = 36   ->  8
             *   sm  notch 24 + 82/2 = 65   bar 72/2 = 36   -> 29
             *   md  notch 20 + 102/2 = 71  bar 96/2 = 48   -> 23
             *
             * Scrolled there is no notch — the bar is a solid slab — so the drop goes to
             * zero and the logo centres on the bar again. Kept here rather than in the logo
             * because this is where both the bar height and the scrolled state are known.
             *
             * The bar height is written into these same breakpoint blocks on purpose. As a
             * responsive `minHeight: { xs, md }` beside an explicit `breakpoints.up("md")`
             * key, both produce a `@media (min-width:900px)` block and the later one wins
             * the whole block — the height silently reverted to the xs value on desktop.
             */
            "--logo-drop": scrolled ? "0px" : "8px",
            [theme.breakpoints.up("sm")]: {
              // MUI's own Toolbar rule drops the bar to 64 from 600 up; restated here so
              // the tablet bar keeps the 72 the rest of the header is measured against.
              minHeight: 72,
              "--logo-drop": scrolled ? "0px" : "29px",
            },
            [theme.breakpoints.up("md")]: {
              minHeight: scrolled ? 80 : 96,
              "--logo-drop": scrolled ? "0px" : "23px",
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
