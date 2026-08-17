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
          sx: {
            width: "100vw",
            height: "100vh",
            position: "relative", // important
          },
        },
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{ p: 3, pt: 8 }}>
        <Stack spacing={4}>
          {items.map((item) => (
            <Box key={item.label}>
              {item.href && (
                <Typography
                  component="a"
                  href={item.href}
                  onClick={(event) => handleLinkClick(event, item.href!)}
                  variant="h4"
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    fontWeight: isNavActive(pathname, item.href) ? 700 : 400,
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
                          fontWeight: active ? 700 : 400,
                          opacity: active ? 1 : 0.8,
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: "primary.main",
                            flexShrink: 0,
                            visibility: active ? "visible" : "hidden",
                          }}
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
