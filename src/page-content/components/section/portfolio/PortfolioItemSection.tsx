"use client";

import { getPortfolioItems } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { CustomGallery } from "../common/CustomGallery";
import { Box, Button, Divider, Typography } from "@mui/material";
import SectionDescription from "../common/SectionDescription";
import { getPortfolioTranslation } from "@/core/translations";
import { useRouter } from "next/navigation";
import RelatedProjects from "./RelatedProjects";
import { getPageSlugByKey } from "@/core/static";
import ShareActions from "../common/ShareActions";

export default function PortfolioItemSection({ id }: { id: number }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const projectTranslations = getPortfolioTranslation(lang).project;

  const portfolioItem = getPortfolioItems(lang).find((item) => item.id === id);
  if (!portfolioItem) {
    return null;
  }

  const relatedItemIds = getPortfolioItems(lang)
    .filter(
      (item) =>
        item.id !== portfolioItem.id &&
        item.category === portfolioItem.category,
    )
    .map((item) => item.id);

  const handleBackToPortfolio = () => {
    router.push(`/${getPageSlugByKey("portfolio")}`);
  };

  return (
    <Box display="flex" flexDirection="column" gap={4} flex={1}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
        flex={1}
        mb={4}
      >
        <Box
          flex={1}
          gap={2}
          display="flex"
          flexDirection="column"
          minWidth={0}
        >
          <Typography
            variant="h2"
            sx={{
              color: "text.primary",
            }}
          >
            {projectTranslations.details.label}
          </Typography>

          <Divider />

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: 0.5, sm: 0 }}
          >
            <Typography
              flex={{ xs: 1, sm: 0.5 }}
              variant="body1"
              color="text.secondary"
            >
              {projectTranslations.details.date}
            </Typography>

            <Typography flex={1} variant="body1" color="text.secondary">
              {portfolioItem.date}
            </Typography>
          </Box>

          <Divider />

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: 0.5, sm: 0 }}
          >
            <Typography
              flex={{ xs: 1, sm: 0.5 }}
              variant="body1"
              color="text.secondary"
            >
              {projectTranslations.details.client}
            </Typography>

            <Typography flex={1} variant="body1" color="text.secondary">
              {portfolioItem.client}
            </Typography>
          </Box>

          <Divider />

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: 0.5, sm: 0 }}
          >
            <Typography
              flex={{ xs: 1, sm: 0.5 }}
              variant="body1"
              color="text.secondary"
            >
              {projectTranslations.details.category}
            </Typography>

            <Typography flex={1} variant="body1" color="text.secondary">
              {portfolioItem.category}
            </Typography>
          </Box>

          <Divider />
        </Box>

        <Box
          flex={1}
          gap={2}
          display="flex"
          flexDirection="column"
          minWidth={0}
        >
          <Typography
            variant="h2"
            sx={{
              color: "text.primary",
            }}
          >
            {projectTranslations.descriptionLabel}
          </Typography>

          <Divider />

          <SectionDescription description={portfolioItem.text} />
        </Box>
      </Box>

      <CustomGallery items={portfolioItem.images} align="left" />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 4,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            fontSize: "14px",
            width: { xs: "100%", sm: "auto" },
          }}
          onClick={handleBackToPortfolio}
        >
          {projectTranslations.backToPortfolio}
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "flex-end" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <ShareActions title={portfolioItem.title} />
        </Box>
      </Box>

      {relatedItemIds.length > 0 && (
        <Box display="flex" flexDirection="column" gap={10} mb={4}>
          <Divider
            sx={{
              position: "relative",
              width: "100vw",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          <RelatedProjects projectIds={relatedItemIds} />
        </Box>
      )}
    </Box>
  );
}
