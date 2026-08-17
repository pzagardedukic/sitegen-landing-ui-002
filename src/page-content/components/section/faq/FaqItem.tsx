"use client";

import { useState } from "react";
import { Box, Typography, IconButton, Collapse, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export default function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          py: 2,
        }}
      >
        <Typography variant="h6">{question}</Typography>

        <IconButton size="small">
          {open ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Box>

      <Collapse in={open}>
        <Typography variant="body2" sx={{ pb: 2, color: "text.secondary" }}>
          {answer}
        </Typography>
      </Collapse>

      <Divider />
    </Box>
  );
}
