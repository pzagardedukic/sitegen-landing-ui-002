"use client";

import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";
import styles from "./layout.module.scss";

type PageLayoutProps = {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
};

export default function PageLayout({
  header,
  footer,
  children,
}: PageLayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    const handleScroll = () => {
      setScrolled(node.scrollTop > 0);
    };

    node.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => node.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const node = scrollRef.current;
      if (!node) return;

      // Ignore when typing
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const lineStep = 80;
      const pageStep = node.clientHeight * 0.9;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          node.scrollBy({ top: lineStep, behavior: "smooth" });
          break;

        case "ArrowUp":
          e.preventDefault();
          node.scrollBy({ top: -lineStep, behavior: "smooth" });
          break;

        case "ArrowRight":
          e.preventDefault();
          node.scrollBy({ left: lineStep, behavior: "smooth" });
          break;

        case "ArrowLeft":
          e.preventDefault();
          node.scrollBy({ left: -lineStep, behavior: "smooth" });
          break;

        case "PageDown":
          e.preventDefault();
          node.scrollBy({ top: pageStep, behavior: "smooth" });
          break;

        case "PageUp":
          e.preventDefault();
          node.scrollBy({ top: -pageStep, behavior: "smooth" });
          break;

        case "Home":
          e.preventDefault();
          node.scrollTo({ top: 0, behavior: "smooth" });
          break;

        case "End":
          e.preventDefault();
          node.scrollTo({
            top: node.scrollHeight,
            behavior: "smooth",
          });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Box className={styles.pageLayout}>
      <HeaderLayout scrolled={scrolled}>{header}</HeaderLayout>

      <Box className={styles.mainScrollArea} ref={scrollRef}>
        <Box id="main" component="main" className={styles.main}>
          {children}
        </Box>
        <FooterLayout>{footer}</FooterLayout>
      </Box>
    </Box>
  );
}
