import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import SectionDescription from "../common/SectionDescription";

type ScheduleTableViewProps = {
  title: string;
  text: string;
  rows: string[][];
};

export default function ScheduleTableView({
  title,
  text,
  rows,
}: ScheduleTableViewProps) {
  const columnCount = rows.reduce(
    (count, row) => Math.max(count, row.length),
    0,
  );
  const headerCells = rows[0] ?? [];
  const bodyRows = rows.slice(1);

  return (
    <Box width="100%" maxWidth={1100}>
      {title && (
        <Typography
          variant="h3"
          component="h2"
          color="text.primary"
          textAlign="center"
          gutterBottom
        >
          {title}
        </Typography>
      )}

      {text && (
        <Box maxWidth={800} mx="auto" mb={3}>
          <SectionDescription description={text} textAlign="center" />
        </Box>
      )}

      {columnCount > 0 && (
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            width: "100%",
            overflowX: "auto",
            borderRadius: 2,
          }}
        >
          <Table
            aria-label={title || undefined}
            sx={{
              minWidth: Math.max(600, columnCount * 160),
              tableLayout: "fixed",
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "action.hover" }}>
                {Array.from({ length: columnCount }).map((_, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    component="th"
                    scope="col"
                    sx={{
                      minWidth: 160,
                      fontWeight: 600,
                      verticalAlign: "top",
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    {headerCells[cellIndex] ?? ""}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {bodyRows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: "action.hover",
                    },
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  {Array.from({ length: columnCount }).map((_, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      sx={{
                        minWidth: 160,
                        verticalAlign: "top",
                        whiteSpace: "pre-line",
                        wordBreak: "break-word",
                      }}
                    >
                      {row[cellIndex] ?? ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
