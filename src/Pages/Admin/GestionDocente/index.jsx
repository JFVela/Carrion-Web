import { useState, useEffect } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import { PeopleAlt } from "@mui/icons-material";
import TablaDocentes from "./Componentes/TablaDocentes.jsx";
import BarraHerramientas from "./Componentes/BarraHerramientas";
import ModalDocente from "./Componentes/ModalDocente.jsx";
import { docentesIniciales } from "./docente.js";
import { API_ENDPOINTS } from "../../../api/endpoints.js";
import "./Estilos/page.css";
import { useNavigate } from "react-router-dom";

export default function CrudDocentes() {
  // Estados principales
  const navigate = useNavigate();
  const [docentes, setDocentes] = useState([]);
  const [docentesFiltrados, setDocentesFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [docenteEditando, setDocenteEditando] = useState(null);
  const [ordenamiento, setOrdenamiento] = useState({
    campo: "id",
    direccion: "asc",
  });
  const [cargando, setCargando] = useState(false);

  // Función para obtener docentes desde la API
  const obtenerDocentes = async () => {
    try {
      setCargando(true);
      const token = localStorage.getItem("token");
      const response = await fetch(API_ENDPOINTS.OBTENER_PROFESORES, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.log("Error de autenticación:", response);
          localStorage.clear();
          navigate("/login");
          return;
        }
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      console.log("Docentes obtenidos:", data);
      setDocentes(data);
      setDocentesFiltrados(data);
    } catch (error) {
      console.error("Error al obtener los docentes:", error);
      // Usar datos locales como fallback en caso de error
      setDocentes(docentesIniciales);
      setDocentesFiltrados(docentesIniciales);
    } finally {
      setCargando(false);
    }
  };

  // Inicializar datos
  useEffect(() => {
    obtenerDocentes();
  }, []);

  // Función de búsqueda dinámica
  useEffect(() => {
    if (!busqueda.trim()) {
      setDocentesFiltrados(docentes);
    } else {
      const filtrados = docentes.filter((docente) =>
        Object.values(docente).some((valor) => {
          // Manejar valores que pueden ser números o strings
          const valorString = valor?.toString().toLowerCase() || "";
          return valorString.includes(busqueda.toLowerCase());
        })
      );
      setDocentesFiltrados(filtrados);
    }
  }, [busqueda, docentes]);

  // Función de ordenamiento
  const ordenarPor = (campo) => {
    const nuevaDireccion =
      ordenamiento.campo === campo && ordenamiento.direccion === "asc"
        ? "desc"
        : "asc";
    setOrdenamiento({ campo, direccion: nuevaDireccion });

    const docentesOrdenados = [...docentesFiltrados].sort((a, b) => {
      let valorA = a[campo];
      let valorB = b[campo];

      // Manejar valores numéricos y strings
      if (typeof valorA === "string") {
        valorA = valorA.toLowerCase();
      }
      if (typeof valorB === "string") {
        valorB = valorB.toLowerCase();
      }

      if (nuevaDireccion === "asc") {
        return valorA < valorB ? -1 : valorA > valorB ? 1 : 0;
      } else {
        return valorA > valorB ? -1 : valorA < valorB ? 1 : 0;
      }
    });

    setDocentesFiltrados(docentesOrdenados);
  };

  // Abrir modal para agregar docente
  const abrirModalAgregar = () => {
    setDocenteEditando(null);
    setModalAbierto(true);
  };

  // Abrir modal para editar docente
  const abrirModalEditar = (docente) => {
    setDocenteEditando(docente);
    console.log("Editando docente:", docente);
    setModalAbierto(true);
  };

  // Guardar docente (agregar o editar) - VERSIÓN API
  const guardarDocente = async (datosDocente) => {
    try {
      setCargando(true);
      const token = localStorage.getItem("token");

      // Crear campos derivados para mostrar en la tabla
      const docenteCompleto = {
        ...datosDocente,
        // Mapear campos del modal a campos de la tabla
        nombre: datosDocente.nombreDocente,
        apellido1: datosDocente.apellidoPaterno,
        apellido2: datosDocente.apellidoMaterno,
        email: datosDocente.correoElectronico,
      };

      console.log("Datos a guardar:", docenteCompleto);

      let response;
      let endpoint;
      let method;

      if (docenteEditando) {
        // Editar docente existente
        endpoint = `${API_ENDPOINTS.EDITAR_PROFESOR}${docenteEditando.id}`;
        method = "PUT";
      } else {
        // Crear nuevo docente
        endpoint = API_ENDPOINTS.CREAR_PROFESOR;
        method = "POST";
      }

      console.log("Endpoint:", endpoint);

      response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(docenteCompleto),
      });

      const result = await response.json();
      console.log("Respuesta del servidor:", result);

      if (!response.ok) {
        alert(
          result.error ||
            `Error al ${docenteEditando ? "actualizar" : "agregar"} el docente`
        );
        return;
      }

      // Actualizar la lista de docentes
      await obtenerDocentes();
      setModalAbierto(false);
      setDocenteEditando(null);
    } catch (error) {
      console.error(
        `Error al ${docenteEditando ? "actualizar" : "agregar"} docente:`,
        error
      );
      alert(
        `Error de conexión al ${
          docenteEditando ? "actualizar" : "agregar"
        } docente`
      );

      // Implementación local como fallback en caso de error
      const docenteCompleto = {
        ...datosDocente,
        nombre: datosDocente.nombreDocente,
        apellido1: datosDocente.apellidoPaterno,
        apellido2: datosDocente.apellidoMaterno,
        email: datosDocente.correoElectronico,
      };

      if (docenteEditando) {
        // Editar docente existente localmente
        const docentesActualizados = docentes.map((docente) =>
          docente.id === docenteEditando.id
            ? {
                ...docenteCompleto,
                id: docenteEditando.id,
              }
            : docente
        );

        setDocentes(docentesActualizados);
        console.log(
          "Docente editado localmente:",
          docentesActualizados.find((d) => d.id === docenteEditando.id)
        );
      } else {
        // Agregar nuevo docente localmente
        const nuevoDocente = {
          ...docenteCompleto,
          id: (
            Math.max(...docentes.map((d) => Number.parseInt(d.id))) + 1
          ).toString(),
        };

        setDocentes([...docentes, nuevoDocente]);
        console.log("Nuevo docente agregado localmente:", nuevoDocente);
      }

      setModalAbierto(false);
      setDocenteEditando(null);
    } finally {
      setCargando(false);
    }
  };

  // Eliminar docente
  const eliminarDocente = async (id) => {
    if (!window.confirm("¿Está seguro que desea eliminar este docente?")) {
      return;
    }

    try {
      setCargando(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_ENDPOINTS.ELIMINAR_PROFESOR}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          navigate("/login");
          return;
        }
        throw new Error("Error al eliminar el docente");
      }

      // Actualizar la lista de docentes
      await obtenerDocentes();
      alert("Docente eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar docente:", error);
      alert("Error al eliminar el docente");

      // Eliminar localmente como fallback
      const docentesActualizados = docentes.filter(
        (docente) => docente.id !== id
      );
      setDocentes(docentesActualizados);
      setDocentesFiltrados(
        docentesFiltrados.filter((docente) => docente.id !== id)
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="crud-container">
      <Container maxWidth="lg">
        {/* Header */}
        <Box className="header-container">
          <Box className="header-icon">
            <PeopleAlt fontSize="large" />
          </Box>
          <Box>
            <Typography variant="h4" component="h1" className="header-title">
              Gestión de Docentes
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Administra la información de los profesores
            </Typography>
          </Box>
        </Box>

        {/* Barra de herramientas */}
        <Paper elevation={3} className="toolbar-paper">
          <BarraHerramientas
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            abrirModalAgregar={abrirModalAgregar}
            totalDocentes={docentes.length}
            docentesFiltrados={docentesFiltrados.length}
            mostrarFiltrados={busqueda.length > 0}
            cargando={cargando}
          />
        </Paper>

        {/* Tabla de docentes */}
        <Paper elevation={3} className="table-paper">
          <TablaDocentes
            docentes={docentesFiltrados}
            ordenamiento={ordenamiento}
            ordenarPor={ordenarPor}
            abrirModalEditar={abrirModalEditar}
            eliminarDocente={eliminarDocente}
            busqueda={busqueda}
            cargando={cargando}
          />
        </Paper>

        {/* Modal para agregar/editar docente */}
        <ModalDocente
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          docente={docenteEditando}
          onGuardar={guardarDocente}
          cargando={cargando}
        />

        {/* Footer */}
        <Box className="footer">
          <Typography variant="body2" color="textSecondary">
            Sistema de Gestión de Docentes - Desarrollado con ❤️
          </Typography>
        </Box>
      </Container>
    </div>
  );
}