"use client";

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
} from "@mui/material";
import {
  Edit,
  Delete,
  MenuBook,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { COLUMNAS_TABLA_CURSO } from "../configuracion";
import "../Estilos/tabla.css";

export default function TablaCursos({
  cursos,
  ordenamiento,
  ordenarPor,
  abrirModalEditar,
  busqueda,
}) {
  // Datos para mapear valores a nombres
  const niveles = {
    1: "Primaria",
    2: "Secundaria",
  };

  const areas = {
    1: "Comunicación",
    2: "Matemáticas",
    3: "Ciencias Naturales",
    4: "Ciencias Sociales",
    5: "Arte y Cultura",
    6: "Educación Física",
    7: "Inglés",
    8: "Computación",
  };

  // Renderizar icono de ordenamiento
  const renderIconoOrdenamiento = (columna) => {
    if (ordenamiento.campo === columna.key) {
      return ordenamiento.direccion === "asc" ? (
        <ArrowUpward fontSize="small" className="sort-icon" />
      ) : (
        <ArrowDownward fontSize="small" className="sort-icon" />
      );
    }
    return null;
  };

  // Renderizar celda según el tipo de dato
  const renderCelda = (curso, columna) => {
    if (columna.key === "acciones") {
      return (
        <Box className="action-buttons">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => abrirModalEditar(curso)}
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
      );
    } else if (columna.key === "nivel") {
      const nivelNombre = niveles[curso[columna.key]] || curso[columna.key];
      return (
        <Chip
          label={nivelNombre}
          color={curso[columna.key] === 1 ? "primary" : "secondary"}
          variant="outlined"
          className="nivel-chip"
        />
      );
    } else if (columna.key === "area") {
      const areaNombre = areas[curso[columna.key]] || curso[columna.key];
      return (
        <Chip
          label={areaNombre}
          color="info"
          variant="filled"
          size="small"
          className="area-chip"
          sx={{
            backgroundColor: "#e3f2fd",
            color: "#1976d2",
            fontWeight: "medium",
          }}
        />
      );
    } else if (columna.key === "nombreCurso") {
      return (
        <Typography
          variant="body2"
          fontWeight="medium"
          className="nombre-curso"
        >
          {curso[columna.key]}
        </Typography>
      );
    } else if (columna.key === "id") {
      return (
        <Typography variant="body2" className="id-text">
          {curso[columna.key]}
        </Typography>
      );
    } else {
      return curso[columna.key];
    }
  };

  return (
    <div className="tabla-container">
      <Typography variant="h6" className="tabla-titulo">
        Lista de Cursos
      </Typography>

      <TableContainer className="table-container">
        <Table aria-label="tabla de cursos" className="tabla-cursos">
          <TableHead>
            <TableRow>
              {COLUMNAS_TABLA_CURSO.map((columna) => (
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
            {cursos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={COLUMNAS_TABLA_CURSO.length}
                  className="empty-state"
                >
                  <Box className="empty-content">
                    <MenuBook fontSize="large" className="empty-icon" />
                    <Typography variant="h6">
                      No se encontraron cursos
                    </Typography>
                    <Typography variant="body2">
                      {busqueda
                        ? "Intenta con otros términos de búsqueda"
                        : "Comienza agregando un nuevo curso"}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              cursos.map((curso, index) => (
                <TableRow
                  key={curso.id || index}
                  className={index % 2 === 0 ? "row-even" : "row-odd"}
                >
                  {COLUMNAS_TABLA_CURSO.map((columna) => (
                    <TableCell key={`${curso.id || index}-${columna.key}`}>
                      {renderCelda(curso, columna)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
