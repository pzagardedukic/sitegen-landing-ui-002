import Marquee from "react-fast-marquee";
import { Box, Typography } from "@mui/material";

type SlidingTextProps = {
  text: string;
  height?: number | string;
  speed?: number;
  angle?: number;
};

export default function SlidingText({
  text,
  height = 50,
  speed = 40,
  angle = 0,
}: SlidingTextProps) {
  return (
    <Box
      py={2}
      sx={{
        height: height,
        overflow: "hidden",
        transform: `rotate(${angle}deg)`,
        transformOrigin: "center",
        backgroundColor: "background.paper",
        boxShadow: "0px 3px 40px 0px #0000000d",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Marquee gradient={false} speed={speed} autoFill={true}>
        <Typography color="text.secondary" variant="body1" sx={{ px: 3 }}>
          {text}
        </Typography>
      </Marquee>
    </Box>
  );
}
