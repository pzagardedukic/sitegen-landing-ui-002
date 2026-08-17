"use client";

import { useEffect, useState } from "react";
import { Card, Box } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { getVideoThumbnail } from "@/core/utils";
import HoverZoomImage from "@/components/image/HoverZoomImage";

export default function VideoThumbnail({ videoUrl }: { videoUrl: string }) {
  const [thumb, setThumb] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const thumbnail = await getVideoThumbnail(videoUrl);
      if (mounted) setThumb(thumbnail);
    })();

    return () => {
      mounted = false;
    };
  }, [videoUrl]);

  return (
    <Card
      onClick={() => window.open(videoUrl, "_blank")}
      className="zoom-image-parent"
      sx={{
        position: "relative",
        height: 250,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#222",
        "&:hover .playIcon": {
          opacity: 1,
        },
        "&:hover .thumb": {
          opacity: 0.6,
        },
        "&:hover .hover-zoom-image img": {
          opacity: 0.6,
        },
      }}
    >
      {thumb ? (
        <HoverZoomImage
          src={thumb}
          alt="Video preview"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          zoomOnParentHover
        />
      ) : (
        // Fallback thumbnail (gray gradient)
        <Box
          className="thumb"
          sx={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #555, #222)",
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      <PlayCircleFilledWhiteIcon
        className="playIcon"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 70,
          color: "#fff",
          opacity: 0.7,
          transition: "all 0.3s ease",
        }}
      />
    </Card>
  );
}
