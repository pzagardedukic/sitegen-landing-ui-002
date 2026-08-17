import { AppBar, Toolbar } from "@mui/material";

type HeaderLayoutProps = {
  children: React.ReactNode;
  scrolled: boolean;
};

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
        transition: "background-color 0.3s ease, height 0.3s ease",
        boxShadow: "none",
      })}
    >
      <Toolbar
        sx={{
          height: scrolled ? "80px" : "100px",
          transition: "height 0.3s ease",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {children}
      </Toolbar>
    </AppBar>
  );
}
