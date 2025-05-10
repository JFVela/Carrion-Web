"use client";

import { useState } from "react";
import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import { MenuBook as MenuBookIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import BarraNavegacion from "./Componentes/BarraNavegacion";
import SelectorCursos from "./Componentes/SelectorCursos";
import SelectorTemas from "./Componentes/SelectorTemas";
import ContenidoTema from "./Componentes/ContenidoTema";
import CabeceraSeccion from "./Componentes/CabeceraSeccion";

// Datos de ejemplo
const coursesData = [
  {
    id: 1,
    name: "Matemáticas",
    icon: "📐",
    color: "#4caf50",
    topics: [
      {
        id: 101,
        name: "Álgebra",
      },
      {
        id: 102,
        name: "Geometría",
      },
      {
        id: 103,
        name: "Cálculo",
      },
    ],
  },
  {
    id: 2,
    name: "Ciencias",
    icon: "🧪",
    color: "#2196f3",
    topics: [
      {
        id: 201,
        name: "Física",
      },
      {
        id: 202,
        name: "Química",
      },
      {
        id: 203,
        name: "Biología",
      },
    ],
  },
  {
    id: 3,
    name: "Historia",
    icon: "🏛️",
    color: "#ff9800",
    topics: [
      {
        id: 301,
        name: "Historia Antigua",
      },
      {
        id: 302,
        name: "Historia Moderna",
      },
      {
        id: 303,
        name: "Historia Contemporánea",
      },
    ],
  },
  {
    id: 4,
    name: "Lenguaje",
    icon: "📝",
    color: "#e91e63",
    topics: [
      {
        id: 401,
        name: "Gramática",
      },
      {
        id: 402,
        name: "Literatura",
      },
      {
        id: 403,
        name: "Comprensión Lectora",
      },
    ],
  },
];

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
});

function App() {
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(0);

  const handleCourseChange = (event, newValue) => {
    setSelectedCourse(newValue);
    setSelectedTopic(0); // Reset topic selection when changing course
  };

  const handleTopicChange = (event, newValue) => {
    setSelectedTopic(newValue);
  };

  const currentCourse = coursesData[selectedCourse];
  const currentTopic = currentCourse.topics[selectedTopic];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
        <BarraNavegacion />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <MenuBookIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" component="h1">
                Selecciona un curso para practicar
              </Typography>
            </Box>

            {/* Tabs de cursos */}
            <SelectorCursos
              coursesData={coursesData}
              selectedCourse={selectedCourse}
              handleCourseChange={handleCourseChange}
              theme={theme}
            />

            <Divider sx={{ mb: 3 }} />

            {/* Contenido del curso seleccionado */}
            <Box sx={{ mb: 3 }}>
              <CabeceraSeccion currentCourse={currentCourse} />

              {/* Tabs de temas */}
              <SelectorTemas
                currentCourse={currentCourse}
                selectedTopic={selectedTopic}
                handleTopicChange={handleTopicChange}
                theme={theme}
              />

              {/* Contenido del tema seleccionado */}
              <ContenidoTema
                currentCourse={currentCourse}
                currentTopic={currentTopic}
              />
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
