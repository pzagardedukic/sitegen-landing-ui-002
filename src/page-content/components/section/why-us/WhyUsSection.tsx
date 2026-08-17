"use client";

import { Box } from "@mui/material";
import {
  getClients,
  getExperienceItems,
  getExperienceSection,
} from "@/core/runtime";
import StatBox from "./StatBox";
import { useLanguage } from "@/core/runtime";
import { getWhyUsTranslation } from "@/core/translations";
import DualColumnSection from "../common/DualColumnSection";
import ExperienceItems from "./ExperienceItems";

export default function WhyUsSection() {
  const { lang } = useLanguage();
  const whyUsTranslation = getWhyUsTranslation(lang);

  const clients = getClients();
  const experience = getExperienceSection(lang);
  const experienceItemsCount = getExperienceItems().length;

  const stats = [
    experience?.clientCount && {
      value: `${experience.clientCount} +`,
      label: whyUsTranslation.clientCount,
    },
    experience?.projectCount && {
      value: `${experience.projectCount} +`,
      label: whyUsTranslation.projectCount,
    },
  ].filter(Boolean);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <DualColumnSection
        title={whyUsTranslation.title}
        description={experience?.text ?? ""}
      >
        {/* Stats */}
        {stats.length > 0 && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={8}
            flexWrap="wrap"
            py={4}
          >
            {stats.map((stat, i) =>
              stat ? (
                <StatBox key={i} value={stat.value} label={stat.label} />
              ) : null
            )}
          </Box>
        )}
      </DualColumnSection>

      {experienceItemsCount > 0 && (
        <Box width="80%" alignSelf="center">
          <ExperienceItems />
        </Box>
      )}
    </Box>
  );
}
