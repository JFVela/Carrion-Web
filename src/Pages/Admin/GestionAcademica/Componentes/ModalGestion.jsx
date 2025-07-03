import React, { useState, useEffect, useMemo } from "react";
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
  isEditing = false,
}) {
  const token = localStorage.getItem("token");

  // Listas maestras sólo para creación
  const [sedes, setSedes] = useState([]);
  const [niveles, setNiveles] = useState([]);

  // Docentes siempre necesarios para cambio
  const [docentes, setDocentes] = useState([]);

  // Dependientes de nivel
  const [grados, setGrados] = useState([]);
  const [cursos, setCursos] = useState([]);

  // Estado de carga y error
  const [loading, setLoading] = useState({
    sedes: false,
    niveles: false,
    docentes: false,
    grados: false,
    cursos: false,
  });
  const [errorCarga, setErrorCarga] = useState("");

  // Formulario y errores de validación
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

  // Helper de fetch
  const fetchData = async (url, setter, key, label) => {
    setLoading((l) => ({ ...l, [key]: true }));
    try {
      const resp = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (!resp.ok) throw new Error(label);
      const data = await resp.json();
      setter(data);
    } catch (e) {
      setErrorCarga(`${label}: ${e.message}`);
    } finally {
      setLoading((l) => ({ ...l, [key]: false }));
    }
  };

  // Carga inicial cuando se abre el modal
  useEffect(() => {
    if (!open) return;
    setErrorCarga("");

    // Siempre cargar docentes para poder editar profesor
    fetchData(API_ENDPOINTS.OBTENER_PROFESORES, setDocentes, "docentes", "docentes");

    // Sólo en creación cargar sedes y niveles completos
    if (!isEditing) {
      fetchData(API_ENDPOINTS.OBTENER_SEDES, setSedes, "sedes", "sedes");
      fetchData(API_ENDPOINTS.OBTENER_NIVEL, setNiveles, "niveles", "niveles");
    }
  }, [open]);

  // Cargar grados y cursos cuando cambia nivelId (solo si CREACIÓN)
  useEffect(() => {
    if (isEditing) return;
    if (!formData.nivelId) {
      setGrados([]);
      setCursos([]);
      return;
    }
    // 1) grados por nivel
    fetchData(
      `${API_ENDPOINTS.OBTENER_GRADOSV2}?id_nivel=${formData.nivelId}`,
      setGrados,
      "grados",
      "grados"
    );
    // 2) cursos por nivel
    fetchData(
      `${API_ENDPOINTS.OBTENER_CURSOSV2}?nivel=${formData.nivelId}`,
      setCursos,
      "cursos",
      "cursos"
    );
  }, [formData.nivelId, isEditing]);

  // Inicializar valores al abrir el modal (creación o edición)
  useEffect(() => {
    if (!open) return;
    if (asignacion) {
      // Edición: precargar sólo el valor existente
      const { id_profesor, id_sede, id_nivel, id_grado, id_curso, nombre_sede, nombre_nivel, nombre_grado, nombre_curso } = asignacion;
      setFormData({ docenteId: id_profesor, sedeId: id_sede, nivelId: id_nivel, gradoId: id_grado, cursoId: id_curso });
      setDocenteSeleccionado(id_profesor);
      // Precargar sedes y niveles para que el select muestre el valor actual
      setSedes([{ id: id_sede, nombre: nombre_sede }]);
      setNiveles([{ id: id_nivel, nombre: nombre_nivel }]);
      // Precargar grado y curso sin llamadas adicionales
      setGrados([{ id: id_grado, nombre: nombre_grado }]);
      setCursos([{ id: id_curso, nombre: nombre_curso }]);
    } else {
      // Creación: limpiar formulario y listas dependientes
      setFormData({ docenteId: "", sedeId: "", nivelId: "", gradoId: "", cursoId: "" });
      setDocenteSeleccionado(null);
      setSedes([]);
      setNiveles([]);
      setGrados([]);
      setCursos([]);
    }
    setBusquedaDocente("");
    setErrores({});
  }, [asignacion, open]);

  // Filtrar docentes por búsqueda
  const docentesFiltrados = useMemo(
    () => docentes.filter((d) =>
      (d.nombreCompleto || `${d.nombre} ${d.apellido1} ${d.apellido2}`)
        .toLowerCase()
        .includes(busquedaDocente.toLowerCase())
    ),
    [docentes, busquedaDocente]
  );

  const seleccionarDocente = (d) => {
    setDocenteSeleccionado(d.id);
    setFormData((f) => ({ ...f, docenteId: d.id }));
    setErrores((e) => ({ ...e, docenteId: "" }));
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    setErrores((e) => ({ ...e, [name]: "" }));
  };

  const validar = () => {
    const err = {};
    if (!formData.docenteId) err.docenteId = "Debe seleccionar un docente";
    if (!asignacion) {
      ["sedeId", "nivelId", "gradoId", "cursoId"].forEach((c) => {
        if (!formData[c]) err[c] = "Obligatorio";
      });
    }
    setErrores(err);
    return !Object.keys(err).length;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) return;
    onGuardar(formData);
  };

  const obtenerNombreDocente = (id) => {
    const d = docentes.find((x) => x.id === id);
    return d?.nombreCompleto || `${d?.nombre} ${d?.apellido1}` || "";
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{asignacion ? "Editar Asignación" : "Nueva Asignación"}</DialogTitle>
      <form onSubmit={manejarEnvio}>
        <DialogContent sx={{ overflowY: "auto", maxHeight: "70vh" }}>
          {errorCarga && <Alert severity="error">{errorCarga}</Alert>}
          <Box display="flex" gap={2}>
            {/* Izquierda: docentes */}
            <Box flex={1}>
              <TextField
                label="Buscar docente"
                fullWidth
                margin="dense"
                value={busquedaDocente}
                onChange={(e) => setBusquedaDocente(e.target.value)}
                disabled={loading.docentes}
              />
              <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow><TableCell>ID</TableCell><TableCell>Docente</TableCell></TableRow>
                  </TableHead>
                  <TableBody>
                    {loading.docentes ? (
                      <TableRow><TableCell colSpan={2} align="center"><CircularProgress size={24}/></TableCell></TableRow>
                    ) : (docentesFiltrados.map((d) => (
                      <TableRow
                        key={d.id}
                        onClick={() => seleccionarDocente(d)}
                        sx={{ cursor: "pointer", backgroundColor: d.id === docenteSeleccionado ? "rgba(0,0,255,0.1)" : "inherit" }}
                      >
                        <TableCell>{d.id}</TableCell>
                        <TableCell>{obtenerNombreDocente(d.id)}</TableCell>
                      </TableRow>
                    )))}
                  </TableBody>
                </Table>
              </TableContainer>
              {errores.docenteId && <Typography color="error">{errores.docenteId}</Typography>}
            </Box>
            {/* Derecha: selects */}
            <Box flex={1}>
              <FormControl fullWidth margin="dense" disabled={isEditing || loading.sedes} error={!!errores.sedeId}>
                <InputLabel>Sede</InputLabel>
                <Select name="sedeId" value={formData.sedeId} label="Sede" onChange={manejarCambio}>
                  <MenuItem value=""><em>Seleccione</em></MenuItem>
                  {sedes.map((s) => (<MenuItem key={s.id} value={s.id}>{s.nombre}</MenuItem>))}
                </Select>
                {errores.sedeId && <Typography color="error">{errores.sedeId}</Typography>}
              </FormControl>

              <FormControl fullWidth margin="dense" disabled={isEditing || loading.niveles} error={!!errores.nivelId}>
                <InputLabel>Nivel</InputLabel>
                <Select name="nivelId" value={formData.nivelId} label="Nivel" onChange={manejarCambio}>
                  <MenuItem value=""><em>Seleccione</em></MenuItem>
                  {niveles.map((n) => (<MenuItem key={n.id} value={n.id}>{n.nombre}</MenuItem>))}
                </Select>
                {errores.nivelId && <Typography color="error">{errores.nivelId}</Typography>}
              </FormControl>

              <FormControl fullWidth margin="dense" disabled={isEditing || loading.grados} error={!!errores.gradoId}>
                <InputLabel>Grado</InputLabel>
                <Select name="gradoId" value={formData.gradoId} label="Grado" onChange={manejarCambio}>
                  <MenuItem value=""><em>Seleccione</em></MenuItem>
                  {grados.map((g) => (<MenuItem key={g.id} value={g.id}>{g.nombre}</MenuItem>))}
                </Select>
                {errores.gradoId && <Typography color="error">{errores.gradoId}</Typography>}
              </FormControl>

              <FormControl fullWidth margin="dense" disabled={isEditing || loading.cursos} error={!!errores.cursoId}>
                <InputLabel>Curso</InputLabel>
                <Select name="cursoId" value={formData.cursoId} label="Curso" onChange={manejarCambio}>
                  <MenuItem value=""><em>Seleccione</em></MenuItem>
                  {cursos.map((c) => (<MenuItem key={c.id} value={c.id}>{c.nombre}</MenuItem>))}
                </Select>
                {errores.cursoId && <Typography color="error">{errores.cursoId}</Typography>}
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={Object.values(loading).some(x => x)}>
            {asignacion ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
