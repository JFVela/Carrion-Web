"use client"
import { useState, useMemo } from "react"
import { Container, Typography } from "@mui/material"
import TablaGestionAcademica from "./Componentes/TablaGestion"
import BarraHerramientasGestion from "./Componentes/BarraHerramientas"
import ModalAsignacionDocente from "./Componentes/ModalGestion"
import { CURSOS_NIVEL, SEDES, SALONES } from "./configuracion"

// ==================== FUNCIONES API (COMENTADAS) ====================
// Estas funciones serán implementadas cuando se conecte con el backend

// Función para obtener todas las asignaciones
// const obtenerAsignaciones = async () => {
//   try {
//     const response = await fetch('/api/asignaciones', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       throw new Error('Error al obtener asignaciones');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// Función para crear una nueva asignación
// const crearAsignacion = async (datosAsignacion) => {
//   try {
//     const response = await fetch('/api/asignaciones', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(datosAsignacion),
//     });
//     if (!response.ok) {
//       throw new Error('Error al crear asignación');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// Función para actualizar una asignación existente
// const actualizarAsignacion = async (id, datosAsignacion) => {
//   try {
//     const response = await fetch(`/api/asignaciones/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(datosAsignacion),
//     });
//     if (!response.ok) {
//       throw new Error('Error al actualizar asignación');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// Función para eliminar una asignación
// const eliminarAsignacionAPI = async (id) => {
//   try {
//     const response = await fetch(`/api/asignaciones/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       throw new Error('Error al eliminar asignación');
//     }
//     return true;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// Función para obtener lista de docentes
// const obtenerDocentes = async () => {
//   try {
//     const response = await fetch('/api/docentes', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       throw new Error('Error al obtener docentes');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// Función para obtener cursos disponibles
// const obtenerCursos = async () => {
//   try {
//     const response = await fetch('/api/cursos', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       throw new Error('Error al obtener cursos');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// Función para obtener sedes disponibles
// const obtenerSedes = async () => {
//   try {
//     const response = await fetch('/api/sedes', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       throw new Error('Error al obtener sedes');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// Función para obtener salones disponibles
// const obtenerSalones = async () => {
//   try {
//     const response = await fetch('/api/salones', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       throw new Error('Error al obtener salones');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// ==================== FIN FUNCIONES API ====================

export default function GestionAcademicaPage() {
  // Datos de ejemplo de asignaciones
  const [asignaciones, setAsignaciones] = useState([
    {
      id: 1,
      docenteId: 1,
      docenteNombre: "Juan Figueroa",
      cursoNivel: "aritmetica_secundaria",
      cursoNombre: "Aritmética Secundaria",
      sede: "carrion",
      sedeNombre: "Carrión",
      salon: "1ro_secundaria",
      salonNombre: "1ro Secundaria",
    },
    {
      id: 2,
      docenteId: 2,
      docenteNombre: "María González",
      cursoNivel: "algebra_secundaria",
      cursoNombre: "Álgebra Secundaria",
      sede: "bitanico",
      sedeNombre: "Bitánico",
      salon: "2do_secundaria",
      salonNombre: "2do Secundaria",
    },
    {
      id: 3,
      docenteId: 3,
      docenteNombre: "Carlos Rodríguez",
      cursoNivel: "geometria_primaria",
      cursoNombre: "Geometría Primaria",
      sede: "carrion",
      sedeNombre: "Carrión",
      salon: "3ro_secundaria",
      salonNombre: "3ro Secundaria",
    },
  ])

  const [busqueda, setBusqueda] = useState("")
  const [modalAbierto, setModalAbierto] = useState(false)
  const [asignacionEditando, setAsignacionEditando] = useState(null)
  const [ordenamiento, setOrdenamiento] = useState({
    campo: "id",
    direccion: "asc",
  })

  // Filtrar asignaciones según la búsqueda
  const asignacionesFiltradas = useMemo(() => {
    if (!busqueda.trim()) return asignaciones

    const busquedaLower = busqueda.toLowerCase()
    return asignaciones.filter(
      (asignacion) =>
        asignacion.docenteNombre.toLowerCase().includes(busquedaLower) ||
        asignacion.cursoNombre.toLowerCase().includes(busquedaLower) ||
        asignacion.sedeNombre.toLowerCase().includes(busquedaLower) ||
        asignacion.salonNombre.toLowerCase().includes(busquedaLower),
    )
  }, [asignaciones, busqueda])

  // Ordenar asignaciones
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
    setOrdenamiento((prevOrdenamiento) => ({
      campo,
      direccion: prevOrdenamiento.campo === campo && prevOrdenamiento.direccion === "asc" ? "desc" : "asc",
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
        // ===== USAR API PARA ELIMINAR =====
        // await eliminarAsignacionAPI(id);

        // Eliminar de estado local (TEMPORAL)
        setAsignaciones(asignaciones.filter((asignacion) => asignacion.id !== id))
      } catch (error) {
        console.error("Error al eliminar asignación:", error)
        // alert('Error al eliminar la asignación. Por favor, intente nuevamente.');
      }
    }
  }

  const manejarGuardar = async (datosAsignacion) => {
    try {
      // Obtener los nombres correspondientes a los valores
      const cursoNombre = CURSOS_NIVEL[datosAsignacion.cursoNivel] || "Curso Desconocido"
      const sedeNombre = SEDES[datosAsignacion.sede] || "Sede Desconocida"
      const salonNombre = SALONES[datosAsignacion.salon] || "Salón Desconocido"

      // Obtener el nombre del docente (en un caso real esto vendría de una base de datos)
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
        // ===== USAR API PARA ACTUALIZAR =====
        // const asignacionActualizada = await actualizarAsignacion(asignacionEditando.id, {
        //   ...datosAsignacion,
        //   cursoNombre,
        //   sedeNombre,
        //   salonNombre,
        //   docenteNombre,
        // });

        // Editar asignación existente (TEMPORAL - usando estado local)
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
              : asignacion,
          ),
        )
      } else {
        // ===== USAR API PARA CREAR =====
        // const nuevaAsignacion = await crearAsignacion({
        //   ...datosAsignacion,
        //   cursoNombre,
        //   sedeNombre,
        //   salonNombre,
        //   docenteNombre,
        // });

        // Agregar nueva asignación (TEMPORAL - usando estado local)
        const nuevaAsignacion = {
          id: Date.now(),
          ...datosAsignacion,
          cursoNombre,
          sedeNombre,
          salonNombre,
          docenteNombre,
        }
        setAsignaciones([...asignaciones, nuevaAsignacion])
      }
      setModalAbierto(false)
    } catch (error) {
      console.error("Error al guardar asignación:", error)
      // Aquí podrías mostrar un mensaje de error al usuario
      // alert('Error al guardar la asignación. Por favor, intente nuevamente.');
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
