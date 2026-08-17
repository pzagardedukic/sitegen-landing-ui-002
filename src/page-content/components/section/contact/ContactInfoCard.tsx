import { Box, Typography, Link } from "@mui/material";

type ContactInfoCardProps = {
  icon: React.ReactNode;
  title: string;
  detail: React.ReactNode;
  actionLabel: string;
  actionHref: string;
};

export default function ContactInfoCard({
  icon,
  title,
  detail,
  actionLabel,
  actionHref,
}: ContactInfoCardProps) {
  return (
    <Box display="flex" flexDirection="row" gap={2} alignItems="flex-start">
      {/* Icon container */}
      <Box
        sx={{
          width: 48,
          height: 48,
          minWidth: 48,
          minHeight: 48,
          borderRadius: "50%",
          backgroundColor: "grey.800",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      {/* Text Content */}
      <Box display="flex" flexDirection="column" textAlign="left">
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {detail}
        </Typography>
        <Link
          href={actionHref}
          underline="hover"
          fontSize={12}
          fontWeight={600}
          sx={{ mt: 1 }}
        >
          {actionLabel}
        </Link>
      </Box>
    </Box>
  );
}
