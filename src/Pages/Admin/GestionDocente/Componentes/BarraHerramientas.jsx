import { Box, TextField, Button, Chip, InputAdornment } from "@mui/material"
import { Search, Add } from "@mui/icons-material"
import "../Estilos/barraHerramientas.css"

export default function BarraHerramientas({
  busqueda,
  setBusqueda,
  abrirModalAgregar,
  totaldocentes,
  docentesFiltrados,
  mostrarFiltrados,
}) {
  return (
    <Box className="barra-container">
      <Box className="barra-superior">
        {/* Buscador */}
        <TextField
          placeholder="Buscar docentes..."
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

        {/* Botón Agregar */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={abrirModalAgregar}
          className="boton-agregar"
        >
          Agregar docente
        </Button>
      </Box>

      {/* Estadísticas */}
      <Box className="estadisticas">
        <Chip
          label={`Total: ${totaldocentes} docentes`}
          color="primary"
          variant="outlined"
          size="small"
          className="chip-total"
        />

        {mostrarFiltrados && (
          <Chip
            label={`Filtrados: ${docentesFiltrados}`}
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
