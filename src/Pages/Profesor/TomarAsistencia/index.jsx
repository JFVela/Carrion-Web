import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  TextField,
  Alert,
  Box,
  Grid,
  Paper,
  CircularProgress,
  Container,
} from "@mui/material";
import {
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Warning as WarningIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { API_ENDPOINTS } from "../../../api/endpoints";

export default function AsistenciaPage() {
  const [sedes, setSedes] = useState([]);
  const [grados, setGrados] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [sedeSeleccionada, setSedeSeleccionada] = useState("");
  const [gradoSeleccionado, setGradoSeleccionado] = useState(""); // Declare the variable here
  const [asistencias, setAsistencias] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mostrandoAlumnos, setMostrandoAlumnos] = useState(false);
  const [hayAsistenciaHoy, setHayAsistenciaHoy] = useState(false);

  // Obtener token del localStorage
  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || "";
    }
    return "";
  };

  // Cargar sedes y grados al montar el componente
  useEffect(() => {
    cargarSedes();
    cargarGrados();
  }, []);

  const cargarSedes = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(API_ENDPOINTS.SEDES_ASISTENCIA, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error al cargar sedes");

      const data = await response.json();
      setSedes(data);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar sedes:", err);
      // ---------- Fallback so the preview keeps working ----------
      const demoSedes = [{ id: 1, nombre: "Sede Demo" }];
      setSedes(demoSedes);
      setLoading(false);
      setError(
        "No se pudo conectar al servidor de sedes. Se muestran datos de ejemplo."
      );
    }
  };

  const cargarGrados = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(API_ENDPOINTS.GRADOS_ASISTENCIA, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error al cargar grados");

      const data = await response.json();
      setGrados(data);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar grados:", err);
      // ---------- Fallback so the preview keeps working ----------
      const demoGrados = [
        { id: 1, nombre: "1° Primaria" },
        { id: 2, nombre: "2° Primaria" },
      ];
      setGrados(demoGrados);
      setLoading(false);
      setError(
        "No se pudo conectar al servidor de grados. Se muestran datos de ejemplo."
      );
    }
  };

  const mostrarAlumnos = async () => {
    if (!sedeSeleccionada || !gradoSeleccionado) {
      setError("Debe seleccionar sede y grado");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();
      const url = `${API_ENDPOINTS.ALUMNOS_FILTRADOS}?sede=${sedeSeleccionada}&grado=${gradoSeleccionado}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error al cargar alumnos");

      const data = await response.json();
      setAlumnos(data);

      // Inicializar asistencias basado en si ya hay registros del día
      const asistenciasIniciales = {};
      let tieneAsistenciaHoy = hayAsistenciaHoy; // Preservar el estado anterior

      data.forEach((alumno) => {
        if (alumno.estado_asistencia) {
          tieneAsistenciaHoy = true;
          asistenciasIniciales[alumno.id] = {
            id: alumno.id,
            estado: alumno.estado_asistencia,
            observaciones: "",
          };
        } else {
          asistenciasIniciales[alumno.id] = {
            id: alumno.id,
            estado: "",
            observaciones: "",
          };
        }
      });

      setAsistencias(asistenciasIniciales);
      setHayAsistenciaHoy(tieneAsistenciaHoy);
      setMostrandoAlumnos(true);
    } catch (err) {
      console.error("Error al cargar alumnos:", err);
      setError("Error al cargar los alumnos");
    } finally {
      setLoading(false);
    }
  };

  const actualizarAsistencia = (alumnoId, campo, valor) => {
    setAsistencias((prev) => ({
      ...prev,
      [alumnoId]: {
        ...prev[alumnoId],
        [campo]: valor,
      },
    }));
  };

  const guardarAsistencias = async () => {
    const asistenciasParaGuardar = Object.values(asistencias).filter(
      (a) => a.estado !== ""
    );

    if (asistenciasParaGuardar.length === 0) {
      setError("Debe marcar al menos un alumno");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = getAuthToken();
      const endpoint = hayAsistenciaHoy
        ? API_ENDPOINTS.MODIFICAR_ASISTENCIA
        : API_ENDPOINTS.GUARDAR_ASISTENCIA;
      const method = hayAsistenciaHoy ? "PUT" : "POST";

      // Transformar datos al formato esperado por tu API PHP
      const payload = asistenciasParaGuardar.map((asistencia) => ({
        id: asistencia.id,
        estado: asistencia.estado,
        observaciones: asistencia.observaciones || "",
      }));

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error al guardar asistencia");

      const result = await response.json();
      setSuccess(
        hayAsistenciaHoy
          ? "Asistencia actualizada correctamente"
          : "Asistencia guardada correctamente"
      );
      setHayAsistenciaHoy(true);

      // Comentar o eliminar esta línea que causa el problema:
      // setTimeout(() => mostrarAlumnos(), 1000);
    } catch (err) {
      console.error("Error al guardar asistencia:", err);
      setError("Error al guardar la asistencia");
    } finally {
      setLoading(false);
    }
  };

  const getEstadoChip = (estado) => {
    switch (estado) {
      case "PUNTUAL":
        return <Chip label="Puntual" color="success" size="small" />;
      case "TARDE":
        return <Chip label="Tarde" color="warning" size="small" />;
      case "AUSENTE":
        return <Chip label="Ausente" color="error" size="small" />;
      default:
        return <Chip label="Sin marcar" variant="outlined" size="small" />;
    }
  };

  const resetearFormulario = () => {
    setSedeSeleccionada("");
    setGradoSeleccionado("");
    setAlumnos([]);
    setAsistencias({});
    setMostrandoAlumnos(false);
    setHayAsistenciaHoy(false);
    setError("");
    setSuccess("");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Encabezado */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Sistema de Asistencia Estudiantil
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Gestiona la asistencia diaria de los estudiantes
        </Typography>
      </Box>

      {/* Filtros */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PeopleIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6" component="h2">
              Seleccionar Sede y Grado
            </Typography>
          </Box>

          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Sede</InputLabel>
                <Select
                  value={sedeSeleccionada}
                  onChange={(e) => setSedeSeleccionada(e.target.value)}
                  label="Sede"
                >
                  {sedes.map((sede) => (
                    <MenuItem key={sede.id} value={sede.id.toString()}>
                      {sede.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth disabled={!sedeSeleccionada}>
                <InputLabel>Grado</InputLabel>
                <Select
                  value={gradoSeleccionado}
                  onChange={(e) => setGradoSeleccionado(e.target.value)}
                  label="Grado"
                >
                  {grados.map((grado) => (
                    <MenuItem key={grado.id} value={grado.id.toString()}>
                      {grado.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  onClick={mostrarAlumnos}
                  disabled={!sedeSeleccionada || !gradoSeleccionado || loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <RefreshIcon />
                  }
                  sx={{ flex: 1 }}
                >
                  Mostrar Alumnos
                </Button>
                {mostrandoAlumnos && (
                  <Button
                    variant="outlined"
                    onClick={resetearFormulario}
                    startIcon={<ClearIcon />}
                  >
                    Limpiar
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Alertas */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} icon={<WarningIcon />}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {/* Información del día */}
      {mostrandoAlumnos && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  Fecha:{" "}
                  {new Date().toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Box>
              <Chip
                label={
                  hayAsistenciaHoy
                    ? "Modificando asistencia existente"
                    : "Registrando nueva asistencia"
                }
                color={hayAsistenciaHoy ? "primary" : "default"}
                variant={hayAsistenciaHoy ? "filled" : "outlined"}
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Lista de alumnos */}
      {mostrandoAlumnos && alumnos.length > 0 && (
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">
                Lista de Alumnos ({alumnos.length})
              </Typography>
              <Button
                variant="contained"
                onClick={guardarAsistencias}
                disabled={loading}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <SaveIcon />
                }
                color="primary"
              >
                {loading
                  ? "Guardando..."
                  : hayAsistenciaHoy
                  ? "Actualizar Asistencia"
                  : "Guardar Asistencia"}
              </Button>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {alumnos.map((alumno) => (
                <Paper
                  key={alumno.id}
                  elevation={1}
                  sx={{ p: 2, "&:hover": { elevation: 2 } }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "medium" }}
                      >
                        {alumno.nombre} {alumno.apellido1} {alumno.apellido2}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID: {alumno.id}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Estado</InputLabel>
                        <Select
                          value={asistencias[alumno.id]?.estado || ""}
                          onChange={(e) =>
                            actualizarAsistencia(
                              alumno.id,
                              "estado",
                              e.target.value
                            )
                          }
                          label="Estado"
                        >
                          <MenuItem value="PUNTUAL">Puntual</MenuItem>
                          <MenuItem value="TARDE">Tarde</MenuItem>
                          <MenuItem value="AUSENTE">Ausente</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        label="Observaciones"
                        placeholder="Observaciones (opcional)"
                        value={asistencias[alumno.id]?.observaciones || ""}
                        onChange={(e) =>
                          actualizarAsistencia(
                            alumno.id,
                            "observaciones",
                            e.target.value
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={2} sx={{ textAlign: "center" }}>
                      {getEstadoChip(asistencias[alumno.id]?.estado || "")}
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>

            {/* Resumen de asistencia */}
            <Paper sx={{ mt: 3, p: 2, bgcolor: "primary.50" }}>
              <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                Resumen de Asistencia
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    sx={{ color: "success.main", fontWeight: "bold" }}
                  >
                    {
                      Object.values(asistencias).filter(
                        (a) => a.estado === "PUNTUAL"
                      ).length
                    }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Puntuales
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    sx={{ color: "warning.main", fontWeight: "bold" }}
                  >
                    {
                      Object.values(asistencias).filter(
                        (a) => a.estado === "TARDE"
                      ).length
                    }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tardanzas
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    sx={{ color: "error.main", fontWeight: "bold" }}
                  >
                    {
                      Object.values(asistencias).filter(
                        (a) => a.estado === "AUSENTE"
                      ).length
                    }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ausentes
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </CardContent>
        </Card>
      )}

      {mostrandoAlumnos && alumnos.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <PeopleIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No se encontraron alumnos para la sede y grado seleccionados.
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Verifique que los filtros sean correctos.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
