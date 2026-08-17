import { Box } from "@mui/material";
import Marquee from "react-fast-marquee";
import ReviewCard from "./ReviewCard";
import { getReviewItems } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";

type ReviewProps = {
  width?: number | string;
  fade?: boolean;
  speed?: number;
};

export default function Reviews({
  width = "100%",
  fade = true,
  speed = 20,
}: ReviewProps) {
  const { lang } = useLanguage();
  const reviewItems = getReviewItems(lang);

  return (
    <Box
      py={{ xs: 0, lg: 2 }}
      mt={{ xs: 0, lg: 2 }}
      sx={{
        position: "relative",
        width: width,
        height: "auto",
        overflowX: "clip",
        backgroundColor: "transparent",
        transformOrigin: "center",
      }}
    >
      <Marquee
        gradient={false}
        speed={speed}
        pauseOnHover
        autoFill={true}
        style={{ overflow: "visible" }}
      >
        {reviewItems.map((item, i) => (
          <Box
            key={`review-${i}`}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 6,
              flexShrink: 0,
              height: "auto",
            }}
          >
            <ReviewCard
              review={{
                text: item.text,
                author: item.title,
                url: item.url,
                image: item.image,
              }}
            />
          </Box>
        ))}
      </Marquee>

      {fade && (
        <>
          {/* Left Fade */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "60px",
              height: "100%",
              pointerEvents: "none",
              zIndex: 2,
              background: (theme) =>
                `linear-gradient(to right, ${theme.palette.background.default} 0%, transparent 100%)`,
            }}
          />

          {/* Right Fade */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "60px",
              height: "100%",
              pointerEvents: "none",
              zIndex: 2,
              background: (theme) =>
                `linear-gradient(to left, ${theme.palette.background.default} 0%, transparent 100%)`,
            }}
          />
        </>
      )}
    </Box>
  );
}
