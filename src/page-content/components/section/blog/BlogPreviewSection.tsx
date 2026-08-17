"use client";

import { Box } from "@mui/material";
import { getBlogItems, getBlogSection } from "@/core/runtime";
import BlogPreviewCard from "./BlogPreviewCard";
import { useLanguage } from "@/core/runtime";
import SingleColumnSection from "../common/SingleColumnSection";
import { getBlogTranslation } from "@/core/translations";
import { getBlogSlugById, getPageSlugByKeyWithBasePath } from "@/core/static";
import { withBasePath } from "@/core/static";

export default function BlogPreviewSection() {
  const { lang } = useLanguage();
  const blogTranslation = getBlogTranslation(lang);

  const blogSection = getBlogSection(lang);
  if (!blogSection) {
    return null;
  }
  const blogItems = getBlogItems(lang).slice(0, 3); // Show only 3 preview items

  return (
    <SingleColumnSection
      title={blogTranslation.title}
      description={blogSection.text}
      callToAction={{
        label: blogTranslation.callToAction,
        href: getPageSlugByKeyWithBasePath("blog"),
      }}
    >
      {/* Cards */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
        px={2}
        py={4}
      >
        {blogItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              flex: "1 1 300px",
              maxWidth: "320px",
            }}
          >
            <BlogPreviewCard
              image={item.image}
              title={item.title}
              text={item.description}
              author={item.author}
              date={item.date}
              href={`${getPageSlugByKeyWithBasePath("blog")}/${getBlogSlugById(item.id)}`}
            />
          </Box>
        ))}
      </Box>
    </SingleColumnSection>
  );
}
