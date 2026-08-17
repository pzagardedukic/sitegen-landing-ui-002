"use client";

import { useEffect, useState } from "react";
import { getBannerFromTheme } from "@/app/theme/utils/getBannerImage";

const STORAGE_KEY = "theme-editor-payload";

export function useBannerImage() {
  const [banner, setBanner] = useState(() => getBannerFromTheme());

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const payload = JSON.parse(saved);

        if (payload?.banner) {
          setBanner(payload.banner);
          return;
        }
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }

    const handleBannerUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<string>;

      setBanner(customEvent.detail || getBannerFromTheme());
    };

    window.addEventListener("theme-editor-banner-update", handleBannerUpdate);

    return () => {
      window.removeEventListener(
        "theme-editor-banner-update",
        handleBannerUpdate,
      );
    };
  }, []);

  return banner;
}
