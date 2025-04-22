// componentes/estilos.js
import styled from "styled-components";
import { Typography, Avatar, Card, Chip, Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import { COLORS } from "./constantes";

export const SummaryContainer = styled("div")({
  padding: 24,
  maxWidth: 800,
  margin: "0 auto",
  borderRadius: 12,
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  background: COLORS.cardBackground,
});

export const InstitutionName = styled(Typography)({
  fontWeight: 700,
  color: COLORS.primary,
  textAlign: "center",
  marginBottom: 8,
  fontSize: "2rem",
});

export const AcademicYear = styled(Typography)({
  textAlign: "center",
  marginBottom: 24,
  color: COLORS.textSecondary,
  fontSize: "1rem",
});

export const StudentAvatar = styled(Avatar)({
  margin: "0 auto",
  border: `3px solid ${COLORS.primary}`,
});

export const StudentName = styled(Typography)({
  fontWeight: 600,
  textAlign: "center",
  marginTop: 16,
  marginBottom: 8,
  fontSize: "1.5rem",
  color: COLORS.textPrimary,
});

export const StudentId = styled(Typography)({
  textAlign: "center",
  color: COLORS.textSecondary,
  marginBottom: 24,
  fontSize: "0.875rem",
});

export const InfoCard = styled(Card)({
  height: "100%",
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  "&:hover": {
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
  },
});

export const InfoLabel = styled(Typography)({
  display: "flex",
  alignItems: "center",
  color: COLORS.textSecondary,
  marginBottom: 8,
  fontSize: "0.875rem",
  "& svg": {
    marginRight: 8,
    color: COLORS.primary,
  },
});

export const InfoValue = styled(Typography)({
  fontWeight: 600,
  fontSize: "1.1rem",
  paddingLeft: 28,
  color: COLORS.textPrimary,
});

export const MeritChip = styled(Chip)({
  fontWeight: 600,
  marginTop: 8,
  backgroundColor: COLORS.success,
  color: "#ffffff",
});

export const SectionTitle = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: 600,
  marginBottom: 16,
  color: COLORS.textPrimary,
});

export const StyledDivider = styled(Divider)({
  backgroundColor: COLORS.divider,
  margin: "24px 0",
});

export const TituloCurso = styled("h2")({
  fontSize: "24px",
  fontWeight: "bold",
});

export const NombreProfesor = styled(Typography)({
  fontSize: "20px",
  color: "#888",
  fontStyle: "italic",
  marginBottom: "16px",
});

export const NotasTexto = styled(Typography)({
  fontSize: "16px",
  marginBottom: "4px",
  display: "flex",
  justifyContent: "space-between",
  "& span": {
    fontWeight: "bold",
    paddingLeft: "16px",
  },
  "& span.bajo": { color: "#e53935" },
  "& span.medio": { color: "#ffc107" },
  "& span.alto": { color: "#43a047" },
});

export const NotasDivider = styled("hr")({
  margin: "8px 0",
  border: "none",
  borderBottom: "1px solid #eee",
});

export const StyledAccordion = styled(Accordion)({
  marginBottom: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  borderRadius: "8px !important",
  "&.Mui-expanded": {
    marginBottom: "16px",
  },
});
