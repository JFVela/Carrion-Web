"use client";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Chip
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";

export default function BarraHerramientas({
  busqueda,
  setBusqueda,
  abrirModalAgregar,
  totalCursos,
  cursosFiltrados,
  mostrarFiltrados,
}) {
  return (
    <Box className="barra-container">
      <Box className="barra-superior">
        <TextField
          placeholder="Buscar cursos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          variant="outlined"
          size="small"
          className="buscador"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={abrirModalAgregar}
          className="boton-agregar"
        >
          Agregar Alumno
        </Button>
      </Box>

      {/* Estadísticas */}
      <Box className="estadisticas">
        <Chip
          label={`Total: ${totalCursos} cursos`}
          color="primary"
          variant="outlined"
          size="small"
          className="chip-total"
        />

        {mostrarFiltrados && (
          <Chip
            label={`Filtrados: ${cursosFiltrados}`}
            color="secondary"
            variant="outlined"
            size="small"
            className="chip-filtrados"
          />
        )}
      </Box>
    </Box>
  );
}
