"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import { getLegalSection } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { getLegalTranslation } from "@/core/translations";
import FileIcon from "../catalogue/FileIcon";
import SingleColumnSection from "../common/SingleColumnSection";

type LegalDocument = {
  key: "termsOfService" | "privacyPolicy";
  title: string;
  file: string;
};

export default function LegalSection() {
  const { lang } = useLanguage();
  const legalSection = getLegalSection(lang);
  const legalTranslation = getLegalTranslation(lang);

  const documents: LegalDocument[] = [];

  if (legalSection?.termsOfService) {
    documents.push({
      key: "termsOfService",
      title: legalTranslation.termsOfService,
      file: legalSection.termsOfService,
    });
  }

  if (legalSection?.privacyPolicy) {
    documents.push({
      key: "privacyPolicy",
      title: legalTranslation.privacyPolicy,
      file: legalSection.privacyPolicy,
    });
  }

  if (documents.length === 0) {
    return null;
  }

  return (
    <SingleColumnSection>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {documents.map((legalDocument) => (
          <Card
            key={legalDocument.key}
            sx={{
              width: 270,
              height: 300,
              borderRadius: 2,
            }}
          >
            <CardActionArea
              component="a"
              href={legalDocument.file}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${legalDocument.title}: ${legalTranslation.openDocument}`}
              sx={{
                width: "100%",
                height: "100%",
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                "&:hover .legal-file-icon": {
                  transform: "scale(1.05)",
                },
                "&:hover .legal-file-title": {
                  opacity: 0.8,
                },
              }}
            >
              <Box
                className="legal-file-icon"
                sx={{ transition: "transform 0.3s ease" }}
              >
                <FileIcon file={legalDocument.file} size={60} />
              </Box>

              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  className="legal-file-title"
                  variant="subtitle1"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ transition: "opacity 0.3s ease" }}
                >
                  {legalDocument.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {legalTranslation.openDocument}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </SingleColumnSection>
  );
}
