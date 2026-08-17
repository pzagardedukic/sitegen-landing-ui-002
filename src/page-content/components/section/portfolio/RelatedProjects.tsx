import { getPortfolioItems } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import { getPortfolioTranslation } from "@/core/translations";
import { Box, Typography } from "@mui/material";
import PortfolioPreviewCard from "./PortfolioPreviewCard";
import {
  getPageSlugByKey,
  getPortfolioSlugById,
  withBasePath,
} from "@/core/static";

type RelatedProjectsProps = {
  projectIds: number[];
};

export default function RelatedProjects({ projectIds }: RelatedProjectsProps) {
  const { lang } = useLanguage();
  const projectTranslations = getPortfolioTranslation(lang).project;

  const relatedItems = getPortfolioItems(lang)
    .filter((item) => projectIds.includes(item.id))
    .slice(0, 5);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Typography variant="h2" color="text.primary" alignSelf="center">
        {projectTranslations.relatedProjects}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {relatedItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 8px)",
                md: "1 1 calc(33.333% - 11px)",
                lg: "1 1 200px",
              },
              maxWidth: {
                xs: "100%",
                sm: "calc(50% - 8px)",
                md: "calc(33.333% - 11px)",
                lg: "220px",
              },
              minWidth: 0,
              display: "flex",
            }}
          >
            <PortfolioPreviewCard
              title={item.title}
              image={item.images[0]}
              text=""
              href={withBasePath(
                `/${getPageSlugByKey("portfolio")}/${getPortfolioSlugById(item.id)}`,
              )}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
