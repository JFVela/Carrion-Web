//PARA CURSOS
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

//PARA EL RESUMEN
import {
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Typography,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import GroupIcon from "@mui/icons-material/Group";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import styled from "styled-components";

// Color constants
const COLORS = {
  primary: "#1976d2",
  secondary: "#dc004e",
  error: "#f44336",
  warning: "#ff9800",
  success: "#4caf50",
  textPrimary: "#333333",
  textSecondary: "#666666",
  background: "#ffffff",
  cardBackground: "#ffffff",
  divider: "#eeeeee",
};

// Styled components
const SummaryContainer = styled(Paper)({
  padding: 24,
  maxWidth: 800,
  margin: "0 auto",
  borderRadius: 12,
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  background: COLORS.cardBackground,
});

const InstitutionName = styled(Typography)({
  fontWeight: 700,
  color: COLORS.primary,
  textAlign: "center",
  marginBottom: 8,
  fontSize: "2rem",
});

const AcademicYear = styled(Typography)({
  textAlign: "center",
  marginBottom: 24,
  color: COLORS.textSecondary,
  fontSize: "1rem",
});

const StudentAvatar = styled(Avatar)({
  margin: "0 auto",
  border: `3px solid ${COLORS.primary}`,
});

const StudentName = styled(Typography)({
  fontWeight: 600,
  textAlign: "center",
  marginTop: 16,
  marginBottom: 8,
  fontSize: "1.5rem",
  color: COLORS.textPrimary,
});

const StudentId = styled(Typography)({
  textAlign: "center",
  color: COLORS.textSecondary,
  marginBottom: 24,
  fontSize: "0.875rem",
});

const InfoCard = styled(Card)({
  height: "100%",
  borderRadius: 8,
  transition: "transform 0.2s",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  "&:hover": {
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
  },
});

const InfoLabel = styled(Typography)({
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

const InfoValue = styled(Typography)({
  fontWeight: 600,
  fontSize: "1.1rem",
  paddingLeft: 28,
  color: COLORS.textPrimary,
});

const MeritChip = styled(Chip)({
  fontWeight: 600,
  marginTop: 8,
  backgroundColor: COLORS.success,
  color: "#ffffff",
});

const SectionTitle = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: 600,
  marginBottom: 16,
  color: COLORS.textPrimary,
});

const StyledDivider = styled(Divider)({
  backgroundColor: COLORS.divider,
  margin: "24px 0",
});

// Sample data
const studentData = {
  institution: "I.E.P Daniel Alcides Carrión",
  academicYear: "2025",
  studentName: "Carlos Rodríguez Mendoza",
  studentId: "ID: SM-2023-0042",
  photoUrl: "https://randomuser.me/api/portraits/men/42.jpg", // Random student image
  grade: "5to Año de Secundaria",
  section: "Sección A",
  meritRank: 3,
  totalStudents: 45,
  averageGrade: 15,
};

// Function to determine grade color
const getGradeColor = (grade) => {
  if (grade <= 12) return COLORS.error;
  if (grade <= 15) return COLORS.warning;
  return COLORS.success;
};

//PARA LA PARTE DE CURSOS

const TituloCurso = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const NombreProfesor = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  color: "#888",
  fontStyle: "italic",
  marginBottom: "16px",
}));

const NotasTexto = styled(Typography)(({ theme }) => ({
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
}));

const NotasDivider = styled("hr")(({ theme }) => ({
  margin: "8px 0",
  border: "none",
  borderBottom: "1px solid #eee",
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  borderRadius: "8px !important",
  "&.Mui-expanded": {
    marginBottom: "16px",
  },
  transition: "none",
}));

// Array de cursos
const cursos = [
  "Matemáticas",
  "Historia",
  "Lengua",
  "Ciencias",
  "Arte",
  "Música",
  "Educación Física",
];

// Array de profesores
const profesores = ["Prof. García", "Prof. López"];

// Array de notas (cada fila es un curso, cada columna son las notas: [promedio, b1, b2, b3, b4, tareas])
const notas = [
  [17.5, 16, 18, 17, 10, 15],
  [15.2, 14, 15, 16, 17, 19],
  [15.2, 14, 15, 16, 17, 19],
  [15.2, 14, 15, 16, 17, 19],
  [15.2, 14, 15, 16, 17, 19],
  [15.2, 14, 15, 16, 17, 19],
  [15.2, 14, 15, 16, 17, 19],
];

// Función para determinar la clase de color según la nota
const getNotaClass = (nota) => {
  if (nota < 13) return "bajo";
  if (nota < 16) return "medio";
  return "alto";
};

//FIN DE CURSOS

function Cursos() {
  return (
    <>
      <Box sx={{ p: 3 }}>
        <SummaryContainer elevation={0}>
          {/* Header */}
          <InstitutionName variant="h4">
            {studentData.institution}
          </InstitutionName>
          <AcademicYear variant="subtitle1">
            Año Académico {studentData.academicYear}
          </AcademicYear>

          <Divider sx={{ mb: 4 }} />

          {/* Student Info */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <StudentAvatar
              sx={{ width: 100, height: 100 }}
              src={studentData.photoUrl}
              alt={studentData.studentName}
            />
            <StudentName variant="h5">{studentData.studentName}</StudentName>
            <StudentId variant="body2">{studentData.studentId}</StudentId>
          </Box>

          {/* Academic Info */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Resumen Académico
          </Typography>

          <Grid container spacing={0} sx={{ gap: "15px", flexWrap: "wrap" }}>
            <Grid
              item
              xs={12}
              sm={5.9}
              sx={{
                flex: "1 1 calc(50% - 7.5px)",
                minWidth: "200px",
              }}
            >
              <InfoCard>
                <CardContent>
                  <InfoLabel>
                    <SchoolIcon /> Grado
                  </InfoLabel>
                  <InfoValue>{studentData.grade}</InfoValue>

                  <InfoLabel sx={{ mt: 3 }}>
                    <ClassIcon /> Sección
                  </InfoLabel>
                  <InfoValue>{studentData.section}</InfoValue>
                </CardContent>
              </InfoCard>
            </Grid>

            <Grid
              item
              xs={12}
              sm={5.9}
              sx={{
                flex: "1 1 calc(50% - 7.5px)",
                minWidth: "200px",
              }}
            >
              <InfoCard>
                <CardContent>
                  <InfoLabel>
                    <EmojiEventsIcon /> Orden de Mérito
                  </InfoLabel>
                  <InfoValue>
                    {studentData.meritRank} de {studentData.totalStudents}
                  </InfoValue>
                  <Box sx={{ pl: 3.5 }}>
                    <MeritChip
                      label={`Top ${Math.round(
                        (studentData.meritRank / studentData.totalStudents) *
                          100
                      )}%`}
                      size="small"
                    />
                  </Box>

                  <InfoLabel sx={{ mt: 3 }}>
                    <GroupIcon /> Promedio General
                  </InfoLabel>
                  <InfoValue
                    sx={{
                      color: getGradeColor(studentData.averageGrade),
                    }}
                  >
                    {studentData.averageGrade}
                  </InfoValue>
                </CardContent>
              </InfoCard>
            </Grid>
          </Grid>
        </SummaryContainer>
      </Box>
      <Box sx={{ maxWidth: 700, margin: "0 auto", padding: 0 }}>
        {cursos.map((curso, index) => (
          <StyledAccordion key={index} TransitionProps={{ timeout: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <TituloCurso>{curso}</TituloCurso>
            </AccordionSummary>
            <AccordionDetails>
              <NombreProfesor>{profesores[index]}</NombreProfesor>
              <Box mt={2}>
                <NotasTexto>
                  Promedio total:{" "}
                  <span className={getNotaClass(notas[index][0])}>
                    {notas[index][0]}
                  </span>
                </NotasTexto>
                <NotasDivider />
                <NotasTexto>
                  Bimestre 1:{" "}
                  <span className={getNotaClass(notas[index][1])}>
                    {notas[index][1]}
                  </span>
                </NotasTexto>
                <NotasDivider />
                <NotasTexto>
                  Bimestre 2:{" "}
                  <span className={getNotaClass(notas[index][2])}>
                    {notas[index][2]}
                  </span>
                </NotasTexto>
                <NotasDivider />
                <NotasTexto>
                  Bimestre 3:{" "}
                  <span className={getNotaClass(notas[index][3])}>
                    {notas[index][3]}
                  </span>
                </NotasTexto>
                <NotasDivider />
                <NotasTexto>
                  Bimestre 4:{" "}
                  <span className={getNotaClass(notas[index][4])}>
                    {notas[index][4]}
                  </span>
                </NotasTexto>
                <NotasDivider />
                <NotasTexto>
                  Tareas:{" "}
                  <span className={getNotaClass(notas[index][5])}>
                    {notas[index][5]}
                  </span>
                </NotasTexto>
              </Box>
            </AccordionDetails>
            <AccordionActions>
              <Button variant="contained" color="primary">
                Descargar Notas
              </Button>
            </AccordionActions>
          </StyledAccordion>
        ))}
      </Box>
    </>
  );
}

export default Cursos;
