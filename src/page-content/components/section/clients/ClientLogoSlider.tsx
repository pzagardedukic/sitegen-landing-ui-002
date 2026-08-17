import Marquee from "react-fast-marquee";
import { Box } from "@mui/material";

export type ClientLogo = {
  src: string;
  href: string;
};

type ClientLogoSliderProps = {
  clients: ClientLogo[];
  height?: number | string;
  speed?: number;
  angle?: number;
};

export default function ClientLogoSlider({
  clients,
  height = 50,
  speed = 40,
  angle = 0,
}: ClientLogoSliderProps) {
  return (
    <Box
      py={2}
      sx={{
        overflow: "hidden",
        transform: `rotate(${angle}deg)`,
        transformOrigin: "center",
        backgroundColor: "background.paper",
        boxShadow: "0px 3px 40px 0px #0000000d",
      }}
    >
      <Marquee
        gradient={false}
        speed={speed}
        pauseOnHover
        autoFill={true}
        style={{ overflowY: "hidden" }}
      >
        {clients.map((logo, i) => (
          <Box
            key={`logo-${i}`}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 4,
              flexShrink: 0,
            }}
          >
            <a href={logo.href} target="_blank" rel="noopener noreferrer">
              <Box
                component="img"
                src={logo.src}
                alt={`client-logo-${i}`}
                sx={{
                  height,
                  objectFit: "contain",
                  display: "block",
                  "&:hover": { scale: 1.1, transition: "scale 0.3s ease" },
                }}
              />
            </a>
          </Box>
        ))}
      </Marquee>
    </Box>
  );
}
