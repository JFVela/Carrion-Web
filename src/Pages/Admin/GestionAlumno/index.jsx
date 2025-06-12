"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import { PeopleAlt } from "@mui/icons-material";
import TablaAlumnos from "./Componentes/TablaAlumnos";
import BarraHerramientas from "./Componentes/BarraHerramientas";
import ModalAlumno from "./Componentes/ModalAlumno";
import { alumnosIniciales } from "./alumnos";
// import { API_ENDPOINTS } from "../../../api/endpoints.js";
import "./Estilos/page.css";
import { useNavigate } from "react-router-dom";

export default function CrudAlumnos() {
  // Estados principales
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([]);
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [alumnoEditando, setAlumnoEditando] = useState(null);
  const [ordenamiento, setOrdenamiento] = useState({
    campo: "id",
    direccion: "asc",
  });

  // Función para obtener alumnos (ahora usa datos locales)
  const obtenerAlumnos = () => {
    // Usar datos locales en lugar de la API
    setAlumnos(alumnosIniciales);
    setAlumnosFiltrados(alumnosIniciales);

    /* CÓDIGO API COMENTADO
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
      setAlumnos(data);
      setAlumnosFiltrados(data);
    } catch (error) {
      console.error("Error al obtener los alumnos:", error);
    }
    */
  };

  // Inicializar datos
  useEffect(() => {
    obtenerAlumnos();
  }, []);

  // Función de búsqueda dinámica
  useEffect(() => {
    if (!busqueda.trim()) {
      setAlumnosFiltrados(alumnos);
    } else {
      const filtrados = alumnos.filter((alumno) =>
        Object.values(alumno).some(
          (valor) =>
            typeof valor === "string" &&
            valor.toLowerCase().includes(busqueda.toLowerCase())
        )
      );
      setAlumnosFiltrados(filtrados);
    }
  }, [busqueda, alumnos]);

  // Función de ordenamiento
  const ordenarPor = (campo) => {
    const nuevaDireccion =
      ordenamiento.campo === campo && ordenamiento.direccion === "asc"
        ? "desc"
        : "asc";
    setOrdenamiento({ campo, direccion: nuevaDireccion });

    const alumnosOrdenados = [...alumnosFiltrados].sort((a, b) => {
      // Asegurarse de que los valores son strings antes de usar toLowerCase
      const valorA = String(a[campo]).toLowerCase();
      const valorB = String(b[campo]).toLowerCase();

      if (nuevaDireccion === "asc") {
        return valorA < valorB ? -1 : valorA > valorB ? 1 : 0;
      } else {
        return valorA > valorB ? -1 : valorA < valorB ? 1 : 0;
      }
    });

    setAlumnosFiltrados(alumnosOrdenados);
  };

  // Abrir modal para agregar alumno
  const abrirModalAgregar = () => {
    setAlumnoEditando(null);
    setModalAbierto(true);
  };

  // Abrir modal para editar alumno
  const abrirModalEditar = (alumno) => {
    setAlumnoEditando(alumno);
    setModalAbierto(true);
  };

  // Guardar alumno (agregar o editar) - VERSIÓN LOCAL
  const guardarAlumno = (datosAlumno) => {
    // Mapear nivel y grado a texto para mostrar en la tabla
    const nivelesTexto = { 1: "Primaria", 2: "Secundaria" };
    const gradosTexto = {
      1: "1ro",
      2: "2do",
      3: "3ro",
      4: "4to",
      5: "5to",
      6: "6to",
    };
    const sedesTexto = { 1: "Sede Carrión", 2: "Sede Británico" };

    // Crear campos derivados para mostrar en la tabla
    const gradoSeccion = `${gradosTexto[datosAlumno.grado]} ${
      nivelesTexto[datosAlumno.nivelEstudio]
    }`;
    const sedeNombre = sedesTexto[datosAlumno.sede];

    if (alumnoEditando) {
      // Editar alumno existente
      const alumnosActualizados = alumnos.map((alumno) =>
        alumno.id === alumnoEditando.id
          ? {
              ...datosAlumno,
              id: alumnoEditando.id,
              gradoSeccion,
              sedeNombre,
            }
          : alumno
      );

      setAlumnos(alumnosActualizados);
      console.log(
        "Alumno editado:",
        alumnosActualizados.find((a) => a.id === alumnoEditando.id)
      );
    } else {
      // Agregar nuevo alumno
      const nuevoAlumno = {
        ...datosAlumno,
        id: (
          Math.max(...alumnos.map((a) => Number.parseInt(a.id))) + 1
        ).toString(),
        gradoSeccion,
        sedeNombre,
      };

      setAlumnos([...alumnos, nuevoAlumno]);
      console.log("Nuevo alumno agregado:", nuevoAlumno);
    }

    setModalAbierto(false);
    setAlumnoEditando(null);
  };

  /* CÓDIGO API COMENTADO
  const guardarAlumno = async (datosAlumno) => {
    try {
      const token = localStorage.getItem("token");
      console.log(datosAlumno);
      const response = await fetch(API_ENDPOINTS.CREAR_ALUMNO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosAlumno),
      });
      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        alert(result.error || "Error al agregar el alumno");
        return;
      }
      await obtenerAlumnos();
      setModalAbierto(false);
      setAlumnoEditando(null);
    } catch (error) {
      console.error("Error al agregar alumno:", error);
      alert("Error de conexión al agregar alumno");
    }
  };
  */

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
              Gestión de Alumnos
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Administra la información de los estudiantes
            </Typography>
          </Box>
        </Box>

        {/* Barra de herramientas */}
        <Paper elevation={3} className="toolbar-paper">
          <BarraHerramientas
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            abrirModalAgregar={abrirModalAgregar}
            totalAlumnos={alumnos.length}
            alumnosFiltrados={alumnosFiltrados.length}
            mostrarFiltrados={busqueda.length > 0}
          />
        </Paper>

        {/* Tabla de alumnos */}
        <Paper elevation={3} className="table-paper">
          <TablaAlumnos
            alumnos={alumnosFiltrados}
            ordenamiento={ordenamiento}
            ordenarPor={ordenarPor}
            abrirModalEditar={abrirModalEditar}
            busqueda={busqueda}
          />
        </Paper>

        {/* Modal para agregar/editar alumno */}
        <ModalAlumno
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          alumno={alumnoEditando}
          onGuardar={guardarAlumno}
        />

        {/* Footer */}
        <Box className="footer">
          <Typography variant="body2" color="textSecondary">
            Sistema de Gestión de Alumnos - Desarrollado con ❤️
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
