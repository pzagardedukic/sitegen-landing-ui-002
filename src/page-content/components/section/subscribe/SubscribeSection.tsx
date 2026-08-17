"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import { useBannerImage } from "@/app/theme/utils/UseBannerImage";
import GradientButton from "@/components/button/GradientButton";
import FormDisclaimer from "../common/FormDisclaimer";
import { useLanguage } from "@/core/runtime";
import {
  getFormTranslation,
  getSubscriptionsTranslation,
} from "@/core/translations";
import { callPublicApi } from "@/core/utils";
import { Alert, Box, TextField, Typography } from "@mui/material";
import { primaryLanguage } from "@/core/static";

type SubmitStatus = "success" | "error" | null;

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function SubscribeSection() {
  const resolvedHeaderImage = useBannerImage();

  const { lang } = useLanguage();
  const subscriptionsTranslation = getSubscriptionsTranslation(lang);
  const formTranslations = getFormTranslation(lang);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail) || !normalizedEmail) {
      setEmailError(formTranslations.email.errorMessage);
      return;
    }

    setEmailError(null);
    setSubmitStatus(null);
    setIsSubmitting(true);

    try {
      await callPublicApi("newsletter", {
        body: {
          email: normalizedEmail,
          locale:
            lang?.toLocaleLowerCase() ?? primaryLanguage.toLocaleLowerCase(),
        },
      });

      setEmail("");
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!submitStatus) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [submitStatus]);

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        color: "white",
        py: { xs: 6, lg: 10 },
        px: 4,

        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${resolvedHeaderImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.55,
          filter: "contrast(1.1) brightness(0.9) saturate(0.9)",
          zIndex: 0,
        },

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              180deg,
              rgba(0,0,0,0.65) 0%,
              rgba(0,0,0,0.55) 45%,
              rgba(0,0,0,0.85) 100%
            )
          `,
          zIndex: 1,
        },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Box
          sx={{
            position: "relative",
            flex: "1 1 420px",
            minWidth: 0,
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography color="white" variant="h3">
            {subscriptionsTranslation.title}
          </Typography>

          <TextField
            variant="standard"
            type="email"
            value={email}
            placeholder={formTranslations.email.placeholder}
            error={Boolean(emailError)}
            helperText={emailError ?? " "}
            disabled={isSubmitting}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError(null);
              setSubmitStatus(null);
            }}
            slotProps={{
              htmlInput: {
                "aria-label": formTranslations.email.placeholder,
              },
            }}
            sx={{
              input: {
                color: "white",
                fontSize: { xs: "22px", md: "32px" },
                pb: 0,

                "&::placeholder": {
                  opacity: 1,
                },

                "&:-webkit-autofill": {
                  backgroundColor: "transparent !important",
                  WebkitTextFillColor: "white",
                  transition: "background-color 9999s ease-in-out 0s",
                  fontSize: { xs: "22px", md: "32px" },
                },

                "&:-webkit-autofill::first-line": {
                  color: "white",
                },
              },

              "& .MuiInput-underline:before": {
                borderBottomColor: "white",
                borderBottomWidth: 1,
              },

              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "white",
                borderBottomWidth: 1,
              },

              "& .MuiInput-underline:after": {
                borderBottomColor: "white",
                borderBottomWidth: 1,
              },

              "& .MuiInput-underline.Mui-error:after": {
                borderBottomColor: "error.main",
              },

              "& .MuiFormHelperText-root": {
                mx: 0,
                minHeight: 20,
                color: "white",
              },

              "& .MuiFormHelperText-root.Mui-error": {
                color: "white",
              },
            }}
          />

          <FormDisclaimer isHighContrast />

          {submitStatus && (
            <Alert
              severity={submitStatus}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                mt: 1,
                py: 0.25,
                width: "100%",
                "& .MuiAlert-message": {
                  py: 0.75,
                },
              }}
            >
              {submitStatus === "success"
                ? subscriptionsTranslation.successMessage
                : subscriptionsTranslation.errorMessage}
            </Alert>
          )}
        </Box>

        <Box
          sx={{
            position: "relative",
            flex: "0 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GradientButton type="submit" disabled={isSubmitting}>
            {subscriptionsTranslation.callToAction}
          </GradientButton>
        </Box>
      </Box>
    </Box>
  );
}
