import { useState, useEffect } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import { Api, PeopleAlt } from "@mui/icons-material";
import TablaDocentes from "./Componentes/TablaDocentes.jsx";
import BarraHerramientas from "./Componentes/BarraHerramientas";
import ModalDocente from "./Componentes/ModalDocente.jsx";
import { API_ENDPOINTS } from "../../../api/endpoints.js";
import "./Estilos/page.css";
import { useNavigate, useLocation } from "react-router-dom";

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

  const obtenerDocentes = async () => {
    try {
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
          console.log(response);

          // Token inválido o expirado
          localStorage.clear();
          navigate("/login");
        }
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      console.log(data);

      setDocentes(data);
      setDocentesFiltrados(data);
    } catch (error) {
      console.error("Error al obtener los docentes:", error);
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
        Object.values(docente).some((valor) =>
          valor.toLowerCase().includes(busqueda.toLowerCase())
        )
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
      const valorA = a[campo].toLowerCase();
      const valorB = b[campo].toLowerCase();

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
    setModalAbierto(true);
  };
  /**EDITAR HACER UN PATCH*/
  // Guardar docente (agregar o editar)
  /*
  const guardarDocente = (datosDocente) => {
    if (docenteEditando) {
      // Editar docente existente
      setDocentes((prev) =>
        prev.map((docente) => (docente.id === docenteEditando.id ? { ...datosDocente, id: docenteEditando.id } : docente)),
      )
    } else {
      // Agregar nuevo docente
      const nuevoDocente = {
        ...datosDocente,
        id: (docentes.length + 1).toString(),
      }
      setDocentes((prev) => [...prev, nuevoDocente])
    }

    setModalAbierto(false)
    setDocenteEditando(null)
  }
*/

  const guardarDocente = async (datosDocente) => {
    try {
      const token = localStorage.getItem("token"); // Ajusta según dónde guardes el JWT
      console.log(datosDocente);

      const response = await fetch(API_ENDPOINTS.CREAR_ALUMNO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosDocente),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        alert(result.error || "Error al agregar el docente");
        return;
      }

      // Suponiendo que la API devuelve el docente creado
      await obtenerDocentes();

      setModalAbierto(false);
      setDocenteEditando(null);
    } catch (error) {
      console.error("Error al agregar docente:", error);
      alert("Error de conexión al agregar docente");
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
          />
        </Paper>

        {/* Tabla de docentes */}
        <Paper elevation={3} className="table-paper">
          <TablaDocentes
            docentes={docentesFiltrados}
            ordenamiento={ordenamiento}
            ordenarPor={ordenarPor}
            abrirModalEditar={abrirModalEditar}
          />
        </Paper>

        {/* Modal para agregar/editar docente */}
        <ModalDocente
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          docente={docenteEditando}
          onGuardar={guardarDocente}
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
