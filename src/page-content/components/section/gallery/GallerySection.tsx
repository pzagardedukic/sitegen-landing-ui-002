"use client";

import "photoswipe/style.css";
import SingleColumnSection from "../common/SingleColumnSection";
import { CustomGallery } from "../common/CustomGallery";
import { getGalleryItems } from "@/core/runtime";
import PaginationControls from "@/components/button/PaginationControls";
import { usePagination } from "@/core/react";

export default function GallerySection() {
  const galleryItems = getGalleryItems();
  const { page, setPage, pageCount, paginatedItems } = usePagination(
    galleryItems,
    6,
  );

  return (
    <SingleColumnSection>
      <CustomGallery items={galleryItems} currentPageItems={paginatedItems} />

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
