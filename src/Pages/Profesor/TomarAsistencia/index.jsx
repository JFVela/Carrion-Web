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
import { styled } from "@mui/material/styles";
import { API_ENDPOINTS } from "../../../api/endpoints";

// Styled components
const FiltrosSection = styled("section")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  alignItems: "flex-end",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(1),
  },
}));

const AlumnoCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: theme.spacing(1),
  },
}));

const EstadoBox = styled("div")({
  minWidth: 100,
  display: "flex",
  justifyContent: "center",
});

export default function AsistenciaPage() {
  const [sedes, setSedes] = useState([]);
  const [grados, setGrados] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [sedeSeleccionada, setSedeSeleccionada] = useState("");
  const [gradoSeleccionado, setGradoSeleccionado] = useState("");
  const [asistencias, setAsistencias] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mostrandoAlumnos, setMostrandoAlumnos] = useState(false);
  const [hayAsistenciaHoy, setHayAsistenciaHoy] = useState(false);

  const getAuthToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    (async () => {
      await cargarSedes();
      await cargarGrados();
    })();
    // eslint-disable-next-line
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
      if (!response.ok) throw new Error();
      setSedes(await response.json());
    } catch {
      setSedes([{ id: 1, nombre: "Sede Demo" }]);
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
      if (!response.ok) throw new Error();
      const gradosData = await response.json();

      // Filtrar duplicados por nombre
      const gradosUnicos = gradosData.filter(
        (grado, index, self) =>
          index === self.findIndex((g) => g.nombre === grado.nombre)
      );

      setGrados(gradosUnicos);
    } catch {
      setGrados([
        { id: 1, nombre: "1° Primaria" },
        { id: 2, nombre: "2° Primaria" },
      ]);
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
    setSuccess("");

    try {
      const token = getAuthToken();
      const url = `${API_ENDPOINTS.ALUMNOS_FILTRADOS}?sede=${sedeSeleccionada}&grado=${gradoSeleccionado}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error();

      const data = await response.json();
      setAlumnos(data);

      const asistenciasIniciales = {};
      let tieneAsistenciaHoy = false;

      data.forEach((alumno) => {
        if (alumno.estado_asistencia) {
          tieneAsistenciaHoy = true;
          asistenciasIniciales[alumno.id] = {
            id: alumno.id,
            estado: alumno.estado_asistencia,
            observaciones: alumno.observaciones || "",
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
    } catch {
      setError("Error al cargar los alumnos");
    } finally {
      setLoading(false);
    }
  };

  const actualizarAsistencia = (alumnoId, campo, valor) => {
    setAsistencias((prev) => ({
      ...prev,
      [alumnoId]: { ...prev[alumnoId], [campo]: valor },
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

      const payload = asistenciasParaGuardar.map((a) => ({
        id: a.id,
        estado: a.estado,
        observaciones: a.observaciones || "",
      }));

      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Error en la respuesta del servidor"
        );
      }

      const result = await response.json();

      setSuccess(
        hayAsistenciaHoy
          ? "Asistencia actualizada correctamente"
          : "Asistencia guardada correctamente"
      );

      setHayAsistenciaHoy(true);

      // SOLUCION: Recargar los datos después de guardar/actualizar
      setTimeout(async () => {
        await mostrarAlumnos();
        setSuccess(""); // Limpiar mensaje de éxito después de recargar
      }, 1500);
    } catch (error) {
      setError(`Error al guardar la asistencia: ${error.message}`);
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

  // Resumen
  const resumen = {
    PUNTUAL: Object.values(asistencias).filter((a) => a.estado === "PUNTUAL")
      .length,
    TARDE: Object.values(asistencias).filter((a) => a.estado === "TARDE")
      .length,
    AUSENTE: Object.values(asistencias).filter((a) => a.estado === "AUSENTE")
      .length,
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Sistema de Asistencia Estudiantil
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Gestiona la asistencia diaria de los estudiantes
        </Typography>
      </Box>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PeopleIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">Seleccionar Sede y Grado</Typography>
          </Box>

          <FiltrosSection>
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

            <Button
              variant="contained"
              onClick={mostrarAlumnos}
              disabled={!sedeSeleccionada || !gradoSeleccionado || loading}
              startIcon={
                loading ? <CircularProgress size={20} /> : <RefreshIcon />
              }
              sx={{ minWidth: 160 }}
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
          </FiltrosSection>
        </CardContent>
      </Card>

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

      {mostrandoAlumnos && (
        <Card sx={{ mb: 2 }}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CalendarIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="body1">
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
          </CardContent>
        </Card>
      )}

      {mostrandoAlumnos && alumnos.length > 0 && (
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
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
              >
                {loading
                  ? "Guardando..."
                  : hayAsistenciaHoy
                  ? "Actualizar Asistencia"
                  : "Guardar Asistencia"}
              </Button>
            </Box>

            <section>
              {alumnos.map((alumno) => (
                <AlumnoCard key={alumno.id}>
                  <Box sx={{ flex: 2 }}>
                    <Typography fontWeight="medium">
                      {alumno.nombre} {alumno.apellido1} {alumno.apellido2}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {alumno.id}
                    </Typography>
                  </Box>

                  <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
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
                    sx={{ flex: 2, minWidth: 160 }}
                  />

                  <EstadoBox>
                    {getEstadoChip(asistencias[alumno.id]?.estado || "")}
                  </EstadoBox>
                </AlumnoCard>
              ))}
            </section>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                mt: 3,
                bgcolor: "primary.50",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" color="success.main" fontWeight="bold">
                  {resumen.PUNTUAL}
                </Typography>
                <Typography variant="body2">Puntuales</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" color="warning.main" fontWeight="bold">
                  {resumen.TARDE}
                </Typography>
                <Typography variant="body2">Tardanzas</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" color="error.main" fontWeight="bold">
                  {resumen.AUSENTE}
                </Typography>
                <Typography variant="body2">Ausentes</Typography>
              </Box>
            </Box>
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
