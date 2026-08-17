"use client";

import { Box } from "@mui/material";
import { getTeamItems, getTeamSection } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { getTeamTranslation } from "@/core/translations";
import SingleColumnSection from "../common/SingleColumnSection";
import TeamCard from "./TeamCard";

export default function TeamSection() {
  const { lang } = useLanguage();
  const teamTranslation = getTeamTranslation(lang);

  const teamSection = getTeamSection(lang);
  if (!teamSection) {
    return null;
  }
  const teamItems = getTeamItems(lang);

  const renderTeamMembers = () => {
    return (
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
        px={2}
        py={4}
        mt={1}
      >
        {teamItems.map((member, index) => (
          <Box
            key={index}
            sx={{
              flex: "1 1 300px",
              maxWidth: "320px",
            }}
          >
            <TeamCard
              name={member.name}
              text={member.text}
              image={member.image}
              contact={member.contact}
            />
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <SingleColumnSection
      title={teamTranslation.title}
      description={teamSection.text}
    >
      {renderTeamMembers()}
    </SingleColumnSection>
  );
}
