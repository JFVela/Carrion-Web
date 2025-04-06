import { IconButton } from "@mui/material";
import Styles from "./BotonFlotante.module.css";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

export default function FloatingActionButton() {
  return (
    <IconButton
      sx={{
        width: 60,
        height: 60,
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "#FFB300",
        color: "#fff",
        "&:hover": { backgroundColor: "#FFA000" },
      }}
    >
      <LightbulbIcon />
    </IconButton>
  );
}
