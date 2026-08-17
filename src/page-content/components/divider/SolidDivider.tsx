import { useBannerImage } from "@/app/theme/utils/UseBannerImage";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type SolidDividerProps = {
  color?: string;
  useHeaderImage?: boolean;
  height?: number | string;
};

export default function SolidDivider({
  color,
  useHeaderImage = false,
  height = "180px",
}: SolidDividerProps) {
  const resolvedHeaderImage = useBannerImage();

  const theme = useTheme();
  const dividerColor = color ?? theme.palette.secondary.main;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height,
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        backgroundColor: useHeaderImage ? undefined : dividerColor,

        ...(useHeaderImage && {
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${resolvedHeaderImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            opacity: 0.55,
            filter: "contrast(1.1) brightness(0.9) saturate(0.9)",
            zIndex: 0,
          },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(
                180deg,
                rgba(0,0,0,0.65) 0%,
                rgba(0,0,0,0.55) 45%,
                rgba(0,0,0,0.85) 100%
              )
            `,
            zIndex: 1,
          },
        }),
      }}
    />
  );
}
