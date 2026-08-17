"use client";

import { getBlogItems } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { Box, Divider, Typography } from "@mui/material";
import HoverZoomImage from "@/components/image/HoverZoomImage";
import { useRouter } from "next/navigation";
import { getBlogTranslation } from "@/core/translations";
import { getBlogSlugById, getPageSlugByKey } from "@/core/static";

type LatestPostsProps = {
  excludeId?: number;
  count?: number;
};

export default function LatestPosts({ excludeId, count }: LatestPostsProps) {
  const router = useRouter();
  const { lang } = useLanguage();
  const blogTranslations = getBlogTranslation(lang);

  const handlePostClick = (postId: number) => {
    router.push(`/${getPageSlugByKey("blog")}/${getBlogSlugById(postId)}`);
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "text.primary",
        }}
      >
        {blogTranslations.posts.latestPosts}
      </Typography>

      <Divider />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1.5 }}>
        {getBlogItems(lang)
          .filter((post) => post.id !== excludeId)
          .slice(0, count ?? 5)
          .map((post) => (
            <Box
              key={post.id}
              className="zoom-image-parent"
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "flex-start",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => {
                handlePostClick(post.id);
              }}
            >
              {/* Image */}
              <HoverZoomImage
                src={post.image}
                alt={post.title}
                loading="lazy"
                zoomOnParentHover
                width="90px"
                sx={{ flexShrink: 0, height: "70px", borderRadius: 2 }}
              />
              <Typography
                key={post.id}
                variant="body2"
                sx={{
                  fontSize: "12px",
                  lineHeight: 1.4,
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                {post.title}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
