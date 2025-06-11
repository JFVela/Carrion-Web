import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Edit,
  Delete,
  PeopleAlt,
  ArrowUpward,
  ArrowDownward,
  Email,
  Phone,
} from "@mui/icons-material";
import { COLUMNAS_TABLA_DOCENTE } from "../configuracion";
import "../Estilos/tabla.css";

export default function TablaDocente({
  docentes,
  ordenamiento,
  ordenarPor,
  abrirModalEditar,
  busqueda,
}) {
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
  const renderCelda = (docente, columna) => {
    if (columna.key === "acciones") {
      return (
        <Box className="action-buttons">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => abrirModalEditar(docente)}
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
    } else if (columna.key === "dni") {
      return (
        <Typography variant="body2" fontWeight="medium">
          {docente[columna.key]}
        </Typography>
      );
    } else if (columna.key === "telefono") {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Phone fontSize="small" color="action" />
          <Typography variant="body2">{docente[columna.key]}</Typography>
        </Box>
      );
    } else if (columna.key === "correoElectronico") {
      return (
        <Tooltip title={docente[columna.key]} arrow>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              maxWidth: 200,
              overflow: "hidden",
            }}
          >
            <Email fontSize="small" color="action" />
            <Typography variant="body2" noWrap>
              {docente[columna.key]}
            </Typography>
          </Box>
        </Tooltip>
      );
    } else {
      return docente[columna.key];
    }
  };

  return (
    <div className="tabla-container">
      <Typography variant="h6" className="tabla-titulo">
        Lista de Docentes
      </Typography>

      <TableContainer className="table-container">
        <Table aria-label="tabla de docentes" className="tabla-docentes">
          <TableHead>
            <TableRow>
              {COLUMNAS_TABLA_DOCENTE.map((columna) => (
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
            {docentes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={COLUMNAS_TABLA_DOCENTE.length}
                  className="empty-state"
                >
                  <Box className="empty-content">
                    <PeopleAlt fontSize="large" className="empty-icon" />
                    <Typography variant="h6">
                      No se encontraron docentes
                    </Typography>
                    <Typography variant="body2">
                      {busqueda
                        ? "Intenta con otros términos de búsqueda"
                        : "Comienza agregando un nuevo docente"}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              docentes.map((docente, index) => (
                <TableRow
                  key={docente.id || index}
                  className={index % 2 === 0 ? "row-even" : "row-odd"}
                >
                  {COLUMNAS_TABLA_DOCENTE.map((columna) => (
                    <TableCell key={`${docente.id || index}-${columna.key}`}>
                      {renderCelda(docente, columna)}
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
