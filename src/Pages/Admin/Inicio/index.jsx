import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import {
  Person as PersonaIcon,
  School as EscuelaIcon,
  AssignmentTurnedIn as TareasIcon,
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TarjetaEstadistica from "./Componentes/TarjetaEstadistica";
import GraficoMatricula from "./Componentes/GraficoMatricula";
import GraficoCalificaciones from "./Componentes/GraficoCalificaion";
import GraficoAsistencia from "./Componentes/GraficoAsistencia";

// Tema profesional con colores corporativos
const tema = createTheme({
  palette: {
    primary: {
      main: "#1565c0",
      light: "#5e92f3",
      dark: "#003c8f",
    },
    secondary: {
      main: "#37474f",
      light: "#62727b",
      dark: "#102027",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    success: {
      main: "#2e7d32",
      light: "#60ad5e",
      dark: "#005005",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: "#1565c0",
    },
    h6: {
      fontWeight: 500,
      color: "#37474f",
    },
  },
});

// Componentes estilizados
const ContenedorDashboard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
}));

const SeccionEstadisticas = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(3),
}));

const SeccionGraficos = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const ContenedorGrafico = styled(Paper)(({ theme }) => ({
  flex: "1 1 calc(50% - 12px)", // 50% menos la mitad del gap
  minWidth: "400px", // Ancho mínimo antes de apilarse
  minHeight: "320px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2.5),
}));

function PaginaInicio() {
  //VALIDA EL USUARIO
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const rol = localStorage.getItem("rol");

  //   if (!token || rol !== "Admin") {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const tema = useTheme();

  // Datos estadísticos
  const estadisticas = [
    {
      titulo: "Total Estudiantes",
      valor: 1250,
      icono: <EscuelaIcon />,
      color: tema.palette.primary.main,
    },
    {
      titulo: "Docentes Activos",
      valor: 78,
      icono: <PersonaIcon />,
      color: tema.palette.secondary.main,
    },
    {
      titulo: "Asistencia Promedio",
      valor: "92%",
      icono: <TareasIcon />,
      color: tema.palette.success.main,
    },
  ];

  return (
    <ThemeProvider theme={tema}>
      <ContenedorDashboard>
        <SeccionEstadisticas>
          {estadisticas.map((estadistica, indice) => (
            <TarjetaEstadistica
              key={indice}
              titulo={estadistica.titulo}
              valor={estadistica.valor}
              icono={estadistica.icono}
              color={estadistica.color}
            />
          ))}
        </SeccionEstadisticas>

        <SeccionGraficos>
          <ContenedorGrafico>
            <Typography variant="h6" gutterBottom>
              Distribución de Estudiantes por Grado
            </Typography>
            <Box sx={{ flex: 1, minHeight: "270px" }}>
              <GraficoMatricula />
            </Box>
          </ContenedorGrafico>

          <ContenedorGrafico>
            <Typography variant="h6" gutterBottom>
              Distribución de Calificaciones
            </Typography>
            <Box sx={{ flex: 1, minHeight: "270px" }}>
              <GraficoCalificaciones />
            </Box>
          </ContenedorGrafico>
        </SeccionGraficos>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <ContenedorGrafico sx={{ flex: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tendencia de Asistencia Mensual
            </Typography>
            <Box sx={{ flex: 1, minHeight: "270px" }}>
              <GraficoAsistencia />
            </Box>
          </ContenedorGrafico>
        </Box>
      </ContenedorDashboard>
    </ThemeProvider>
  );
}

export default PaginaInicio;
