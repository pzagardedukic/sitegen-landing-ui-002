"use client";

import { Box, Stack } from "@mui/material";
import { useState } from "react";

import { getScheduleSection, getScheduleTables } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import CategorySelector from "../common/CategorySelector";
import SingleColumnSection from "../common/SingleColumnSection";
import ScheduleTableView from "./ScheduleTableView";

export default function ScheduleSection() {
  const { lang } = useLanguage();
  const scheduleSection = getScheduleSection(lang);
  const scheduleTables = getScheduleTables(lang);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!scheduleSection) {
    return null;
  }

  const categoryLabels = scheduleSection.categories.map(
    (category) => category.name,
  );
  const selectedCategoryId =
    selectedIndex === 0
      ? undefined
      : scheduleSection.categories[selectedIndex - 1]?.id;
  const filteredTables = selectedCategoryId
    ? scheduleTables.filter(
        (scheduleTable) => scheduleTable.categoryId === selectedCategoryId,
      )
    : scheduleTables;

  return (
    <SingleColumnSection description={scheduleSection.text}>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={5}
        mt={4}
      >
        {categoryLabels.length > 0 && (
          <Box display="flex" justifyContent="center" width="100%">
            <CategorySelector
              categories={categoryLabels}
              selectedIndex={selectedIndex}
              onSelectIndex={setSelectedIndex}
            />
          </Box>
        )}

        <Stack spacing={6} width="100%" alignItems="center">
          {filteredTables.map((scheduleTable) => (
            <ScheduleTableView
              key={scheduleTable.id}
              title={scheduleTable.title}
              text={scheduleTable.text}
              rows={scheduleTable.rows}
            />
          ))}
        </Stack>
      </Box>
    </SingleColumnSection>
  );
}
