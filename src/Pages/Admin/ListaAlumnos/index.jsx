import { useState, useEffect } from "react"
import { Container, Typography, Box, Paper } from "@mui/material"
import { Api, PeopleAlt } from "@mui/icons-material"
import TablaAlumnos from "./Componentes/TablaAlumnos"
import BarraHerramientas from "./Componentes/BarraHerramientas"
import ModalAlumno from "./Componentes/ModalAlumno"
import { alumnosIniciales } from "./alumnos"
import { API_ENDPOINTS } from '../../../api/endpoints.js'
import "./Estilos/page.css"
import { useNavigate, useLocation } from 'react-router-dom';


export default function CrudAlumnos() {
  // Estados principales
  const navigate = useNavigate();

  const [alumnos, setAlumnos] = useState([])
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [modalAbierto, setModalAbierto] = useState(false)
  const [alumnoEditando, setAlumnoEditando] = useState(null)
  const [ordenamiento, setOrdenamiento] = useState({
    campo: "id",
    direccion: "asc",
  })

  const obtenerAlumnos = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(API_ENDPOINTS.GET_USERS, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            console.log(response);
            
            // Token inválido o expirado
            localStorage.clear();
            navigate('/login')
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
    };

  // Inicializar datos
  useEffect(() => {
    obtenerAlumnos();
  }, []);

  // Función de búsqueda dinámica
  useEffect(() => {
    if (!busqueda.trim()) {
      setAlumnosFiltrados(alumnos)
    } else {
      const filtrados = alumnos.filter((alumno) =>
        Object.values(alumno).some((valor) => valor.toLowerCase().includes(busqueda.toLowerCase())),
      )
      setAlumnosFiltrados(filtrados)
    }
  }, [busqueda, alumnos])

  // Función de ordenamiento
  const ordenarPor = (campo) => {
    const nuevaDireccion = ordenamiento.campo === campo && ordenamiento.direccion === "asc" ? "desc" : "asc"
    setOrdenamiento({ campo, direccion: nuevaDireccion })

    const alumnosOrdenados = [...alumnosFiltrados].sort((a, b) => {
      const valorA = a[campo].toLowerCase()
      const valorB = b[campo].toLowerCase()

      if (nuevaDireccion === "asc") {
        return valorA < valorB ? -1 : valorA > valorB ? 1 : 0
      } else {
        return valorA > valorB ? -1 : valorA < valorB ? 1 : 0
      }
    })

    setAlumnosFiltrados(alumnosOrdenados)
  }

  // Abrir modal para agregar alumno
  const abrirModalAgregar = () => {
    setAlumnoEditando(null)
    setModalAbierto(true)
  }

  // Abrir modal para editar alumno
  const abrirModalEditar = (alumno) => {
    setAlumnoEditando(alumno)
    setModalAbierto(true)
  }
  /**EDITAR HACER UN PATCH*/
  // Guardar alumno (agregar o editar)
  /*
  const guardarAlumno = (datosAlumno) => {
    if (alumnoEditando) {
      // Editar alumno existente
      setAlumnos((prev) =>
        prev.map((alumno) => (alumno.id === alumnoEditando.id ? { ...datosAlumno, id: alumnoEditando.id } : alumno)),
      )
    } else {
      // Agregar nuevo alumno
      const nuevoAlumno = {
        ...datosAlumno,
        id: (alumnos.length + 1).toString(),
      }
      setAlumnos((prev) => [...prev, nuevoAlumno])
    }

    setModalAbierto(false)
    setAlumnoEditando(null)
  }
*/

const guardarAlumno = async (datosAlumno) => {
  try {
    const token = localStorage.getItem("token"); // Ajusta según dónde guardes el JWT
    console.log(datosAlumno);
    

    const response = await fetch(API_ENDPOINTS.CREAR_ALUMNO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(datosAlumno),
    });

    const result = await response.json();
console.log(result);

    if (!response.ok) {
      alert(result.error || "Error al agregar el alumno");
      return;
    }

    // Suponiendo que la API devuelve el alumno creado
    await obtenerAlumnos();

    
    setModalAbierto(false);
    setAlumnoEditando(null);

  } catch (error) {
    console.error("Error al agregar alumno:", error);
    alert("Error de conexión al agregar alumno");
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
  )
}
