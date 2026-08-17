"use client";

import { getBlogItems } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { Box, Button, Divider, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import SectionDescription from "../common/SectionDescription";
import LatestPosts from "./LatestPosts";
import { useRouter } from "next/navigation";
import { getBlogTranslation } from "@/core/translations";
import { getPageSlugByKey } from "@/core/static";
import ShareActions from "../common/ShareActions";

export default function BlogPostSection({ id }: { id: number }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const blogTranslations = getBlogTranslation(lang);

  const blog = getBlogItems(lang).find((item) => item.id === id);

  if (!blog) {
    return null;
  }

  const handleBackToBlogs = () => {
    router.push(`/${getPageSlugByKey("blog")}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 10 },
        }}
      >
        {/* Latest Blogs (desktop left) */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            flex: 0.3,
          }}
        >
          <LatestPosts excludeId={id} count={5} />
        </Box>

        {/* Blog Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            flex: 1,
            minWidth: 0,
          }}
        >
          <Box
            component="img"
            src={blog.image}
            alt={blog.title}
            loading="lazy"
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "scale-down",
              borderRadius: 2,
            }}
          />

          <Box maxWidth={{ xs: "100%", md: "80%" }}>
            <SectionDescription
              description={blog.description}
              textAlign="left"
            />
          </Box>

          <Divider />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: 2, sm: 0 }}
            px={{ xs: 0, sm: 3 }}
            py={2}
            mt={-4}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <PersonIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary">
                {blog.author}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <CalendarMonthIcon
                sx={{ fontSize: 18, color: "text.secondary" }}
              />
              <Typography variant="caption" color="text.secondary">
                {blog.date}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 4,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            fontSize: "14px",
            width: { xs: "100%", sm: "auto" },
          }}
          onClick={handleBackToBlogs}
        >
          {blogTranslations.posts.backToBlogs}
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "flex-end" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <ShareActions title={blog.title} />
        </Box>
      </Box>

      {/* Latest Blogs (mobile bottom) */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <LatestPosts excludeId={id} count={5} />
      </Box>
    </Box>
  );
}
