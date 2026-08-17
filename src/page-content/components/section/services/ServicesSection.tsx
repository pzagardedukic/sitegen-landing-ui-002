"use client";

import { Box } from "@mui/material";
import { getServiceItems } from "@/core/runtime";
import ServiceRow from "./ServiceRow";
import { useLanguage } from "@/core/runtime";
import SingleColumnSection from "../common/SingleColumnSection";

export default function ServicesSection() {
  const { lang } = useLanguage();

  const serviceItems = getServiceItems(lang);

  return (
    <SingleColumnSection>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        maxWidth={1100}
        mx="auto"
        gap={{ xs: 4, md: 6 }}
      >
        {serviceItems.map((service, index) => (
          <ServiceRow key={index} {...service} reverse={index % 2 === 1} />
        ))}
      </Box>
    </SingleColumnSection>
  );
}
