import { Box, Typography, Chip } from "@mui/material";
import { groupWorkingHours } from "./groupWorkingHours";
import { useMemo } from "react";
import { useLanguage } from "@/core/runtime";
import { getWorkingHours } from "@/core/runtime";
import { Days, getContactTranslation } from "@/core/translations";

export default function WorkingHours() {
  const { lang } = useLanguage();

  const workingHoursTranslation = getContactTranslation(lang).workingHours;

  const workingHours = getWorkingHours(lang);

  const grouped = useMemo(
    () => groupWorkingHours(workingHours.items),
    [workingHours.items]
  );

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={2}>
        {workingHoursTranslation.title}
      </Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        {grouped.map((g, i) => {
          const isToday = g.days.includes(currentDay);
          return (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom="1px solid #eee"
              py={1}
              sx={{
                fontWeight: isToday ? 600 : 400,
                color: isToday ? "primary.main" : "text.primary",
              }}
            >
              <Typography>
                {(() => {
                  const translated = g.days.map(
                    (d) => workingHoursTranslation.days[d as Days]
                  );
                  return translated.length === 1
                    ? translated[0]
                    : `${translated[0]} – ${translated[translated.length - 1]}`;
                })()}
              </Typography>
              {g.open ? (
                <Typography color="text.secondary">
                  {g.from} – {g.to}
                </Typography>
              ) : (
                <Chip
                  label={workingHoursTranslation.closedLabel}
                  size="small"
                />
              )}
            </Box>
          );
        })}
      </Box>

      {workingHours.note && (
        <Typography variant="body2" color="text.secondary" mt={2}>
          {workingHoursTranslation.noteLabel}: {workingHours.note}
        </Typography>
      )}
    </Box>
  );
}
