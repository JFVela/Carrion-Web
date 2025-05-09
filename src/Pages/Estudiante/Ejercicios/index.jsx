"use client"

import { useState } from "react"
import { Box, Container, Divider, Paper, Typography, useMediaQuery } from "@mui/material"
import { MenuBook as MenuBookIcon } from "@mui/icons-material"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import BarraNavegacion from "./Componentes/BarraNavegacion"
import SelectorCursos from "./Componentes/SelectorCursos"
import SelectorTemas from "./Componentes/SelectorTemas"
import ContenidoTema from "./Componentes/ContenidoTema"
import CabeceraSeccion from "./Componentes/CabeceraSeccion"

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
        exercises:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
      },
      {
        id: 102,
        name: "Geometría",
        exercises:
          "Praesent eget risus vitae massa semper aliquam quis mattis quam. Morbi vitae tortor tempus, placerat leo et, suscipit lectus. Phasellus ut euismod massa, eu eleifend ipsum. Nulla eu neque commodo, dapibus lectus nec, hendrerit magna. Praesent eget risus vitae massa semper aliquam quis mattis quam. Morbi vitae tortor tempus, placerat leo et, suscipit lectus. Phasellus ut euismod massa, eu eleifend ipsum.",
      },
      {
        id: 103,
        name: "Cálculo",
        exercises:
          "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
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
        exercises:
          "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
      },
      {
        id: 202,
        name: "Química",
        exercises:
          "Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Curabitur aliquet quam id dui posuere blandit.",
      },
      {
        id: 203,
        name: "Biología",
        exercises:
          "Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
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
        exercises:
          "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
      },
      {
        id: 302,
        name: "Historia Moderna",
        exercises:
          "Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.",
      },
      {
        id: 303,
        name: "Historia Contemporánea",
        exercises:
          "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
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
        exercises:
          "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
      },
      {
        id: 402,
        name: "Literatura",
        exercises:
          "Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat.",
      },
      {
        id: 403,
        name: "Comprensión Lectora",
        exercises:
          "Sed porttitor lectus nibh. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Sed porttitor lectus nibh. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
      },
    ],
  },
]

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
})

function App() {
  const [selectedCourse, setSelectedCourse] = useState(0)
  const [selectedTopic, setSelectedTopic] = useState(0)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleCourseChange = (event, newValue) => {
    setSelectedCourse(newValue)
    setSelectedTopic(0) // Reset topic selection when changing course
  }

  const handleTopicChange = (event, newValue) => {
    setSelectedTopic(newValue)
  }

  const currentCourse = coursesData[selectedCourse]
  const currentTopic = currentCourse.topics[selectedTopic]

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
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Elige un curso y tema para reforzar tu aprendizaje con ejercicios prácticos.
            </Typography>

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
              <ContenidoTema currentCourse={currentCourse} currentTopic={currentTopic} />
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
