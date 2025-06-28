import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Snackbar,
} from "@mui/material";
import { NotificationsActive } from "@mui/icons-material";
import TablaNotificaciones from "./Componentes/TablaAlumnos";
import BarraHerramientas from "./Componentes/BarraHerramientas";
import ModalNotificacion from "./Componentes/ModalAlumno";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { useNavigate } from "react-router-dom";
import "./Estilos/page.css";

export default function CrudNotificaciones() {
  const navigate = useNavigate();

  // Estados
  const [notificaciones, setNotificaciones] = useState([]);
  const [notificacionesFiltradas, setNotificacionesFiltradas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [notificacionEditando, setNotificacionEditando] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Función para mostrar notificaciones
  const mostrarSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Obtener notificaciones
  const obtenerNotificaciones = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_ENDPOINTS.OBTENER_NOTIFICACIONES, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      const data = await response.json();
      setNotificaciones(data);
      setNotificacionesFiltradas(data);
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
      mostrarSnackbar("Error al cargar notificaciones", "error");
    }
  };

  // Obtener alumnos (con sus correos)
  const obtenerAlumnos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_ENDPOINTS.OBTENER_ALUMNOS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAlumnos(data);
    } catch (error) {
      console.error("Error al obtener alumnos:", error);
      mostrarSnackbar("Error al cargar alumnos", "error");
    }
  };

  useEffect(() => {
    obtenerNotificaciones();
    obtenerAlumnos();
  }, []);

  // Filtrado por búsqueda
  useEffect(() => {
    if (!busqueda.trim()) {
      setNotificacionesFiltradas(notificaciones);
    } else {
      const filtro = notificaciones.filter((item) =>
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(busqueda.toLowerCase())
        )
      );
      setNotificacionesFiltradas(filtro);
    }
  }, [busqueda, notificaciones]);

  // Abrir modal
  const abrirModalAgregar = () => {
    setNotificacionEditando(null);
    setModalAbierto(true);
  };

  // FUNCIÓN GUARDAR NOTIFICACIÓN MEJORADA
  const guardarNotificacion = async (nuevaNotificacion) => {
    setLoading(true);

    try {
      // Validar que existe el alumno
      const alumno = alumnos.find(
        (al) => al.id === nuevaNotificacion.alumno_id
      );
      if (!alumno || !alumno.correo) {
        throw new Error("No se encontró el correo del alumno seleccionado");
      }

      // Preparar payload con TODOS los datos necesarios
      const payload = {
        // Datos para el correo
        email: alumno.correo,
        subject: nuevaNotificacion.asunto,
        message: nuevaNotificacion.mensaje,
        // Datos para la base de datos
        alumno_id: nuevaNotificacion.alumno_id,
        emisor_tipo: nuevaNotificacion.emisor_tipo,
        emisor_id: nuevaNotificacion.emisor_id,
      };

      console.log("Enviando notificación completa:", payload);

      // Realizar petición al endpoint que envía correo Y guarda en BD
      const response = await fetch(API_ENDPOINTS.ENVIAR_CORREO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ahora necesario para la BD
        },
        body: JSON.stringify(payload),
      });

      // Verificar si la respuesta es OK
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      // Parsear respuesta JSON
      const resultado = await response.json();

      if (resultado.success) {
        mostrarSnackbar(
          "✅ Correo enviado y notificación guardada correctamente",
          "success"
        );
        setModalAbierto(false);
        // Recargar la lista de notificaciones para mostrar la nueva
        obtenerNotificaciones();
      } else {
        throw new Error(resultado.error || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      mostrarSnackbar(`❌ Error al procesar: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crud-container">
      <Container maxWidth="lg">
        {/* Header */}
        <Box className="header-container">
          <Box className="header-icon">
            <NotificationsActive fontSize="large" />
          </Box>
          <Box>
            <Typography variant="h4" className="header-title">
              Gestión de Notificaciones
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Consulta y administra notificaciones enviadas a los alumnos
            </Typography>
          </Box>
        </Box>

        {/* Barra herramientas */}
        <Paper elevation={3} className="toolbar-paper">
          <BarraHerramientas
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            abrirModalAgregar={abrirModalAgregar}
            totalAlumnos={notificaciones.length}
            alumnosFiltrados={notificacionesFiltradas.length}
            mostrarFiltrados={busqueda.length > 0}
          />
        </Paper>

        {/* Tabla */}
        <Paper elevation={3} className="table-paper">
          <TablaNotificaciones notificaciones={notificacionesFiltradas} />
        </Paper>

        {/* Modal */}
        <ModalNotificacion
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          notificacion={notificacionEditando}
          onGuardar={guardarNotificacion}
          alumnos={alumnos}
          loading={loading}
        />

        {/* Snackbar para notificaciones */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Footer */}
        <Box className="footer">
          <Typography variant="body2" color="textSecondary">
            Sistema de Gestión de Notificaciones - Desarrollado con ❤️
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
