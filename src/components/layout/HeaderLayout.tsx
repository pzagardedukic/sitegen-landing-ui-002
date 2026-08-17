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
            minHeight: { xs: 72, md: scrolled ? 80 : 96 },
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
