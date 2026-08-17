"use client";

import { Drawer, Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";
import { isCurrentPath, isNavActive } from "@/core/static";

type NavItem = {
  label: string;
  href?: string;
  subItems?: {
    label: string;
    href: string;
  }[];
};

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
};

export default function MobileNavDrawer({
  open,
  onClose,
  items,
}: MobileNavDrawerProps) {
  const pathname = usePathname();

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (isCurrentPath(pathname, href)) {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: (theme) => ({
            width: "100vw",
            // dvh, not vh: on a phone the URL bar is part of vh and the last item ends
            // up under it.
            height: "100dvh",
            position: "relative",
            backgroundColor: theme.palette.header.background,
            backgroundImage: "none",
            color: theme.palette.header.text,
          }),
        },
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={onClose}
        aria-label="Zapri meni"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1,
          color: "inherit",
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{ px: "36px", pt: 10, pb: 6 }}>
        <Stack spacing={4}>
          {items.map((item) => (
            <Box key={item.label}>
              {item.href && (
                <Typography
                  component="a"
                  href={item.href}
                  onClick={(event) => handleLinkClick(event, item.href!)}
                  variant="h3"
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    color: isNavActive(pathname, item.href)
                      ? "header.selectedText"
                      : "inherit",
                  }}
                >
                  {item.label}
                </Typography>
              )}

              {item.subItems && (
                <Stack spacing={2} sx={{ mt: 2, pl: 2 }}>
                  {item.subItems.map((sub) => {
                    const active = isNavActive(pathname, sub.href);

                    return (
                      <Typography
                        key={sub.href}
                        component="a"
                        href={sub.href}
                        onClick={(event) => handleLinkClick(event, sub.href)}
                        variant="h6"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          textDecoration: "none",
                          color: active ? "header.selectedText" : "inherit",
                          opacity: active ? 1 : 0.75,
                        }}
                      >
                        <Box
                          component="span"
                          sx={(theme) => ({
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundImage: theme.palette.brandGradient,
                            flexShrink: 0,
                            visibility: active ? "visible" : "hidden",
                          })}
                        />
                        {sub.label}
                      </Typography>
                    );
                  })}
                </Stack>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </Drawer>
  );
}
