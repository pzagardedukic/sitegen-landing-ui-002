"use client";

import { Box } from "@mui/material";
import { getBlogItems } from "@/core/runtime";
import BlogPreviewCard from "./BlogPreviewCard";
import { useLanguage } from "@/core/runtime";
import SingleColumnSection from "../common/SingleColumnSection";
import { usePagination } from "@/core/react";
import PaginationControls from "@/components/button/PaginationControls";
import { getBlogSlugById } from "@/core/static";
import { withBasePath } from "@/core/static";

export default function BlogSection() {
  const { lang } = useLanguage();

  const blogItems = getBlogItems(lang);
  const { page, setPage, pageCount, paginatedItems } = usePagination(
    blogItems,
    6,
  );

  return (
    <SingleColumnSection>
      {/* Cards */}
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
          gap: 4,
          px: 2,
          py: 4,
        }}
      >
        {paginatedItems.map((item) => (
          <BlogPreviewCard
            key={item.id}
            image={item.image}
            title={item.title}
            text={item.description}
            author={item.author}
            date={item.date}
            href={withBasePath(`/blog/${getBlogSlugById(item.id)}`)}
          />
        ))}
      </Box>

      {pageCount > 1 && (
        <PaginationControls
          page={page}
          pageCount={pageCount}
          onChange={setPage}
        />
      )}
    </SingleColumnSection>
  );
}
