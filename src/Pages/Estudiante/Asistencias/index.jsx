"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Container,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Calendar, Clock, UserCheck, UserX } from "lucide-react";
import { styled } from "@mui/material/styles";

// Datos mock para pruebas
const datosAsistenciaMock = {
  "2024-01": [
    { fecha: "2024-01-02", diaSemana: "Martes", estado: "PUNTUAL" },
    { fecha: "2024-01-03", diaSemana: "Miércoles", estado: "PUNTUAL" },
    { fecha: "2024-01-04", diaSemana: "Jueves", estado: "TARDE" },
    { fecha: "2024-01-05", diaSemana: "Viernes", estado: "PUNTUAL" },
    { fecha: "2024-01-08", diaSemana: "Lunes", estado: "AUSENTE" },
    { fecha: "2024-01-09", diaSemana: "Martes", estado: "PUNTUAL" },
    { fecha: "2024-01-10", diaSemana: "Miércoles", estado: "PUNTUAL" },
    { fecha: "2024-01-11", diaSemana: "Jueves", estado: "TARDE" },
    { fecha: "2024-01-12", diaSemana: "Viernes", estado: "PUNTUAL" },
    { fecha: "2024-01-15", diaSemana: "Lunes", estado: "PUNTUAL" },
    { fecha: "2024-01-16", diaSemana: "Martes", estado: "AUSENTE" },
    { fecha: "2024-01-17", diaSemana: "Miércoles", estado: "PUNTUAL" },
    { fecha: "2024-01-18", diaSemana: "Jueves", estado: "PUNTUAL" },
    { fecha: "2024-01-19", diaSemana: "Viernes", estado: "TARDE" },
    { fecha: "2024-01-22", diaSemana: "Lunes", estado: "PUNTUAL" },
    { fecha: "2024-01-23", diaSemana: "Martes", estado: "PUNTUAL" },
    { fecha: "2024-01-24", diaSemana: "Miércoles", estado: "PUNTUAL" },
    { fecha: "2024-01-25", diaSemana: "Jueves", estado: "PUNTUAL" },
    { fecha: "2024-01-26", diaSemana: "Viernes", estado: "PUNTUAL" },
    { fecha: "2024-01-29", diaSemana: "Lunes", estado: "PUNTUAL" },
  ],
  "2024-02": [
    { fecha: "2024-02-01", diaSemana: "Jueves", estado: "PUNTUAL" },
    { fecha: "2024-02-02", diaSemana: "Viernes", estado: "TARDE" },
    { fecha: "2024-02-05", diaSemana: "Lunes", estado: "PUNTUAL" },
    { fecha: "2024-02-06", diaSemana: "Martes", estado: "PUNTUAL" },
    { fecha: "2024-02-07", diaSemana: "Miércoles", estado: "AUSENTE" },
    { fecha: "2024-02-08", diaSemana: "Jueves", estado: "PUNTUAL" },
    { fecha: "2024-02-09", diaSemana: "Viernes", estado: "PUNTUAL" },
    { fecha: "2024-02-12", diaSemana: "Lunes", estado: "TARDE" },
    { fecha: "2024-02-13", diaSemana: "Martes", estado: "PUNTUAL" },
    { fecha: "2024-02-14", diaSemana: "Miércoles", estado: "PUNTUAL" },
    { fecha: "2024-02-15", diaSemana: "Jueves", estado: "AUSENTE" },
    { fecha: "2024-02-16", diaSemana: "Viernes", estado: "PUNTUAL" },
    { fecha: "2024-02-19", diaSemana: "Lunes", estado: "PUNTUAL" },
    { fecha: "2024-02-20", diaSemana: "Martes", estado: "PUNTUAL" },
    { fecha: "2024-02-21", diaSemana: "Miércoles", estado: "TARDE" },
    { fecha: "2024-02-22", diaSemana: "Jueves", estado: "PUNTUAL" },
    { fecha: "2024-02-23", diaSemana: "Viernes", estado: "PUNTUAL" },
    { fecha: "2024-02-26", diaSemana: "Lunes", estado: "PUNTUAL" },
  ],
  "2024-03": [
    { fecha: "2024-03-01", diaSemana: "Viernes", estado: "PUNTUAL" },
    { fecha: "2024-03-04", diaSemana: "Lunes", estado: "TARDE" },
    { fecha: "2024-03-05", diaSemana: "Martes", estado: "PUNTUAL" },
    { fecha: "2024-03-06", diaSemana: "Miércoles", estado: "PUNTUAL" },
    { fecha: "2024-03-07", diaSemana: "Jueves", estado: "AUSENTE" },
    { fecha: "2024-03-08", diaSemana: "Viernes", estado: "PUNTUAL" },
    { fecha: "2024-03-11", diaSemana: "Lunes", estado: "PUNTUAL" },
    { fecha: "2024-03-12", diaSemana: "Martes", estado: "PUNTUAL" },
    { fecha: "2024-03-13", diaSemana: "Miércoles", estado: "TARDE" },
    { fecha: "2024-03-14", diaSemana: "Jueves", estado: "PUNTUAL" },
    { fecha: "2024-03-15", diaSemana: "Viernes", estado: "PUNTUAL" },
    { fecha: "2024-03-18", diaSemana: "Lunes", estado: "AUSENTE" },
    { fecha: "2024-03-19", diaSemana: "Martes", estado: "PUNTUAL" },
    { fecha: "2024-03-20", diaSemana: "Miércoles", estado: "PUNTUAL" },
    { fecha: "2024-03-21", diaSemana: "Jueves", estado: "PUNTUAL" },
    { fecha: "2024-03-22", diaSemana: "Viernes", estado: "TARDE" },
  ],
};

const meses = [
  { value: "2024-01", label: "Enero 2024" },
  { value: "2024-02", label: "Febrero 2024" },
  { value: "2024-03", label: "Marzo 2024" },
];

const COLORES = {
  PUNTUAL: "#4caf50", // Verde
  TARDE: "#ff9800", // Naranja
  AUSENTE: "#f44336", // Rojo
};

// Styled responsive grid replacement
const ResponsiveSection = styled("section")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

const CardColumn = styled("article")(({ theme }) => ({
  flex: "1 1 0",
  minWidth: 0,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    minWidth: "unset",
  },
}));

export default function VistaAsistenciaAlumno() {
  const [mesSeleccionado, setMesSeleccionado] = useState("2024-03");

  const datosDelMes = datosAsistenciaMock[mesSeleccionado] || [];

  const estadisticas = useMemo(() => {
    const total = datosDelMes.length;
    const puntual = datosDelMes.filter((d) => d.estado === "PUNTUAL").length;
    const tarde = datosDelMes.filter((d) => d.estado === "TARDE").length;
    const ausente = datosDelMes.filter((d) => d.estado === "AUSENTE").length;

    return {
      total,
      puntual,
      tarde,
      ausente,
      porcentajePuntual: total > 0 ? Math.round((puntual / total) * 100) : 0,
      porcentajeTarde: total > 0 ? Math.round((tarde / total) * 100) : 0,
      porcentajeAusente: total > 0 ? Math.round((ausente / total) * 100) : 0,
    };
  }, [datosDelMes]);

  const datosGrafico = [
    {
      name: "Puntual",
      value: estadisticas.puntual,
      porcentaje: estadisticas.porcentajePuntual,
      color: COLORES.PUNTUAL,
    },
    {
      name: "Tardanza",
      value: estadisticas.tarde,
      porcentaje: estadisticas.porcentajeTarde,
      color: COLORES.TARDE,
    },
    {
      name: "Ausente",
      value: estadisticas.ausente,
      porcentaje: estadisticas.porcentajeAusente,
      color: COLORES.AUSENTE,
    },
  ].filter((item) => item.value > 0);

  const getEstadoChip = (estado) => {
    switch (estado) {
      case "PUNTUAL":
        return (
          <Chip
            label="Puntual"
            sx={{ backgroundColor: COLORES.PUNTUAL, color: "white" }}
            size="small"
          />
        );
      case "TARDE":
        return (
          <Chip
            label="Tardanza"
            sx={{ backgroundColor: COLORES.TARDE, color: "white" }}
            size="small"
          />
        );
      case "AUSENTE":
        return (
          <Chip
            label="Ausente"
            sx={{ backgroundColor: COLORES.AUSENTE, color: "white" }}
            size="small"
          />
        );
      default:
        return <Chip label="Sin datos" variant="outlined" size="small" />;
    }
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper sx={{ p: 1, border: 1, borderColor: "grey.300" }}>
          <Typography variant="body2">
            {data.name}: {data.value} días ({data.porcentaje}%)
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Mi Asistencia
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Consulta tu historial de asistencia mensual
        </Typography>
      </Box>

      {/* Selector de mes */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Calendar size={24} />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Seleccionar Mes</InputLabel>
              <Select
                value={mesSeleccionado}
                onChange={(e) => setMesSeleccionado(e.target.value)}
                label="Seleccionar Mes"
              >
                {meses.map((mes) => (
                  <MenuItem key={mes.value} value={mes.value}>
                    {mes.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Estadísticas generales */}
      <ResponsiveSection>
        <CardColumn>
          <Card sx={{ textAlign: "center", backgroundColor: "#e8f5e8" }}>
            <CardContent>
              <UserCheck size={32} color={COLORES.PUNTUAL} />
              <Typography
                variant="h4"
                fontWeight="bold"
                color={COLORES.PUNTUAL}
              >
                {estadisticas.porcentajePuntual}%
              </Typography>
              <Typography variant="body2">Puntualidad</Typography>
              <Typography variant="caption" color="text.secondary">
                {estadisticas.puntual} de {estadisticas.total} días
              </Typography>
            </CardContent>
          </Card>
        </CardColumn>
        <CardColumn>
          <Card sx={{ textAlign: "center", backgroundColor: "#fff3e0" }}>
            <CardContent>
              <Clock size={32} color={COLORES.TARDE} />
              <Typography variant="h4" fontWeight="bold" color={COLORES.TARDE}>
                {estadisticas.porcentajeTarde}%
              </Typography>
              <Typography variant="body2">Tardanzas</Typography>
              <Typography variant="caption" color="text.secondary">
                {estadisticas.tarde} de {estadisticas.total} días
              </Typography>
            </CardContent>
          </Card>
        </CardColumn>
        <CardColumn>
          <Card sx={{ textAlign: "center", backgroundColor: "#ffebee" }}>
            <CardContent>
              <UserX size={32} color={COLORES.AUSENTE} />
              <Typography
                variant="h4"
                fontWeight="bold"
                color={COLORES.AUSENTE}
              >
                {estadisticas.porcentajeAusente}%
              </Typography>
              <Typography variant="body2">Ausencias</Typography>
              <Typography variant="caption" color="text.secondary">
                {estadisticas.ausente} de {estadisticas.total} días
              </Typography>
            </CardContent>
          </Card>
        </CardColumn>
      </ResponsiveSection>

      {/* Gráfico y tabla */}
      <ResponsiveSection>
        <CardColumn>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Distribución de Asistencia
              </Typography>
              {datosGrafico.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={datosGrafico}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ porcentaje }) => `${porcentaje}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {datosGrafico.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay datos para mostrar en este mes
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </CardColumn>
        <CardColumn>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Detalle Diario
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Día</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell align="center">Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datosDelMes.length > 0 ? (
                      datosDelMes
                        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
                        .map((dia, index) => (
                          <TableRow key={index} hover>
                            <TableCell>{dia.diaSemana}</TableCell>
                            <TableCell>{formatearFecha(dia.fecha)}</TableCell>
                            <TableCell align="center">
                              {getEstadoChip(dia.estado)}
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          <Typography variant="body2" color="text.secondary">
                            No hay registros para este mes
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </CardColumn>
      </ResponsiveSection>
    </Container>
  );
}
