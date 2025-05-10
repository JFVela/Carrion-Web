import { lazy, Suspense, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Grid,
  Collapse,
  Divider,
  Paper,
} from "@mui/material";
import { Assignment as AssignmentIcon } from "@mui/icons-material";
import TarjetaEjercicio from "./TarjetaEjercicio";
import ejerciciosData from "../data.json";

export default function ContenidoTema({ currentCourse, currentTopic }) {
  const listaEjercicios = ejerciciosData[currentTopic.name] || [];
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);

  const Pruebas = lazy(() => import("../6to_Primaria/Física/MRU.jsx"));
  const [holi, setholi] = useState(null);

  const handleClick = (component) => {
    setholi(component);
  };

  // Encontrar el ejercicio seleccionado
  const ejercicioActivo = listaEjercicios.find(
    (ej) => ej.id === ejercicioSeleccionado
  );

  const handleSeleccionarEjercicio = (id) => {
    setEjercicioSeleccionado(id === ejercicioSeleccionado ? null : id);
  };

  return (
    <Card elevation={2}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AssignmentIcon sx={{ mr: 1, color: currentCourse.color }} />
            <Typography variant="h6">
              Ejercicios de {currentTopic.name}
            </Typography>
          </Box>
        }
        sx={{
          bgcolor: "rgba(0,0,0,0.03)",
          borderBottom: `3px solid ${currentCourse.color}`,
        }}
      />
      <CardContent>
        <Typography variant="body1" paragraph>
          {currentTopic.exercises}
        </Typography>

        {/* Área del ejercicio seleccionado */}
        <Collapse in={ejercicioSeleccionado !== null} timeout={300}>
          {ejercicioActivo && (
            <Paper
              elevation={3}
              sx={{
                p: 2,
                mb: 3,
                border: `1px solid ${currentCourse.color}`,
                borderRadius: 2,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  borderBottom: `2px solid ${currentCourse.color}`,
                  pb: 1,
                  mb: 2,
                }}
              >
                {ejercicioActivo.label}
              </Typography>
              <Box sx={{ minHeight: "200px" }}>
                <TarjetaEjercicio
                  titulo={ejercicioActivo.label}
                  rutaComponente={ejercicioActivo.ruta}
                  color={currentCourse.color}
                  seleccionado={true}
                  onSeleccionar={() =>
                    handleSeleccionarEjercicio(ejercicioActivo.id)
                  }
                  mostrarSoloContenido={true}
                />
              </Box>
            </Paper>
          )}
        </Collapse>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Selecciona un ejercicio:
        </Typography>

        {/* Grid de tarjetas de ejercicios */}
        <Grid container spacing={2}>
          {listaEjercicios.map(({ id, label, ruta }) => (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <TarjetaEjercicio
                titulo={label}
                rutaComponente={ruta}
                color={currentCourse.color}
                seleccionado={id === ejercicioSeleccionado}
                onSeleccionar={() => handleSeleccionarEjercicio(id)}
                mostrarSoloContenido={false}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <div>
        <h1>Página de Repaso</h1>
        <div>
          <button onClick={() => handleClick("prueba")}>
            Cargar pruba
          </button>

        </div>

        {/* Aquí se carga el componente dinámicamente */}
        <Suspense fallback={<div>Cargando...</div>}>
          {holi === "prueba" && <Pruebas />}
        </Suspense>
      </div>
    </Card>
  );
}
