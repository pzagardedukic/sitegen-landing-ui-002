import { Box } from "@mui/material";
import { useLanguage } from "@/core/runtime";
import { getServiceItems } from "@/core/runtime";
import ServiceCard from "./ServiceCard";

type ServicesProps = {
  maxCnt?: number;
};

export default function Services({ maxCnt }: ServicesProps) {
  const { lang } = useLanguage();
  const serviceItems = getServiceItems(lang).slice(0, maxCnt || undefined);

  return (
    <Box display="flex" flexWrap="wrap" gap={4} px={2} py={4}>
      {serviceItems.map((service, index) => (
        <Box
          key={index}
          sx={{
            flex: "1 1 300px",
            maxWidth: "320px",
          }}
        >
          <ServiceCard {...service} />
        </Box>
      ))}
    </Box>
  );
}
