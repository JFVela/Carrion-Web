import { useState, useMemo, useEffect } from "react";
import { Container, Typography, Snackbar, Alert } from "@mui/material";
import TablaGestionAcademica from "./Componentes/TablaGestion";
import BarraHerramientasGestion from "./Componentes/BarraHerramientas";
import ModalAsignacionDocente from "./Componentes/ModalGestion";
import { API_ENDPOINTS } from "../../../api/endpoints.js";
import { useNavigate } from "react-router-dom";

export default function GestionAcademicaPage() {
  // Toasts
  const [errorMsg, setErrorMsg]       = useState("");
  const [openError, setOpenError]     = useState(false);
  const [successMsg, setSuccessMsg]   = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);

  // Datos y filtros
  const [asignaciones, setAsignaciones] = useState([]);
  const [busqueda, setBusqueda]         = useState("");
  const [ordenamiento, setOrdenamiento] = useState({ campo: "id", direccion: "asc" });

  // Modal
  const [modalAbierto, setModalAbierto]             = useState(false);
  const [asignacionEditando, setAsignacionEditando] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      obtenerAsignaciones(token);
    }
  }, []);

  const obtenerAsignaciones = async (token) => {
    try {
      const response = await fetch(API_ENDPOINTS.OBTENER_ASIGNACIONES, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
        throw new Error("Error en la respuesta del servidor");
      }
      const data = await response.json();
      const mapped = data.map((a) => ({ ...a, id: a.id_clase }));
      setAsignaciones(mapped);
    } catch (error) {
      console.error("Error al obtener asignaciones:", error);
      setErrorMsg("No se pudo cargar la lista");
      setOpenError(true);
    }
  };

  // Filtrado por búsqueda
  const asignacionesFiltradas = useMemo(() => {
    if (!busqueda.trim()) return asignaciones;
    const b = busqueda.toLowerCase();
    return asignaciones.filter((a) =>
      [
        a.nombre_profesor,
        a.nombre_curso,
        a.nombre_sede,
        a.nombre_grado,
        a.nombre_nivel,
        a.nombre_aula,
      ].some((campo) => campo?.toLowerCase().includes(b))
    );
  }, [asignaciones, busqueda]);

  // Ordenamiento
  const asignacionesOrdenadas = useMemo(() => {
    return [...asignacionesFiltradas].sort((a, b) => {
      if (a[ordenamiento.campo] < b[ordenamiento.campo]) {
        return ordenamiento.direccion === "asc" ? -1 : 1;
      }
      if (a[ordenamiento.campo] > b[ordenamiento.campo]) {
        return ordenamiento.direccion === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [asignacionesFiltradas, ordenamiento]);

  const ordenarPor = (campo) => {
    setOrdenamiento((prev) => ({
      campo,
      direccion:
        prev.campo === campo && prev.direccion === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const abrirModalAgregar = () => {
    setAsignacionEditando(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (registro) => {
    setAsignacionEditando(registro);
    setModalAbierto(true);
  };

  const eliminarAsignacion = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar esta asignación?")) return;
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch(
        `${API_ENDPOINTS.EDITAR_ASIGNACION}?id=${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!resp.ok) throw new Error("Error al eliminar asignación");
      await obtenerAsignaciones(token);
      setSuccessMsg("Asignación eliminada");
      setOpenSuccess(true);
    } catch (error) {
      console.error(error);
      setErrorMsg("No se pudo eliminar la asignación");
      setOpenError(true);
    }
  };

  const manejarGuardar = async (datos) => {
    try {
      const token = localStorage.getItem("token");
      let resp, body;

      if (asignacionEditando) {
        // ACTUALIZAR PROFESOR
        resp = await fetch(
          `${API_ENDPOINTS.EDITAR_ASIGNACION}?id=${asignacionEditando.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_profesor: datos.docenteId }),
          }
        );
      } else {
        // CREAR NUEVA ASIGNACIÓN
        resp = await fetch(API_ENDPOINTS.CREAR_ASIGNACION, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_profesor: datos.docenteId,
            id_sede:     datos.sedeId,
            id_nivel:    datos.nivelId,
            id_grado:    datos.gradoId,
            id_curso:    datos.cursoId,
          }),
        });
      }

      // Leer JSON una sola vez
      body = await resp.json();
      if (!resp.ok) {
        throw new Error(body.error || body.mensaje || "Error al guardar asignación");
      }

      // Mostrar mensaje de éxito
      if (asignacionEditando) {
        setSuccessMsg(body.mensaje || "Profesor actualizado correctamente");
      } else {
        setSuccessMsg("La asignación fue exitosa");
      }

      // Refrescar lista y cerrar modal
      await obtenerAsignaciones(token);
      setOpenSuccess(true);
      setModalAbierto(false);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message || "Error desconocido");
      setOpenError(true);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestión Académica
      </Typography>

      <BarraHerramientasGestion
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        abrirModalAgregar={abrirModalAgregar}
        totalAsignaciones={asignaciones.length}
        asignacionesFiltradas={asignacionesFiltradas.length}
        mostrarFiltrados={busqueda.trim() !== ""}
        ordenarPor={ordenarPor}
      />

      <TablaGestionAcademica
        asignaciones={asignacionesOrdenadas}
        ordenamiento={ordenamiento}
        ordenarPor={ordenarPor}
        abrirModalEditar={abrirModalEditar}
        eliminarAsignacion={eliminarAsignacion}
        busqueda={busqueda}
      />

      <ModalAsignacionDocente
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        asignacion={asignacionEditando}
        onGuardar={manejarGuardar}
        isEditing={Boolean(asignacionEditando)}
      />

      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSuccess}
        autoHideDuration={4000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
