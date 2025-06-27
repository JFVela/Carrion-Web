import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { API_ENDPOINTS } from "../../../../api/endpoints";

export default function ModalAsignacionDocente({
  open,
  onClose,
  asignacion,
  onGuardar,
}) {
  // Estados para los datos de la API
  const [docentes, setDocentes] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [grados, setGrados] = useState([]);
  const [cursos, setCursos] = useState([]);

  // Estados de carga
  const [cargandoDocentes, setCargandoDocentes] = useState(false);
  const [cargandoSedes, setCargandoSedes] = useState(false);
  const [cargandoNiveles, setCargandoNiveles] = useState(false);
  const [cargandoGrados, setCargandoGrados] = useState(false);
  const [cargandoCursos, setCargandoCursos] = useState(false);

  // Estados de error
  const [errorCarga, setErrorCarga] = useState("");

  const [formData, setFormData] = useState({
    docenteId: "",
    sedeId: "",
    nivelId: "",
    gradoId: "",
    cursoId: "",
  });

  const [busquedaDocente, setBusquedaDocente] = useState("");
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
  const [errores, setErrores] = useState({});

  // Función para obtener el token
  const obtenerToken = () => {
    return localStorage.getItem("token");
  };

  // Función para manejar errores de API
  const manejarErrorAPI = (error, mensaje) => {
    console.error(mensaje, error);
    setErrorCarga(`${mensaje}: ${error.message}`);
  };

  // Función para obtener docentes
  const obtenerDocentes = async () => {
    setCargandoDocentes(true);
    try {
      const token = obtenerToken();
      const response = await fetch(API_ENDPOINTS.OBTENER_PROFESORES, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener docentes");
      }

      const data = await response.json();
      setDocentes(data);
    } catch (error) {
      manejarErrorAPI(error, "Error al cargar docentes");
    } finally {
      setCargandoDocentes(false);
    }
  };

  // Función para obtener sedes
  const obtenerSedes = async () => {
    setCargandoSedes(true);
    try {
      const token = obtenerToken();
      const response = await fetch(API_ENDPOINTS.OBTENER_SEDES, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener sedes");
      }

      const data = await response.json();
      setSedes(data);
    } catch (error) {
      manejarErrorAPI(error, "Error al cargar sedes");
    } finally {
      setCargandoSedes(false);
    }
  };

  // Función para obtener niveles
  const obtenerNiveles = async () => {
    setCargandoNiveles(true);
    try {
      const token = obtenerToken();
      const response = await fetch(API_ENDPOINTS.OBTENER_NIVEL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener niveles");
      }

      const data = await response.json();
      setNiveles(data);
    } catch (error) {
      manejarErrorAPI(error, "Error al cargar niveles");
    } finally {
      setCargandoNiveles(false);
    }
  };

  // Función para obtener grados
  const obtenerGrados = async () => {
    setCargandoGrados(true);
    try {
      const token = obtenerToken();
      const response = await fetch(API_ENDPOINTS.OBTENER_GRADOS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener grados");
      }

      const data = await response.json();
      setGrados(data);
    } catch (error) {
      manejarErrorAPI(error, "Error al cargar grados");
    } finally {
      setCargandoGrados(false);
    }
  };

  // Función para obtener cursos
  const obtenerCursos = async () => {
    setCargandoCursos(true);
    try {
      const token = obtenerToken();
      const response = await fetch(API_ENDPOINTS.OBTENER_CURSOS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener cursos");
      }

      const data = await response.json();
      setCursos(data);
    } catch (error) {
      manejarErrorAPI(error, "Error al cargar cursos");
    } finally {
      setCargandoCursos(false);
    }
  };

  // Cargar todos los datos cuando se abre el modal
  useEffect(() => {
    if (open) {
      setErrorCarga("");
      obtenerDocentes();
      obtenerSedes();
      obtenerNiveles();
      obtenerGrados();
      obtenerCursos();
    }
  }, [open]);

  // Filtrar docentes según la búsqueda
  const docentesFiltrados = useMemo(() => {
    return docentes.filter(
      (docente) =>
        docente.nombreCompleto
          ?.toLowerCase()
          .includes(busquedaDocente.toLowerCase()) ||
        docente.nombre?.toLowerCase().includes(busquedaDocente.toLowerCase()) ||
        `${docente.nombre} ${docente.apellido1} ${docente.apellido2}`
          .toLowerCase()
          .includes(busquedaDocente.toLowerCase())
    );
  }, [docentes, busquedaDocente]);

  // Cargar datos cuando se abre el modal para editar
  useEffect(() => {
    if (asignacion) {
      setFormData({
        docenteId: asignacion.docenteId || "",
        sedeId: asignacion.sedeId || "",
        nivelId: asignacion.nivelId || "",
        gradoId: asignacion.gradoId || "",
        cursoId: asignacion.cursoId || "",
      });
      setDocenteSeleccionado(asignacion.docenteId || null);
    } else {
      // Resetear el formulario si es una nueva asignación
      setFormData({
        docenteId: "",
        sedeId: "",
        nivelId: "",
        gradoId: "",
        cursoId: "",
      });
      setDocenteSeleccionado(null);
    }
    setBusquedaDocente("");
    setErrores({});
  }, [asignacion, open]);

  const seleccionarDocente = (docente) => {
    setDocenteSeleccionado(docente.id);
    setFormData({
      ...formData,
      docenteId: docente.id,
    });
    // Limpiar error cuando se selecciona un docente
    if (errores.docenteId) {
      setErrores({
        ...errores,
        docenteId: "",
      });
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiar error cuando el usuario selecciona
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: "",
      });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    let esValido = true;

    // Validar campos requeridos
    if (!formData.docenteId) {
      nuevosErrores.docenteId = "Debe seleccionar un docente";
      esValido = false;
    }

    const camposRequeridos = ["sedeId", "nivelId", "gradoId", "cursoId"];
    camposRequeridos.forEach((campo) => {
      if (!formData[campo] || formData[campo].toString().trim() === "") {
        nuevosErrores[campo] = "El campo es obligatorio";
        esValido = false;
      }
    });

    setErrores(nuevosErrores);
    return esValido;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      try {
        onGuardar(formData);
      } catch (error) {
        console.error("Error al procesar asignación:", error);
      }
    }
  };

  // Función para obtener el nombre del docente seleccionado
  const obtenerNombreDocente = (docenteId) => {
    const docente = docentes.find((d) => d.id === docenteId);
    return (
      docente?.nombreCompleto || docente?.nombre || "Docente no encontrado"
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      className="modal-curso"
    >
      <DialogTitle className="modal-titulo">
        {asignacion
          ? "Editar Asignación de Docente"
          : "Nueva Asignación de Docente"}
      </DialogTitle>

      <form onSubmit={manejarEnvio}>
        <DialogContent
          className="modal-contenido"
          sx={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          {errorCarga && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorCarga}
            </Alert>
          )}

          <section className="fila-formulario">
            {/* Columna izquierda - Tabla de docentes */}
            <div className="columna-mitad">
              <section className="seccion-formulario">
                <Typography variant="h6" className="titulo-seccion">
                  Seleccionar Docente
                </Typography>
                <div className="grupo-campos">
                  <div className="campo-completo">
                    <TextField
                      label="Buscar docente"
                      value={busquedaDocente}
                      onChange={(e) => setBusquedaDocente(e.target.value)}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                      placeholder="Escriba el nombre del docente..."
                      disabled={cargandoDocentes}
                    />
                  </div>
                  {errores.docenteId && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, ml: 1.5 }}
                    >
                      {errores.docenteId}
                    </Typography>
                  )}
                  <div className="campo-completo">
                    <Box sx={{ mt: 2, maxHeight: 350, overflow: "auto" }}>
                      {cargandoDocentes ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: 2,
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      ) : (
                        <TableContainer component={Paper} variant="outlined">
                          <Table stickyHeader size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>
                                  ID
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>
                                  Nombre Completo
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {docentesFiltrados.map((docente) => (
                                <TableRow
                                  key={docente.id}
                                  onClick={() => seleccionarDocente(docente)}
                                  sx={{
                                    cursor: "pointer",
                                    backgroundColor:
                                      docenteSeleccionado === docente.id
                                        ? "#e3f2fd"
                                        : "inherit",
                                    "&:hover": {
                                      backgroundColor:
                                        docenteSeleccionado === docente.id
                                          ? "#bbdefb"
                                          : "#f5f5f5",
                                    },
                                  }}
                                >
                                  <TableCell>{docente.id}</TableCell>
                                  <TableCell>
                                    {docente.nombreCompleto ||
                                      `${docente.nombre} ${docente.apellido1} ${docente.apellido2}`}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </Box>
                  </div>
                </div>
              </section>
            </div>

            {/* Columna derecha - Selects */}
            <div className="columna-mitad">
              <section className="seccion-formulario">
                <Typography variant="h6" className="titulo-seccion">
                  Información de Asignación
                </Typography>
                <div className="grupo-campos">
                  {/* Select de Sede */}
                  <div className="campo-completo">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      error={!!errores.sedeId}
                      required
                    >
                      <InputLabel>Sede</InputLabel>
                      <Select
                        name="sedeId"
                        value={formData.sedeId}
                        label="Sede"
                        onChange={manejarCambio}
                        className="campo-formulario"
                        disabled={cargandoSedes}
                      >
                        <MenuItem value="">
                          <em>Seleccione una sede</em>
                        </MenuItem>
                        {sedes.map((sede) => (
                          <MenuItem key={sede.id} value={sede.id}>
                            {sede.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errores.sedeId && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 1.5 }}
                        >
                          {errores.sedeId}
                        </Typography>
                      )}
                    </FormControl>
                  </div>

                  {/* Select de Nivel */}
                  <div className="campo-completo">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      error={!!errores.nivelId}
                      required
                    >
                      <InputLabel>Nivel</InputLabel>
                      <Select
                        name="nivelId"
                        value={formData.nivelId}
                        label="Nivel"
                        onChange={manejarCambio}
                        className="campo-formulario"
                        disabled={cargandoNiveles}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 300,
                              width: 250,
                            },
                          },
                        }}
                      >
                        <MenuItem value="">
                          <em>Seleccione un nivel</em>
                        </MenuItem>
                        {niveles.map((nivel) => (
                          <MenuItem key={nivel.id} value={nivel.id}>
                            {nivel.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errores.nivelId && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 1.5 }}
                        >
                          {errores.nivelId}
                        </Typography>
                      )}
                    </FormControl>
                  </div>

                  {/* Select de Grado */}
                  <div className="campo-completo">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      error={!!errores.gradoId}
                      required
                    >
                      <InputLabel>Grado</InputLabel>
                      <Select
                        name="gradoId"
                        value={formData.gradoId}
                        label="Grado"
                        onChange={manejarCambio}
                        className="campo-formulario"
                        disabled={cargandoGrados}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 300,
                              width: 250,
                            },
                          },
                        }}
                      >
                        <MenuItem value="">
                          <em>Seleccione un grado</em>
                        </MenuItem>
                        {grados.map((grado) => (
                          <MenuItem key={grado.id} value={grado.id}>
                            {grado.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errores.gradoId && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 1.5 }}
                        >
                          {errores.gradoId}
                        </Typography>
                      )}
                    </FormControl>
                  </div>

                  {/* Select de Curso */}
                  <div className="campo-completo">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      error={!!errores.cursoId}
                      required
                    >
                      <InputLabel>Curso</InputLabel>
                      <Select
                        name="cursoId"
                        value={formData.cursoId}
                        label="Curso"
                        onChange={manejarCambio}
                        className="campo-formulario"
                        disabled={cargandoCursos}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 300,
                              width: 250,
                            },
                          },
                        }}
                      >
                        <MenuItem value="">
                          <em>Seleccione un curso</em>
                        </MenuItem>
                        {cursos.map((curso) => (
                          <MenuItem key={curso.id} value={curso.id}>
                            {curso.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errores.cursoId && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 1.5 }}
                        >
                          {errores.cursoId}
                        </Typography>
                      )}
                    </FormControl>
                  </div>

                  {/* Información del docente seleccionado */}
                  {docenteSeleccionado && (
                    <div className="campo-completo">
                      <Box
                        sx={{
                          mt: 2,
                          p: 2,
                          backgroundColor: "#e8f5e8",
                          border: "1px solid #4caf50",
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", color: "#2e7d32" }}
                        >
                          Docente Seleccionado:
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#2e7d32" }}>
                          {obtenerNombreDocente(docenteSeleccionado)}
                        </Typography>
                      </Box>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </section>
        </DialogContent>

        <DialogActions className="modal-acciones">
          <Button onClick={onClose} color="inherit" className="boton-cancelar">
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="boton-guardar"
            disabled={
              cargandoDocentes ||
              cargandoSedes ||
              cargandoNiveles ||
              cargandoGrados ||
              cargandoCursos
            }
          >
            {asignacion ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
