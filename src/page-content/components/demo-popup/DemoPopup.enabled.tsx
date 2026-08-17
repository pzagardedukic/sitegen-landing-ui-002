"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useLanguage } from "@/core/runtime";
import { getDemoPopupTranslation } from "@/core/translations";

const purchaseUrl = "https://onas.si/nadzorna-plosca";

export default function DemoPopup() {
  const { lang } = useLanguage();
  const t = getDemoPopupTranslation(lang);

  const [open, setOpen] = useState(true);

  const dismiss = () => setOpen(false);

  return (
    <Dialog open={open} onClose={dismiss}>
      <DialogTitle>{t.title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{t.description}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={dismiss}>{t.closeButton}</Button>

        <Button
          variant="contained"
          component="a"
          href={purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.purchaseButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
