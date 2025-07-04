import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer as MuiTableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import {
  School,
  People,
  TrendingUp,
  Assignment,
  CalendarToday,
  Star,
  Visibility,
  Email,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

// Tema personalizado con morado
const theme = createTheme({
  palette: {
    primary: {
      main: "#7b1fa2", // Morado principal
      light: "#ae52d4",
      dark: "#4a0e4e",
    },
    secondary: {
      main: "#e1bee7", // Morado claro
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
});

// Styled Components
const DashboardContainer = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

const HeaderSection = styled("section")(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
}));

const StatsSection = styled("section")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const StatCard = styled(Card)(({ theme }) => ({
  flex: "1 1 250px",
  minWidth: "250px",
  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
  border: `2px solid ${theme.palette.primary.light}`,
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const ContentSection = styled("section")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const ChartContainer = styled("div")({
  flex: "1 1 400px",
  minWidth: "400px",
});

const StyledTableContainer = styled("div")({
  flex: "1 1 500px",
  minWidth: "500px",
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

// Datos mock
const datosProfesor = {
  nombre: "Prof. María González",
  especialidad: "Matemáticas y Física",
  email: "maria.gonzalez@colegio.edu",
  experiencia: "8 años",
  grados: ["3° Secundaria", "4° Secundaria", "5° Secundaria"],
};

const estadisticasGenerales = {
  totalAlumnos: 85,
  promedioAsistencia: 87,
  promedioNotas: 14.2,
  cursosActivos: 6,
};

const datosAsistencia = [
  { name: "Presente", value: 74, color: "#4caf50" },
  { name: "Tardanza", value: 8, color: "#ff9800" },
  { name: "Ausente", value: 3, color: "#f44336" },
];

const promediosPorGrado = [
  { grado: "3° Sec", promedio: 13.8, alumnos: 28 },
  { grado: "4° Sec", promedio: 14.5, alumnos: 30 },
  { grado: "5° Sec", promedio: 14.3, alumnos: 27 },
];

const alumnosDestacados = [
  {
    id: 1,
    nombre: "Ana Pérez",
    grado: "5° Secundaria",
    promedio: 18.5,
    asistencia: 98,
    estado: "Excelente",
  },
  {
    id: 2,
    nombre: "Carlos Ruiz",
    grado: "4° Secundaria",
    promedio: 17.2,
    asistencia: 95,
    estado: "Muy Bueno",
  },
  {
    id: 3,
    nombre: "Lucía Torres",
    grado: "3° Secundaria",
    promedio: 16.8,
    asistencia: 92,
    estado: "Muy Bueno",
  },
  {
    id: 4,
    nombre: "Diego Morales",
    grado: "5° Secundaria",
    promedio: 15.9,
    asistencia: 88,
    estado: "Bueno",
  },
  {
    id: 5,
    nombre: "Sofía Vargas",
    grado: "4° Secundaria",
    promedio: 15.5,
    asistencia: 90,
    estado: "Bueno",
  },
];

function PaginaProfe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token || rol !== "Profesor") {
      navigate("/login");
    } else {
      // Simular carga de datos
      setTimeout(() => setLoading(false), 1000);
    }
  }, [navigate]);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Excelente":
        return "#4caf50";
      case "Muy Bueno":
        return "#2196f3";
      case "Bueno":
        return "#ff9800";
      default:
        return "#757575";
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper sx={{ p: 1, border: 1, borderColor: "grey.300" }}>
          <Typography variant="body2">
            {data.name}: {data.value} estudiantes
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <DashboardContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Typography variant="h6" color="primary">
              Cargando dashboard...
            </Typography>
          </Box>
        </DashboardContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <DashboardContainer>
        {/* Header del Profesor */}
        <HeaderSection>
          <Avatar
            sx={{ width: 80, height: 80, bgcolor: "rgba(255,255,255,0.2)" }}
          >
            <School fontSize="large" />
          </Avatar>
          <div>
            <Typography variant="h4" fontWeight="bold">
              {datosProfesor.nombre}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
              {datosProfesor.especialidad}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Chip
                label={`${datosProfesor.experiencia} de experiencia`}
                sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
              />
              <Chip
                label={`${estadisticasGenerales.cursosActivos} cursos activos`}
                sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
              />
            </Box>
          </div>
        </HeaderSection>

        {/* Estadísticas Principales */}
        <StatsSection>
          <StatCard>
            <CardContent sx={{ textAlign: "center" }}>
              <People sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
              <Typography variant="h4" color="primary" fontWeight="bold">
                {estadisticasGenerales.totalAlumnos}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Total de Alumnos
              </Typography>
            </CardContent>
          </StatCard>

          <StatCard>
            <CardContent sx={{ textAlign: "center" }}>
              <CalendarToday
                sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
              />
              <Typography variant="h4" color="primary" fontWeight="bold">
                {estadisticasGenerales.promedioAsistencia}%
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Asistencia Promedio
              </Typography>
            </CardContent>
          </StatCard>

          <StatCard>
            <CardContent sx={{ textAlign: "center" }}>
              <TrendingUp sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
              <Typography variant="h4" color="primary" fontWeight="bold">
                {estadisticasGenerales.promedioNotas}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Promedio General
              </Typography>
            </CardContent>
          </StatCard>

          <StatCard>
            <CardContent sx={{ textAlign: "center" }}>
              <Assignment sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
              <Typography variant="h4" color="primary" fontWeight="bold">
                {datosProfesor.grados.length}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Grados que Enseña
              </Typography>
            </CardContent>
          </StatCard>
        </StatsSection>

        {/* Gráficos y Datos */}
        <ContentSection>
          {/* Gráfico de Asistencia */}
          <ChartContainer>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <SectionTitle variant="h6">
                  <CalendarToday />
                  Distribución de Asistencia
                </SectionTitle>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={datosAsistencia}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {datosAsistencia.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </ChartContainer>

          {/* Gráfico de Promedios por Grado */}
          <ChartContainer>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <SectionTitle variant="h6">
                  <TrendingUp />
                  Promedios por Grado
                </SectionTitle>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={promediosPorGrado}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grado" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="promedio"
                      fill={theme.palette.primary.main}
                      name="Promedio"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </ChartContainer>
        </ContentSection>

        {/* Tabla de Alumnos Destacados */}
        <StyledTableContainer>
          <Card>
            <CardContent>
              <SectionTitle variant="h6">
                <Star />
                Alumnos Destacados
              </SectionTitle>
              <MuiTableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Alumno</TableCell>
                      <TableCell>Grado</TableCell>
                      <TableCell align="center">Promedio</TableCell>
                      <TableCell align="center">Asistencia</TableCell>
                      <TableCell align="center">Estado</TableCell>
                      <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {alumnosDestacados.map((alumno) => (
                      <TableRow key={alumno.id} hover>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "primary.light",
                              }}
                            >
                              {alumno.nombre.charAt(0)}
                            </Avatar>
                            {alumno.nombre}
                          </Box>
                        </TableCell>
                        <TableCell>{alumno.grado}</TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            color="primary"
                          >
                            {alumno.promedio}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <LinearProgress
                              variant="determinate"
                              value={alumno.asistencia}
                              sx={{ width: 60, height: 6, borderRadius: 3 }}
                            />
                            <Typography variant="caption">
                              {alumno.asistencia}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={alumno.estado}
                            size="small"
                            sx={{
                              bgcolor: getEstadoColor(alumno.estado),
                              color: "white",
                              fontWeight: "bold",
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Ver detalles">
                            <IconButton size="small" color="primary">
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Enviar mensaje">
                            <IconButton size="small" color="primary">
                              <Email />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </MuiTableContainer>
            </CardContent>
          </Card>
        </StyledTableContainer>

        {/* Información de Grados */}
        <ContentSection>
          <div style={{ flex: "1 1 100%" }}>
            <Card>
              <CardContent>
                <SectionTitle variant="h6">
                  <School />
                  Grados y Secciones Asignadas
                </SectionTitle>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {promediosPorGrado.map((grado, index) => (
                    <Card
                      key={index}
                      sx={{
                        minWidth: 200,
                        border: 2,
                        borderColor: "primary.light",
                        "&:hover": { boxShadow: 4 },
                      }}
                    >
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h6"
                          color="primary"
                          fontWeight="bold"
                        >
                          {grado.grado}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ mb: 1 }}
                        >
                          {grado.alumnos} estudiantes
                        </Typography>
                        <Typography variant="h5" color="primary">
                          {grado.promedio}
                        </Typography>
                        <Typography variant="caption">
                          Promedio del grado
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </div>
        </ContentSection>
      </DashboardContainer>
    </ThemeProvider>
  );
}

export default PaginaProfe;
