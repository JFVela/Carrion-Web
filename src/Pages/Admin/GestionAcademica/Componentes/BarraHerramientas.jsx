import { Box, TextField, Button, InputAdornment, Chip } from "@mui/material"
import { Add, Search } from "@mui/icons-material"

export default function BarraHerramientasGestion({
  busqueda,
  setBusqueda,
  abrirModalAgregar,
  totalAsignaciones,
  asignacionesFiltradas,
  mostrarFiltrados,
}) {
  return (
    <Box className="barra-container">
      <Box className="barra-superior">
        <TextField
          placeholder="Buscar asignaciones..."
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
          Nueva Asignación
        </Button>
      </Box>

      {/* Estadísticas */}
      <Box className="estadisticas">
        <Chip
          label={`Total: ${totalAsignaciones} asignaciones`}
          color="primary"
          variant="outlined"
          size="small"
          className="chip-total"
        />

        {mostrarFiltrados && (
          <Chip
            label={`Filtrados: ${asignacionesFiltradas}`}
            color="secondary"
            variant="outlined"
            size="small"
            className="chip-filtrados"
          />
        )}
      </Box>
    </Box>
  )
}
