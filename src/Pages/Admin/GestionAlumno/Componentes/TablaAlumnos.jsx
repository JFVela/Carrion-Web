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
import { Edit, Delete, PeopleAlt, ArrowUpward, ArrowDownward } from "@mui/icons-material"
import { COLUMNAS_TABLA } from "../configuracion"
import "../Estilos/tabla.css"

export default function TablaAlumnos({ alumnos, ordenamiento, ordenarPor, abrirModalEditar, busqueda }) {
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
  const renderCelda = (alumno, columna) => {
    if (columna.key === "acciones") {
      return (
        <Box className="action-buttons">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => abrirModalEditar(alumno)}
            className="edit-button"
          >
            <Edit fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            disabled
            className="delete-button"
            title="Función deshabilitada temporalmente"
          >
            <Delete fontSize="small" />
          </Button>
        </Box>
      )
    } else if (columna.key === "gradoSeccion") {
      return <Chip label={alumno[columna.key]} color="primary" variant="outlined" className="grado-chip" />
    } else if (columna.key === "sede") {
      return <Chip label={alumno[columna.key]} color="secondary" variant="outlined" className="sede-chip" />
    } else if (columna.key === "id") {
      return (
        <Typography variant="body2" className="id-text">
          {alumno[columna.key]}
        </Typography>
      )
    } else {
      return alumno[columna.key]
    }
  }

  return (
    <div className="tabla-container">
      <Typography variant="h6" className="tabla-titulo">
        Lista de Alumnos
      </Typography>

      <TableContainer className="table-container">
        <Table aria-label="tabla de alumnos" className="tabla-alumnos">
          <TableHead>
            <TableRow>
              {COLUMNAS_TABLA.map((columna) => (
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
            {alumnos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMNAS_TABLA.length} className="empty-state">
                  <Box className="empty-content">
                    <PeopleAlt fontSize="large" className="empty-icon" />
                    <Typography variant="h6">No se encontraron alumnos</Typography>
                    <Typography variant="body2">
                      {busqueda ? "Intenta con otros términos de búsqueda" : "Comienza agregando un nuevo alumno"}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              alumnos.map((alumno, index) => (
                <TableRow key={alumno.id} className={index % 2 === 0 ? "row-even" : "row-odd"}>
                  {COLUMNAS_TABLA.map((columna) => (
                    <TableCell key={`${alumno.id}-${columna.key}`}>{renderCelda(alumno, columna)}</TableCell>
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
