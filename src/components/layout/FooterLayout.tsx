import { Box } from "@mui/material";

type FooterLayoutProps = {
  children: React.ReactNode;
};

export default function FooterLayout({ children }: FooterLayoutProps) {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.footer.background,
        py: 4,
        mt: "auto",
        textAlign: "center",
      })}
    >
      {children}
    </Box>
  );
}
