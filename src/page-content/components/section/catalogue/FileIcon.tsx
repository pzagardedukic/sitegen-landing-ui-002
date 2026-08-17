import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { getFileType } from "@/core/static";

export default function FileIcon({
  file,
  size,
}: {
  file: string;
  size?: number;
}) {
  const type = getFileType(file);

  switch (type) {
    case "pdf":
      return <PictureAsPdfIcon sx={{ fontSize: size }} color="error" />;
    case "excel":
      return <TableChartIcon sx={{ fontSize: size }} color="success" />;
    default:
      return <InsertDriveFileIcon sx={{ fontSize: size }} color="info" />;
  }
}
