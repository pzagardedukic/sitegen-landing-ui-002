"use client";

import { Box, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import HoverDropdown, { DropdownItem } from "../common/HoverDropdown";
import { isCurrentPath, isNavActive } from "@/core/static";

type NavItem = {
  label: string;
  href?: string;
  subItems?: {
    label: string;
    href: string;
  }[];
};

type DesktopNavigationProps = {
  items: NavItem[];
};

export default function DesktopNavigation({ items }: DesktopNavigationProps) {
  const pathname = usePathname();
  const theme = useTheme();

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (isCurrentPath(pathname, href)) {
      event.preventDefault();
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {items.map((item) => {
        const hasSubItems = item.subItems?.length;

        if (hasSubItems) {
          const dropdownItems: DropdownItem[] = item.subItems!.map((sub) => ({
            label: sub.label,
            href: sub.href,
          }));

          return (
            <HoverDropdown
              key={item.label}
              trigger={
                <Button
                  color="inherit"
                  endIcon={<ArrowDropDownIcon />}
                  sx={{
                    ...theme.typography.body1,
                    color: theme.palette.header.text,
                    "&:hover": {
                      color: theme.palette.header.hoverText,
                      backgroundColor: "transparent",
                    },
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Button>
              }
              items={dropdownItems}
              onItemClick={handleLinkClick}
            />
          );
        }

        return (
          <Button
            key={item.label}
            component="a"
            href={item.href || "#"}
            onClick={(event) => {
              if (item.href) {
                handleLinkClick(event, item.href);
              }
            }}
            color="inherit"
            sx={{
              ...theme.typography.body1,
              color: isNavActive(pathname, item.href)
                ? theme.palette.header.selectedText
                : theme.palette.header.text,
              "&:hover": {
                color: theme.palette.header.hoverText,
                backgroundColor: "transparent",
              },
              fontWeight: isNavActive(pathname, item.href) ? 600 : 500,
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Box>
  );
}
