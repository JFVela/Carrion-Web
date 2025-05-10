import { lazy, Suspense } from "react";
import { Button, Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import { ArrowForward as ArrowForwardIcon, Close as CloseIcon } from "@mui/icons-material";
import { rutasComponentes } from "../rutasComponentes"; // 👈 Importar el mapa de rutas

export default function TarjetaEjercicio({
  titulo,
  rutaComponente,
  color,
  seleccionado,
  onSeleccionar,
  mostrarSoloContenido = false,
}) {
  // 🚀 Usar el mapa para importar dinámicamente el componente
  const ComponenteEjercicio = seleccionado
    ? lazy(rutasComponentes[rutaComponente])
    : null;

  if (mostrarSoloContenido && seleccionado) {
    return (
      <Suspense
        fallback={
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
            <CircularProgress size={40} sx={{ color }} />
          </Box>
        }
      >
        <ComponenteEjercicio />
      </Suspense>
    );
  }

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        transition: "all 0.3s ease",
        borderColor: seleccionado ? color : "rgba(0, 0, 0, 0.12)",
        borderWidth: seleccionado ? "2px" : "1px",
        boxShadow: seleccionado ? `0 0 8px ${color}40` : "none",
        transform: seleccionado ? "translateY(-4px)" : "none",
        "&:hover": {
          boxShadow: `0 4px 8px rgba(0,0,0,0.1)`,
          transform: "translateY(-2px)",
        },
      }}
      onClick={onSeleccionar}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: seleccionado ? 600 : 400,
            color: seleccionado ? color : "inherit",
          }}
        >
          {titulo}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          size="small"
          variant={seleccionado ? "contained" : "text"}
          endIcon={seleccionado ? <CloseIcon /> : <ArrowForwardIcon />}
          sx={{
            mt: 2,
            alignSelf: "flex-start",
            backgroundColor: seleccionado ? color : "transparent",
            color: seleccionado ? "white" : color,
            "&:hover": {
              backgroundColor: seleccionado ? color : "rgba(0,0,0,0.04)",
            },
          }}
        >
          {seleccionado ? "Cerrar" : "Comenzar"}
        </Button>
      </CardContent>
    </Card>
  );
}
