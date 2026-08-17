"use client";

import React from "react";
import { Box } from "@mui/material";
import ContactInfoCard from "./ContactInfoCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { getCompany, getMap, getContacts } from "@/core/runtime";
import { getContactTranslation } from "@/core/translations";
import { useLanguage } from "@/core/runtime";

export default function ContactInfo() {
  const { lang } = useLanguage();
  const contactTranslation = getContactTranslation(lang);

  const company = getCompany();
  const map = getMap();
  const contacts = getContacts();

  const email = contacts.find((c) => c.type === "EMAIL")?.value || "";
  const phone = contacts.find((c) => c.type === "PHONE")?.value || "";

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      flexWrap="wrap"
      gap={{ xs: 3, sm: 4 }}
      width="100%"
    >
      <Box flex={1} minWidth={{ xs: "100%", sm: 0 }}>
        <ContactInfoCard
          icon={<LocationOnIcon />}
          title={contactTranslation.contactInfo.address.title}
          detail={
            <>
              {company.address},<br />
              {company.postalCode} {company.postalOffice}
            </>
          }
          actionLabel={contactTranslation.contactInfo.address.callToAction}
          actionHref={map.url}
        />
      </Box>

      <Box flex={1} minWidth={{ xs: "100%", sm: 0 }}>
        <ContactInfoCard
          icon={<EmailIcon />}
          title={contactTranslation.contactInfo.email.title}
          detail={email}
          actionLabel={contactTranslation.contactInfo.email.callToAction}
          actionHref={`mailto:${email}`}
        />
      </Box>

      <Box flex={1} minWidth={{ xs: "100%", sm: 0 }}>
        <ContactInfoCard
          icon={<PhoneAndroidIcon />}
          title={contactTranslation.contactInfo.phone.title}
          detail={phone}
          actionLabel={contactTranslation.contactInfo.phone.callToAction}
          actionHref={`tel:${phone.replace(/\s+/g, "")}`}
        />
      </Box>
    </Box>
  );
}
