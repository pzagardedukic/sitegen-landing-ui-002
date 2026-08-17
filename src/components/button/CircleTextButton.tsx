import { Box, Typography, ButtonBase, useTheme } from "@mui/material";

type Props = {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  circleSize?: number | string;
  textColor?: string;
};

export default function CircleTextButton({
  label,
  href,
  onClick,
  type = "button",
  disabled = false,
  circleSize = "68px",
  textColor = "text.primary",
}: Props) {
  const theme = useTheme();
  const isLink = Boolean(href);

  return (
    <ButtonBase
      component={isLink ? "a" : "button"}
      {...(isLink
        ? { href }
        : {
            onClick,
            type,
          })}
      disabled={disabled}
      disableRipple
      sx={{
        display: "flex",
        alignItems: "center",
        textTransform: "none",
        padding: 0,
        color: "primary.main",
        fontWeight: 500,
        fontSize: { xs: "24px", sm: "30px", md: "104px" },
        textDecoration: "none",
        position: "relative",
        height: circleSize,
        minWidth: circleSize,
        width: "fit-content",

        /* text hover scale — unchanged */
        "&:hover .label": {
          transform: "translateZ(0) scale(1.02)",
        },

        /* stroke hover — unchanged */
        "&:hover .circle-stroke": {
          stroke: theme.palette.primary.main,
          opacity: 1,
        },

        /* press animation — circle only */
        "&:active .circle-press": {
          opacity: 0.15,
          transform: "scale(1.05)",
        },

        "&.Mui-disabled": {
          opacity: 0.6,
          cursor: "default",
        },

        "&.Mui-disabled:hover .label": {
          transform: "translateZ(0)",
        },

        "&.Mui-disabled:hover .circle-stroke": {
          stroke: "#cccccc",
          opacity: 0.5,
        },
      }}
    >
      <Box
        component="svg"
        className="circle"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: circleSize,
          width: circleSize,
          transform: "rotate(28deg)",
        }}
      >
        {/* press / background circle */}
        <circle
          className="circle-press"
          cx="50%"
          cy="50%"
          r="calc(50% - 2px)"
          fill={theme.palette.primary.main}
          opacity="0"
          style={{
            transition: "opacity 120ms ease, transform 120ms ease",
            transform: "scale(0.95)",
            transformOrigin: "center",
            transformBox: "fill-box",
          }}
        />

        {/* visible stroke circle */}
        <circle
          className="circle-stroke"
          cx="50%"
          cy="50%"
          r="calc(50% - 2px)"
          stroke="#cccccc"
          strokeWidth="3px"
          fill="none"
          pathLength="100"
          strokeDasharray="90"
          strokeDashoffset="5"
          opacity="0.5"
        />
      </Box>

      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          pl: "20px",
        }}
      >
        <Typography
          component="span"
          className="label"
          sx={{
            transition: "transform 0.1s ease",
            color: textColor,

            /* prevents blur during scale */
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          {label} →
        </Typography>
      </Box>
    </ButtonBase>
  );
}
