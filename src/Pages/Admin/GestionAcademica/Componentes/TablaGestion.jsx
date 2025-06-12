import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material"
import { Edit, Delete, School, ArrowUpward, ArrowDownward } from "@mui/icons-material"
import { COLUMNAS_TABLA_GESTION } from "../configuracion"
import "../Estilos/tabla.css"

export default function TablaGestionAcademica({
  asignaciones,
  ordenamiento,
  ordenarPor,
  abrirModalEditar,
  eliminarAsignacion,
  busqueda,
}) {
  // Renderizar icono de ordenamiento
  const renderIconoOrdenamiento = (columna) => {
    if (ordenamiento.campo === columna.key) {
      return ordenamiento.direccion === "asc" ? (
        <ArrowUpward fontSize="small" className="sort-icon" />
      ) : (
        <ArrowDownward fontSize="small" className="sort-icon" />
      )
    }
    return null
  }

  // Renderizar celda según el tipo de dato
  const renderCelda = (asignacion, columna) => {
    if (columna.key === "acciones") {
      return (
        <Box className="action-buttons">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => abrirModalEditar(asignacion)}
            className="edit-button"
          >
            <Edit fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => eliminarAsignacion(asignacion.id)}
            className="delete-button"
          >
            <Delete fontSize="small" />
          </Button>
        </Box>
      )
    } else if (columna.key === "cursoNombre") {
      return <Chip label={asignacion[columna.key]} color="primary" variant="outlined" className="curso-chip" />
    } else if (columna.key === "sedeNombre") {
      return (
        <Chip label={asignacion[columna.key]} color="secondary" variant="outlined" size="small" className="sede-chip" />
      )
    } else if (columna.key === "docenteNombre") {
      return (
        <Typography variant="body2" fontWeight="medium" className="nombre-docente">
          {asignacion[columna.key]}
        </Typography>
      )
    } else if (columna.key === "id") {
      return (
        <Typography variant="body2" className="id-text">
          {asignacion[columna.key]}
        </Typography>
      )
    } else if (columna.key === "salonNombre") {
      return (
        <Typography variant="body2" className="salon-text">
          {asignacion[columna.key]}
        </Typography>
      )
    } else {
      return asignacion[columna.key]
    }
  }

  return (
    <div className="tabla-container">
      <Typography variant="h6" className="tabla-titulo">
        Lista de Asignaciones Académicas
      </Typography>

      <TableContainer className="table-container">
        <Table aria-label="tabla de gestión académica" className="tabla-gestion">
          <TableHead>
            <TableRow>
              {COLUMNAS_TABLA_GESTION.map((columna) => (
                <TableCell
                  key={columna.key}
                  onClick={() => columna.sortable && ordenarPor(columna.key)}
                  className={columna.sortable ? "columna-ordenable" : ""}
                >
                  <Box className="header-content">
                    {columna.label}
                    {columna.sortable && renderIconoOrdenamiento(columna)}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {asignaciones.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMNAS_TABLA_GESTION.length} className="empty-state">
                  <Box className="empty-content">
                    <School fontSize="large" className="empty-icon" />
                    <Typography variant="h6">No se encontraron asignaciones</Typography>
                    <Typography variant="body2">
                      {busqueda ? "Intenta con otros términos de búsqueda" : "Comienza agregando una nueva asignación"}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              asignaciones.map((asignacion, index) => (
                <TableRow key={asignacion.id || index} className={index % 2 === 0 ? "row-even" : "row-odd"}>
                  {COLUMNAS_TABLA_GESTION.map((columna) => (
                    <TableCell key={`${asignacion.id || index}-${columna.key}`}>
                      {renderCelda(asignacion, columna)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
