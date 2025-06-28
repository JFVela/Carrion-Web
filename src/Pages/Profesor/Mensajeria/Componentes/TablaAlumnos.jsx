import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import {
  NotificationsActive,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import "../Estilos/tabla.css";

const COLUMNAS_TABLA = [
  { key: "id", label: "ID", sortable: true },
  { key: "alumno", label: "Alumno", sortable: true },
  { key: "emisor", label: "Emisor", sortable: true },
  { key: "emisor_tipo", label: "Tipo", sortable: true },
  { key: "mensaje", label: "Mensaje", sortable: false },
  { key: "hora_notificacion", label: "Fecha y Hora", sortable: true },
];

export default function TablaNotificaciones({
  notificaciones,
  ordenamiento,
  ordenarPor,
  busqueda,
}) {
  const renderIconoOrdenamiento = (columna) => {
    if (ordenamiento?.campo === columna.key) {
      return ordenamiento.direccion === "asc" ? (
        <ArrowUpward fontSize="small" className="sort-icon" />
      ) : (
        <ArrowDownward fontSize="small" className="sort-icon" />
      );
    }
    return null;
  };

  const renderCelda = (noti, columna) => {
    if (columna.key === "emisor_tipo") {
      return (
        <Chip
          label={noti[columna.key]}
          color={noti[columna.key] === "ADMIN" ? "primary" : "secondary"}
          size="small"
        />
      );
    } else if (columna.key === "hora_notificacion") {
      return new Date(noti[columna.key]).toLocaleString();
    } else {
      return noti[columna.key];
    }
  };

  return (
    <div className="tabla-container">
      <Typography variant="h6" className="tabla-titulo">
        Lista de Notificaciones
      </Typography>

      <TableContainer className="table-container">
        <Table aria-label="tabla de notificaciones" className="tabla-alumnos">
          <TableHead>
            <TableRow>
              {COLUMNAS_TABLA.map((col) => (
                <TableCell
                  key={col.key}
                  onClick={() => col.sortable && ordenarPor?.(col.key)}
                  className={col.sortable ? "columna-ordenable" : ""}
                >
                  <Box className="header-content">
                    {col.label}
                    {col.sortable && renderIconoOrdenamiento(col)}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {notificaciones.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={COLUMNAS_TABLA.length}
                  className="empty-state"
                >
                  <Box className="empty-content">
                    <NotificationsActive
                      fontSize="large"
                      className="empty-icon"
                    />
                    <Typography variant="h6">
                      No se encontraron notificaciones
                    </Typography>
                    <Typography variant="body2">
                      {busqueda
                        ? "Intenta con otros términos de búsqueda"
                        : "Aún no se han registrado notificaciones"}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              notificaciones.map((noti, index) => (
                <TableRow
                  key={noti.id}
                  className={index % 2 === 0 ? "row-even" : "row-odd"}
                >
                  {COLUMNAS_TABLA.map((col) => (
                    <TableCell key={`${noti.id}-${col.key}`}>
                      {renderCelda(noti, col)}
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
