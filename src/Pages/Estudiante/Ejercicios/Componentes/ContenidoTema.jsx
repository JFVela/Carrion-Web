import { useState } from "react";
import { Card, CardContent, CardHeader, Typography, Box, Grid, Collapse, Divider, Paper } from "@mui/material";
import { Assignment as AssignmentIcon } from "@mui/icons-material";
import TarjetaEjercicio from "./TarjetaEjercicio";
import ejerciciosData from "../data.json";

export default function ContenidoTema({ currentCourse, currentTopic }) {
  const listaEjercicios = ejerciciosData[currentTopic.name] || [];
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);

  // Encontrar el ejercicio seleccionado
  const ejercicioActivo = listaEjercicios.find((ej) => ej.id === ejercicioSeleccionado);

  const handleSeleccionarEjercicio = (id) => {
    setEjercicioSeleccionado(id === ejercicioSeleccionado ? null : id);
  };

  return (
    <Card elevation={2}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AssignmentIcon sx={{ mr: 1, color: currentCourse.color }} />
            <Typography variant="h6">Ejercicios de {currentTopic.name}</Typography>
          </Box>
        }
        sx={{
          bgcolor: "rgba(0,0,0,0.03)",
          borderBottom: `3px solid ${currentCourse.color}`,
        }}
      />
      <CardContent>
        <Collapse in={ejercicioSeleccionado !== null} timeout={300}>
          {ejercicioActivo && (
            <Paper elevation={3} sx={{ p: 2, mb: 3, border: `1px solid ${currentCourse.color}`, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                {ejercicioActivo.label}
              </Typography>
              <Box sx={{ minHeight: "200px" }}>
                <TarjetaEjercicio
                  titulo={ejercicioActivo.label}
                  rutaComponente={ejercicioActivo.id}
                  color={currentCourse.color}
                  seleccionado={true}
                  onSeleccionar={() => handleSeleccionarEjercicio(ejercicioActivo.id)}
                  mostrarSoloContenido={true}
                />
              </Box>
            </Paper>
          )}
        </Collapse>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          {listaEjercicios.map(({ id, label }) => (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <TarjetaEjercicio
                titulo={label}
                rutaComponente={id}
                color={currentCourse.color}
                seleccionado={id === ejercicioSeleccionado}
                onSeleccionar={() => handleSeleccionarEjercicio(id)}
                mostrarSoloContenido={false}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
