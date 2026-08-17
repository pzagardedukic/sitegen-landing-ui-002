import { createTheme, Theme } from "@mui/material/styles";
import baseTheme from "@/theme";
import { ThemeSettings } from "@/core/types";

type PreviewThemeOptions = {
  primary?: string | null;
  secondary?: string | null;
  text?: string | null;
  fontHeading?: string | null;
  fontBody?: string | null;
  fontBanner?: string | null;
};

type CreatePreviewThemeInput = PreviewThemeOptions | ThemeSettings;

const fontFamily = (font?: string | null, fallback?: string) => {
  if (!font) return fallback;

  return `'${font}', ${fallback || "sans-serif"}`;
};

const normalizeThemeOptions = (
  input: CreatePreviewThemeInput,
): PreviewThemeOptions => {
  if ("colors" in input || "fonts" in input) {
    const themeSettings = input as ThemeSettings;

    return {
      primary: themeSettings.colors?.primary ?? null,
      secondary: themeSettings.colors?.secondary ?? null,
      text: themeSettings.colors?.text ?? null,
      fontHeading: themeSettings.fonts?.heading ?? null,
      fontBody: themeSettings.fonts?.body ?? null,
      fontBanner: themeSettings.fonts?.banner ?? null,
    };
  }

  return input as PreviewThemeOptions;
};

export function createPreviewTheme(input: CreatePreviewThemeInput): Theme {
  const { primary, secondary, text, fontHeading, fontBody, fontBanner } =
    normalizeThemeOptions(input);

  const hasOverrides =
    primary || secondary || text || fontHeading || fontBody || fontBanner;

  if (!hasOverrides) {
    return baseTheme;
  }

  const resolvedBody = fontFamily(fontBody, baseTheme.typography.fontFamily);

  const resolvedHeading = fontFamily(
    fontHeading,
    baseTheme.typography.h1?.fontFamily,
  );

  const resolvedBanner = fontFamily(
    fontBanner,
    baseTheme.typography.slogan?.fontFamily,
  );

  return createTheme(baseTheme, {
    palette: {
      ...(primary && {
        primary: {
          ...baseTheme.palette.primary,
          main: primary,
        },
      }),

      ...(secondary && {
        secondary: {
          ...baseTheme.palette.secondary,
          main: secondary,
        },
      }),

      ...(text && {
        text: {
          ...baseTheme.palette.text,
          primary: text,
        },
      }),
    },

    typography: {
      fontFamily: resolvedBody,

      h1: { ...baseTheme.typography.h1, fontFamily: resolvedHeading },
      h2: { ...baseTheme.typography.h2, fontFamily: resolvedHeading },
      h3: { ...baseTheme.typography.h3, fontFamily: resolvedHeading },
      h4: { ...baseTheme.typography.h4, fontFamily: resolvedHeading },
      h5: { ...baseTheme.typography.h5, fontFamily: resolvedHeading },
      h6: { ...baseTheme.typography.h6, fontFamily: resolvedHeading },

      body1: { ...baseTheme.typography.body1, fontFamily: resolvedBody },
      body2: { ...baseTheme.typography.body2, fontFamily: resolvedBody },
      button: { ...baseTheme.typography.button, fontFamily: resolvedBody },
      subtitle1: {
        ...baseTheme.typography.subtitle1,
        fontFamily: resolvedBody,
      },
      subtitle2: {
        ...baseTheme.typography.subtitle2,
        fontFamily: resolvedBody,
      },
      caption: { ...baseTheme.typography.caption, fontFamily: resolvedBody },
      overline: { ...baseTheme.typography.overline, fontFamily: resolvedBody },

      navLink: {
        ...baseTheme.typography.navLink,
        fontFamily: resolvedBody,
      },

      slogan: {
        ...baseTheme.typography.slogan,
        fontFamily: resolvedBanner,
      },
    },
  });
}
