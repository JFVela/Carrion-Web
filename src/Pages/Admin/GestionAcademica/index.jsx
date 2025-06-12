"use client"

import { useState, useMemo, useEffect } from "react"
import { Container, Typography } from "@mui/material"
import TablaGestionAcademica from "./Componentes/TablaGestion"
import BarraHerramientasGestion from "./Componentes/BarraHerramientas"
import ModalAsignacionDocente from "./Componentes/ModalGestion"
import { CURSOS_NIVEL, SEDES, SALONES } from "./configuracion"
import { API_ENDPOINTS } from "../../../api/endpoints.js"
import { useNavigate } from "react-router-dom"

export default function GestionAcademicaPage() {
  const [asignaciones, setAsignaciones] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [modalAbierto, setModalAbierto] = useState(false)
  const [asignacionEditando, setAsignacionEditando] = useState(null)
  const [ordenamiento, setOrdenamiento] = useState({
    campo: "id",
    direccion: "asc",
  })

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    } else {
      obtenerAsignaciones(token)
    }
  }, [])

  const obtenerAsignaciones = async (token) => {
    try {
      const response = await fetch(API_ENDPOINTS.OBTENER_ASIGNACIONES, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear()
          navigate("/login")
        }
        throw new Error("Error en la respuesta del servidor")
      }

      const data = await response.json()
      setAsignaciones(data)
    } catch (error) {
      console.error("Error al obtener las asignaciones:", error)
    }
  }

  const asignacionesFiltradas = useMemo(() => {
    if (!busqueda.trim()) return asignaciones

    const busquedaLower = busqueda.toLowerCase()
    return asignaciones.filter(
      (asignacion) =>
        asignacion.docenteNombre?.toLowerCase().includes(busquedaLower) ||
        asignacion.cursoNombre?.toLowerCase().includes(busquedaLower) ||
        asignacion.sedeNombre?.toLowerCase().includes(busquedaLower) ||
        asignacion.salonNombre?.toLowerCase().includes(busquedaLower)
    )
  }, [asignaciones, busqueda])

  const asignacionesOrdenadas = useMemo(() => {
    return [...asignacionesFiltradas].sort((a, b) => {
      if (a[ordenamiento.campo] < b[ordenamiento.campo]) {
        return ordenamiento.direccion === "asc" ? -1 : 1
      }
      if (a[ordenamiento.campo] > b[ordenamiento.campo]) {
        return ordenamiento.direccion === "asc" ? 1 : -1
      }
      return 0
    })
  }, [asignacionesFiltradas, ordenamiento])

  const ordenarPor = (campo) => {
    setOrdenamiento((prev) => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }))
  }

  const abrirModalAgregar = () => {
    setAsignacionEditando(null)
    setModalAbierto(true)
  }

  const abrirModalEditar = (asignacion) => {
    setAsignacionEditando(asignacion)
    setModalAbierto(true)
  }

  const eliminarAsignacion = async (id) => {
    if (window.confirm("¿Está seguro de eliminar esta asignación?")) {
      try {
        // await eliminarAsignacionAPI(id);
        setAsignaciones(asignaciones.filter((asignacion) => asignacion.id !== id))
      } catch (error) {
        console.error("Error al eliminar asignación:", error)
      }
    }
  }

  const manejarGuardar = async (datosAsignacion) => {
    try {
      const cursoNombre = CURSOS_NIVEL[datosAsignacion.cursoNivel] || "Curso Desconocido"
      const sedeNombre = SEDES[datosAsignacion.sede] || "Sede Desconocida"
      const salonNombre = SALONES[datosAsignacion.salon] || "Salón Desconocido"

      const docentes = [
        { id: 1, nombreCompleto: "Juan Figueroa" },
        { id: 2, nombreCompleto: "María González" },
        { id: 3, nombreCompleto: "Carlos Rodríguez" },
        { id: 4, nombreCompleto: "Ana Martínez" },
        { id: 5, nombreCompleto: "Luis Hernández" },
      ]

      const docente = docentes.find((d) => d.id === datosAsignacion.docenteId)
      const docenteNombre = docente ? docente.nombreCompleto : "Docente Desconocido"

      if (asignacionEditando) {
        setAsignaciones(
          asignaciones.map((asignacion) =>
            asignacion.id === asignacionEditando.id
              ? {
                  ...asignacion,
                  ...datosAsignacion,
                  cursoNombre,
                  sedeNombre,
                  salonNombre,
                  docenteNombre,
                }
              : asignacion
          )
        )
      } else {


        /*
        const nuevaAsignacion = {
          id: Date.now(),
          ...datosAsignacion,
          cursoNombre,
          sedeNombre,
          salonNombre,
          docenteNombre,
        }
      console.log(nuevaAsignacion);

        setAsignaciones([...asignaciones, nuevaAsignacion])*/

const token = localStorage.getItem("token")

const respuesta = await fetch(API_ENDPOINTS.CREAR_ASIGNACION, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    cursoNombre: datosAsignacion.cursoNivel,
    salonNombre: datosAsignacion.salon,
    sedeNombre: datosAsignacion.sede,
    docenteId: datosAsignacion.docenteId,
  }),
})

if (!respuesta.ok) {
  const error = await respuesta.json()
  throw new Error(error.message || "Error al guardar la asignación")
}

// ✅ Actualizar desde la BD luego de insertar
await obtenerAsignaciones(token)

      }

      

      setModalAbierto(false)
    } catch (error) {
      console.error("Error al guardar asignación:", error)
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión Académica
      </Typography>

      <BarraHerramientasGestion
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        abrirModalAgregar={abrirModalAgregar}
        totalAsignaciones={asignaciones.length}
        asignacionesFiltradas={asignacionesFiltradas.length}
        mostrarFiltrados={busqueda.trim() !== ""}
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
      />
    </Container>
  )
}
