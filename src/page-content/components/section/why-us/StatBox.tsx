import { Box, Typography } from "@mui/material";

type StatBoxProps = {
  value: string;
  label: string;
};

export default function StatBox({ value, label }: StatBoxProps) {
  return (
    <Box textAlign="center" px={2}>
      <Typography
        variant="h4"
        fontWeight={700}
        color="primary"
        sx={{ fontSize: { xs: 32, md: 40 } }}
      >
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}
