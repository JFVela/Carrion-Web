"use client";

import React, { useState, useMemo } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.min.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookIcon from "@mui/icons-material/Book";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { Container } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FloatingActionButton from "../../Componentes/BotonFlotante";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled from "styled-components";

//PARA CURSOS
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

//PARA EL RESUMEN
import { Paper, Grid, Card, CardContent, Chip } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import GroupIcon from "@mui/icons-material/Group";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

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

const Encabezado = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #343a40;
`;

const Bordes = styled.div`
  border: 1px solid #343a40;
  width: 48%;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  background-color: ${(props) =>
    props.mode === "dark" ? "#c8c8c8" : "#f8f9fa"};

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;

const Titulo = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #343a40;
  text-align: center;
  margin-top: 20px;
  color: ${(props) => (props.mode === "dark" ? "#000000" : "#000000")};
`;

const Titulo2 = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #7b7b7b;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Contenido = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  margin: 10px;
  border: 1px solid #343a40;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
`;

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
  [17.5, 16, 18, 17, 19, 20],
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

function App() {
  const [value, setValue] = useState("1");
  const [mode, setMode] = useState("light");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FloatingActionButton />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
          minHeight: "56px",
        }}
      >
        <FormControl>
          <FormLabel id="demo-theme-toggle">Theme</FormLabel>
          <RadioGroup
            aria-labelledby="demo-theme-toggle"
            name="theme-toggle"
            row
            value={mode}
            onChange={(event) => setMode(event.target.value)}
          >
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </RadioGroup>
        </FormControl>
      </Box>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="scrollable"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="Resumen" value="1" />
            <Tab label="Cursos" value="2" />
            <Tab label="Asistencias" value="3" />
            <Tab label="Trucos" value="4" />
            <Tab label="Ejercicios" value="5" />
          </TabList>
        </Box>
        <Container>
          <TabPanel value="1">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <Encabezado>
                      <h5 className="card-title">Asistencia</h5>
                      <CalendarMonthIcon />
                    </Encabezado>
                    <p className="card-text">92%</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <Encabezado>
                      <h5 className="card-title">Cursos Inscritos</h5>
                      <BookIcon />
                    </Encabezado>
                    <p className="card-text">12 Cursos</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <Encabezado>
                      <h5 className="card-title">Clases Grabadas</h5>
                      <VideoCameraFrontIcon />
                    </Encabezado>
                    <p className="card-text">24 clases</p>
                  </div>
                </div>
              </div>
            </div>
            <Contenido>
              <Bordes mode={mode}>
                <Titulo mode={mode}>Promedio Academico</Titulo>
                <BarChart
                  series={[
                    { data: [16, 14, 18, 12, 15, 19, 17, 13, 16, 11, 20, 10] },
                  ]}
                  height={290}
                  xAxis={[
                    {
                      data: [
                        "Mate",
                        "Comu",
                        "Hist",
                        "Geo",
                        "Física",
                        "Química",
                        "Bio",
                        "Arte",
                        "Música",
                        "Inglés",
                        "EP",
                        "Relig",
                      ],
                      scaleType: "band",
                    },
                  ]}
                  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
              </Bordes>
              <Bordes mode={mode}>
                <Titulo mode={mode}>Actividades Recientes</Titulo>
                <Titulo2>Últimas actualizaciones en tus cursos</Titulo2>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    maxHeight: 225,
                    overflow: "auto",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Juan" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Profesor Juan Figueroa"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            17:00
                          </Typography>
                          {" Tarea para Vectores II"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Carmen" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Profesora Carmen"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            16:00
                          </Typography>
                          {" Tarea Raz. Verbal: pagina 15-25"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="D" src="/static/images/avatar/3.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Profesor David"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            15:00
                          </Typography>
                          {" Tarea en la pagina 15 al 22"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Carmen" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Profesora Carmen"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            16:00
                          </Typography>
                          {" Tarea Raz. Verbal: pagina 15-25"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Carmen" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Profesora Carmen"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            16:00
                          </Typography>
                          {" Tarea Raz. Verbal: pagina 15-25"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Carmen" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Profesora Carmen"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.primary", display: "inline" }}
                          >
                            16:00
                          </Typography>
                          {" Tarea Raz. Verbal: pagina 15-25"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>{" "}
                </List>
              </Bordes>
            </Contenido>
          </TabPanel>
          <TabPanel value="2">
            <ThemeProvider theme={theme}>
              <CssBaseline />
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
                    <StudentName variant="h5">
                      {studentData.studentName}
                    </StudentName>
                    <StudentId variant="body2">
                      {studentData.studentId}
                    </StudentId>
                  </Box>

                  {/* Academic Info */}
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Resumen Académico
                  </Typography>

                  <Grid
                    container
                    spacing={0}
                    sx={{ gap: "15px", flexWrap: "wrap" }}
                  >
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
                            {studentData.meritRank} de{" "}
                            {studentData.totalStudents}
                          </InfoValue>
                          <Box sx={{ pl: 3.5 }}>
                            <MeritChip
                              label={`Top ${Math.round(
                                (studentData.meritRank /
                                  studentData.totalStudents) *
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
            </ThemeProvider>
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
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="4">Item Three</TabPanel>
          <TabPanel value="5">Item Three</TabPanel>
        </Container>
      </TabContext>
    </ThemeProvider>
  );
}

export default App;
