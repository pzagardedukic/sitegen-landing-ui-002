"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import CustomMap from "./CustomMap";
import { getMap } from "@/core/runtime";
import { getContactTranslation } from "@/core/translations";
import { useLanguage } from "@/core/runtime";
import EstablishedAndClients from "../common/EstablishedAndClients";
import { useSearchParams } from "next/navigation";

export default function ContactSection() {
  const { lang } = useLanguage();
  const contactTranslation = getContactTranslation(lang);

  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") ?? undefined;

  const map = getMap();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 6, md: 10 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "560fr 80fr 560fr" },
          gap: { xs: 5, md: 0 },
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            gridColumn: { md: "1" },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 4, md: 6 },
          }}
        >
          <Typography variant="h2" component="h2">
            {contactTranslation.title}
          </Typography>

          <ContactInfo />
        </Box>

        <Box sx={{ gridColumn: { md: "3" } }}>
          <ContactForm subject={subject} />
        </Box>
      </Box>

      {map.enabled && <CustomMap />}

      {/* Year + Happy Clients - full screen width */}
      <EstablishedAndClients />
    </Box>
  );
}
