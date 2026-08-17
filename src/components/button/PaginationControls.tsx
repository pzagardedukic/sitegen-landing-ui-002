"use client";

import { Box, Pagination } from "@mui/material";

interface PaginationControlsProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

export default function PaginationControls({
  page,
  pageCount,
  onChange,
}: PaginationControlsProps) {
  if (pageCount <= 1) return null;

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Pagination
        count={pageCount}
        page={page}
        onChange={(_, value) => onChange(value)}
        shape="rounded"
        color="primary"
        siblingCount={1}
        boundaryCount={1}
        sx={{
          "& .MuiPagination-ul": {
            flexWrap: "nowrap",
          },
        }}
      />
    </Box>
  );
}
