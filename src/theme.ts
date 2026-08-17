import { createTheme, ThemeOptions } from "@mui/material/styles";
import { fontConfig } from "@/app/theme/fonts";
import { colorConfig } from "@/app/theme/colors";

declare module "@mui/material/styles" {
  interface Palette {
    header: {
      background: string;
      text: string;
      hoverText: string;
      selectedText: string;
      hoverBg: string;
    };
    footer: {
      background: string;
      text: {
        primary: string;
        secondary: string;
      };
    };
  }

  interface PaletteOptions {
    header?: {
      background?: string;
      text?: string;
      hoverText?: string;
      selectedText?: string;
      hoverBg?: string;
    };
    footer?: {
      background?: string;
      text?: {
        primary?: string;
        secondary?: string;
      };
    };
  }

  interface TypographyVariants {
    navLink: React.CSSProperties;
    slogan: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    navLink?: React.CSSProperties;
    slogan?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    slogan: true;
  }
}

const bodyFont = fontConfig.body.style.fontFamily;
const headingFont = fontConfig.heading.style.fontFamily;
const sloganFont = fontConfig.slogan.style.fontFamily;

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: colorConfig.primary,
    secondary: colorConfig.secondary,
    background: colorConfig.background,
    text: colorConfig.text,
    header: colorConfig.header,
    footer: colorConfig.footer,
  },

  typography: {
    fontFamily: bodyFont,

    h1: {
      fontFamily: headingFont,
      letterSpacing: "5px",
      fontWeight: 500,
      fontSize: "28px",
      lineHeight: 1.3,
      "@media (min-width:600px)": { fontSize: "36px" },
      "@media (min-width:900px)": { fontSize: "54px" },
    },

    h2: {
      fontFamily: headingFont,
      fontWeight: 300,
      fontSize: "24px",
      lineHeight: 1.3,
      "@media (min-width:600px)": { fontSize: "28px" },
      "@media (min-width:900px)": { fontSize: "34px" },
    },

    h3: {
      fontFamily: headingFont,
      letterSpacing: "1px",
      fontSize: "17px",
      lineHeight: 1.2,
      "@media (min-width:600px)": { fontSize: "19px" },
      "@media (min-width:900px)": { fontSize: "21px" },
    },

    h4: {
      fontFamily: headingFont,
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: 1.3,
    },

    h5: {
      fontFamily: headingFont,
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: 1.3,
    },

    h6: {
      fontFamily: headingFont,
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: 1.3,
    },

    body1: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: 1.4,
      letterSpacing: "0.16px",
      "@media (min-width:600px)": { fontSize: "16px" },
      "@media (min-width:900px)": { fontSize: "16px" },
    },

    body2: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: "13px",
      lineHeight: 1.4,
      letterSpacing: "0.16px",
      "@media (min-width:600px)": { fontSize: "15px" },
      "@media (min-width:900px)": { fontSize: "15px" },
    },

    button: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: "12px",
      textTransform: "none",
    },

    subtitle1: {
      fontFamily: bodyFont,
    },

    subtitle2: {
      fontFamily: bodyFont,
    },

    caption: {
      fontFamily: bodyFont,
    },

    overline: {
      fontFamily: bodyFont,
    },

    navLink: {
      fontFamily: bodyFont,
    },

    slogan: {
      fontFamily: sloganFont,
      fontStyle: "italic",
      letterSpacing: "4px",
    },
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (max-width:899.95px)": {
            padding: "28px",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 3px 50px 0px",
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
