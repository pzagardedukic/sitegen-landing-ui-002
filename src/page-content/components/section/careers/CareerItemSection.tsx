"use client";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

import { getCareersItems } from "@/core/runtime";
import { getPageSlugByKey } from "@/core/static";
import { useLanguage } from "@/core/runtime";
import {
  getButtonTranslation,
  getCareersTranslation,
} from "@/core/translations";
import SectionDescription from "../common/SectionDescription";
import ShareActions from "../common/ShareActions";

export default function CareerItemSection({ id }: { id: number }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const career = getCareersItems(lang).find((item) => item.id === id);
  const careersTranslation = getCareersTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);

  if (!career) {
    return null;
  }

  const handleBackToCareers = () => {
    router.push(`/${getPageSlugByKey("careers")}`);
  };

  const handleApply = () => {
    const subject = `${careersTranslation.applicationSubject}: ${career.title}`;

    router.push(
      `/${getPageSlugByKey("contact")}?subject=${encodeURIComponent(subject)}`,
    );
  };

  return (
    <Box
      width="100%"
      maxWidth={960}
      mx="auto"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <SectionDescription description={career.text} textAlign="left" />

      {career.requirements.length > 0 && (
        <>
          <Divider />

          <Box>
            <Typography variant="h5" fontWeight={700} mb={2}>
              {careersTranslation.requirementsTitle}
            </Typography>

            <List disablePadding>
              {career.requirements.map((requirement, index) => (
                <ListItem
                  key={index}
                  disableGutters
                  alignItems="flex-start"
                  sx={{ py: 0.75 }}
                >
                  <ListItemIcon sx={{ minWidth: 36, mt: "2px" }}>
                    <CheckCircleOutlineIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={requirement}
                    primaryTypographyProps={{
                      variant: "body1",
                      color: "text.secondary",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      )}

      {career.note && (
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: { xs: 2.5, sm: 3 },
            py: 2.5,
            fontStyle: "italic",
          }}
        >
          <SectionDescription description={career.note} textAlign="left" />
        </Paper>
      )}

      <Divider />

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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              fontSize: "14px",
              width: { xs: "100%", sm: "auto" },
            }}
            onClick={handleBackToCareers}
          >
            {careersTranslation.backToCareers}
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: "14px",
              width: { xs: "100%", sm: "auto" },
            }}
            onClick={handleApply}
          >
            {buttonTranslation.applyNow}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "flex-end" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <ShareActions title={career.title} />
        </Box>
      </Box>
    </Box>
  );
}
