import { useState, useEffect } from "react"
import { Container, Typography, Box, Paper } from "@mui/material"
import { MenuBook } from "@mui/icons-material"
import TablaCursos from "./Componentes/TablaCursos.jsx"
import BarraHerramientas from "./Componentes/BarraHerramientas.jsx"
import ModalCurso from "./Componentes/ModalCursos.jsx"
import { API_ENDPOINTS } from "../../../api/endpoints.js"
import "./Estilos/page.css"
import { useNavigate } from "react-router-dom"

export default function CrudCursos() {
  // Estados principales
  const navigate = useNavigate()

  const [cursos, setCursos] = useState([])
  const [cursosFiltrados, setCursosFiltrados] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [modalAbierto, setModalAbierto] = useState(false)
  const [cursoEditando, setCursoEditando] = useState(null)
  const [ordenamiento, setOrdenamiento] = useState({
    campo: "id",
    direccion: "asc",
  })

  const obtenerCursos = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(API_ENDPOINTS.OBTENER_CURSOS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        if (response.status === 401) {
          console.log(response)

          // Token inválido o expirado
          localStorage.clear()
          navigate("/login")
        }
        throw new Error("Error en la respuesta del servidor")
      }

      const data = await response.json()
      console.log(data)

      setCursos(data)
      setCursosFiltrados(data)
    } catch (error) {
      console.error("Error al obtener los cursos:", error)
    }
  }

  // Inicializar datos
  useEffect(() => {
    obtenerCursos()
  }, [])

  // Función de búsqueda dinámica
  useEffect(() => {
    if (!busqueda.trim()) {
      setCursosFiltrados(cursos)
    } else {
      const filtrados = cursos.filter((curso) =>
        Object.values(curso).some((valor) => {
          // Manejar valores que pueden ser números o strings
          const valorString = valor?.toString().toLowerCase() || ""
          return valorString.includes(busqueda.toLowerCase())
        }),
      )
      setCursosFiltrados(filtrados)
    }
  }, [busqueda, cursos])

  // Función de ordenamiento
  const ordenarPor = (campo) => {
    const nuevaDireccion = ordenamiento.campo === campo && ordenamiento.direccion === "asc" ? "desc" : "asc"
    setOrdenamiento({ campo, direccion: nuevaDireccion })

    const cursosOrdenados = [...cursosFiltrados].sort((a, b) => {
      let valorA = a[campo]
      let valorB = b[campo]

      // Manejar valores numéricos y strings
      if (typeof valorA === "string") {
        valorA = valorA.toLowerCase()
      }
      if (typeof valorB === "string") {
        valorB = valorB.toLowerCase()
      }

      if (nuevaDireccion === "asc") {
        return valorA < valorB ? -1 : valorA > valorB ? 1 : 0
      } else {
        return valorA > valorB ? -1 : valorA < valorB ? 1 : 0
      }
    })

    setCursosFiltrados(cursosOrdenados)
  }

  // Abrir modal para agregar curso
  const abrirModalAgregar = () => {
    setCursoEditando(null)
    setModalAbierto(true)
  }

  // Abrir modal para editar curso
  const abrirModalEditar = (curso) => {
    setCursoEditando(curso)
    setModalAbierto(true)
  }

  // Guardar curso (agregar o editar)
  const guardarCurso = async (datosCurso) => {
    try {
      const token = localStorage.getItem("token")
      console.log(datosCurso)

      let response
      let endpoint
      let method

      if (cursoEditando) {
        // Editar curso existente
        endpoint = `${API_ENDPOINTS.ACTUALIZAR_CURSO}/${cursoEditando.id}`
        method = "PUT"
      } else {
        // Crear nuevo curso
        endpoint = API_ENDPOINTS.CREAR_CURSO
        method = "POST"
      }

      response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosCurso),
      })

      const result = await response.json()
      console.log(result)

      if (!response.ok) {
        alert(result.error || `Error al ${cursoEditando ? "actualizar" : "agregar"} el curso`)
        return
      }

      // Actualizar la lista de cursos
      await obtenerCursos()

      setModalAbierto(false)
      setCursoEditando(null)
    } catch (error) {
      console.error(`Error al ${cursoEditando ? "actualizar" : "agregar"} curso:`, error)
      alert(`Error de conexión al ${cursoEditando ? "actualizar" : "agregar"} curso`)
    }
  }

  return (
    <div className="crud-container">
      <Container maxWidth="lg">
        {/* Header */}
        <Box className="header-container">
          <Box className="header-icon">
            <MenuBook fontSize="large" />
          </Box>
          <Box>
            <Typography variant="h4" component="h1" className="header-title">
              Gestión de Cursos
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Administra el catálogo de cursos académicos
            </Typography>
          </Box>
        </Box>

        {/* Barra de herramientas */}
        <Paper elevation={3} className="toolbar-paper">
          <BarraHerramientas
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            abrirModalAgregar={abrirModalAgregar}
            totalCursos={cursos.length}
            cursosFiltrados={cursosFiltrados.length}
            mostrarFiltrados={busqueda.length > 0}
          />
        </Paper>

        {/* Tabla de cursos */}
        <Paper elevation={3} className="table-paper">
          <TablaCursos
            cursos={cursosFiltrados}
            ordenamiento={ordenamiento}
            ordenarPor={ordenarPor}
            abrirModalEditar={abrirModalEditar}
            busqueda={busqueda}
          />
        </Paper>

        {/* Modal para agregar/editar curso */}
        <ModalCurso
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          curso={cursoEditando}
          onGuardar={guardarCurso}
        />

        {/* Footer */}
        <Box className="footer">
          <Typography variant="body2" color="textSecondary">
            Sistema de Gestión de Cursos - Desarrollado con ❤️
          </Typography>
        </Box>
      </Container>
    </div>
  )
}
