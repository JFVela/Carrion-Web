// componentes/CursoAcordeon.jsx
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  StyledAccordion,
  TituloCurso,
} from "../estilos";
import {
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

export default function CursoAcordeon({ curso, children, index }) {
  return (
    <StyledAccordion key={index} TransitionProps={{ timeout: 0 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}-content`}
        id={`panel${index}-header`}
      >
        <TituloCurso>{curso}</TituloCurso>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
}
