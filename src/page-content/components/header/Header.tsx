"use client";

import { getHome } from "@/core/runtime";
import LanguageSelector from "@/components/language-selector/LanguageSelector";
import HeaderNavigation from "@/components/navigation/HeaderNavigation";
import { Box, Divider } from "@mui/material";
import { SupportedLang, useLanguage } from "@/core/runtime";
import { getNavigationTranslation } from "@/core/translations";
import { getPageSlugByKeyWithBasePath, isSectionEnabled } from "@/core/static";
import LogoImage from "./LogoImage";
import LogoText from "./LogoText";
import { useIsMobileDevice } from "@/hooks/useIsMobileDevice";
import { withBasePath } from "@/core/static";

export default function Header() {
  const { lang, setLang, languageList } = useLanguage();
  const navTranslation = getNavigationTranslation(lang);
  const home = getHome(lang);
  const isMobile = useIsMobileDevice();

  const navItems = [
    { label: navTranslation.home, href: withBasePath("/") },
    { label: navTranslation.about, href: getPageSlugByKeyWithBasePath("about") },
    {
      label: navTranslation.more,
      subItems: [
        {
          label: navTranslation.contact,
          href: getPageSlugByKeyWithBasePath("contact"),
        },
        isSectionEnabled("services") && {
          label: navTranslation.services,
          href: getPageSlugByKeyWithBasePath("services"),
        },
        isSectionEnabled("schedule") && {
          label: navTranslation.schedule,
          href: getPageSlugByKeyWithBasePath("schedule"),
        },
        isSectionEnabled("events") && {
          label: navTranslation.events,
          href: getPageSlugByKeyWithBasePath("events"),
        },
        isSectionEnabled("faq") && {
          label: navTranslation.faq,
          href: getPageSlugByKeyWithBasePath("faq"),
        },
        isSectionEnabled("portfolio") && {
          label: navTranslation.portfolio,
          href: getPageSlugByKeyWithBasePath("portfolio"),
        },
        isSectionEnabled("gallery") && {
          label: navTranslation.gallery,
          href: getPageSlugByKeyWithBasePath("gallery"),
        },
        isSectionEnabled("blog") && {
          label: navTranslation.blog,
          href: getPageSlugByKeyWithBasePath("blog"),
        },
        isSectionEnabled("videos") && {
          label: navTranslation.videos,
          href: getPageSlugByKeyWithBasePath("videos"),
        },
        isSectionEnabled("catalogues") && {
          label: navTranslation.catalogues,
          href: getPageSlugByKeyWithBasePath("catalogues"),
        },
        isSectionEnabled("pricing") && {
          label: navTranslation.pricing,
          href: getPageSlugByKeyWithBasePath("pricing"),
        },
        isSectionEnabled("careers") && {
          label: navTranslation.careers,
          href: getPageSlugByKeyWithBasePath("careers"),
        },
      ].filter(Boolean) as { label: string; href: string }[],
    },
  ];

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Left: Logo */}
      {home.logo.image ? (
        <LogoImage imageSrc={home.logo.image} name={home.name} />
      ) : (
        <LogoText name={home.name} />
      )}

      {/* Right: Navigation and Language Selector */}
      {languageList.length > 1 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "row-reverse" : "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <HeaderNavigation items={navItems} />

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderWidth: 1, borderColor: "white", opacity: 0.5 }}
          />

          <LanguageSelector
            supportedLanguages={languageList}
            defaultLanguage={lang as string}
            onChange={(code) => setLang(code as SupportedLang)}
          />
        </Box>
      ) : (
        <HeaderNavigation items={navItems} />
      )}
    </Box>
  );
}
