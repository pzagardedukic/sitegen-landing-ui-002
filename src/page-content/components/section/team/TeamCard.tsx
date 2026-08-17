import { Box, Typography, IconButton } from "@mui/material";
import {
  LinkedIn,
  Instagram,
  Facebook,
  Twitter,
  Language,
  Phone,
  Email,
} from "@mui/icons-material";
import { JSX } from "react";
import { ContactType } from "@/core/runtime";

export interface ContactItem {
  type: ContactType;
  value: string;
}

export interface TeamCardProps {
  name: string;
  text: string;
  image: string;
  contact?: ContactItem[];
}

const iconMap: Record<ContactType, JSX.Element> = {
  EMAIL: <Email fontSize="small" />,
  PHONE: <Phone fontSize="small" />,
  LINKEDIN: <LinkedIn fontSize="small" />,
  INSTAGRAM: <Instagram fontSize="small" />,
  FACEBOOK: <Facebook fontSize="small" />,
  TWITTER: <Twitter fontSize="small" />,
  WEBSITE: <Language fontSize="small" />,
  TIKTOK: <Language fontSize="small" />,
};

const linkBuilder = (type: ContactType, value: string) => {
  switch (type) {
    case "EMAIL":
      return `mailto:${value}`;
    case "PHONE":
      return `tel:${value}`;
    default:
      return value; // direct URL
  }
};

export default function TeamCard({
  name,
  text,
  image,
  contact = [],
}: TeamCardProps) {
  return (
    <Box sx={{ textAlign: "center", position: "relative" }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 3,
          mb: 2,
        }}
      >
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{ width: "100%", display: "block" }}
          loading="lazy"
        />

        {/* Hover Overlay */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "column",
            paddingBottom: 1.5,
            pointerEvents: "none",
          }}
        >
          {/* Bottom Icons Row */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              padding: "6px 10px",
              borderRadius: 50,
              pointerEvents: "auto",
            }}
          >
            {contact.map((c, index) => (
              <IconButton
                key={index}
                href={linkBuilder(c.type, c.value)}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "#fff",
                  color: "grey.700",
                  boxShadow: 3,
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                {iconMap[c.type]}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>

      <Typography variant="subtitle1" fontWeight="bold">
        {name}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}
