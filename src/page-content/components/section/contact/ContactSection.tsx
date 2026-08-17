"use client";

import React from "react";
import { Box } from "@mui/material";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import WorkingHours from "./WorkingHours";
import CustomMap from "./CustomMap";
import { getMap, getWorkingHours } from "@/core/runtime";
import EstablishedAndClients from "../common/EstablishedAndClients";
import { useSearchParams } from "next/navigation";
import { useIsMobileDevice } from "@/hooks/useIsMobileDevice";

export default function ContactSection() {
  const mapOnBottom = useIsMobileDevice();

  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") ?? undefined;

  const workingHours = getWorkingHours();
  const map = getMap();

  return (
    <Box display="flex" flexDirection="column" gap={10} mb={10}>
      <Box
        display="flex"
        flexDirection={{ xs: "column-reverse", md: "row" }}
        gap={4}
        width="100%"
        justifySelf="center"
      >
        {map.enabled && (
          <Box display="flex" flexDirection="column" flex={0.6}>
            <CustomMap fadeRight={!mapOnBottom} />
          </Box>
        )}

        <Box display="flex" flexDirection="column" gap={4} mt={4} flex={1}>
          <ContactInfo />

          <ContactForm subject={subject} />

          {workingHours.enabled && <WorkingHours />}
        </Box>
      </Box>

      {/* Year + Happy Clients - full screen width */}
      <EstablishedAndClients />
    </Box>
  );
}
