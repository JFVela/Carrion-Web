"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material"
import "../Estilos/modal.css"



export default function ModalAsignacionDocente({ open, onClose, asignacion, onGuardar }) {
  // Datos locales de docentes
  const docentes = [
    { id: 1, nombreCompleto: "Juan Figueroa" },
    { id: 2, nombreCompleto: "María González" },
    { id: 3, nombreCompleto: "Carlos Rodríguez" },
    { id: 4, nombreCompleto: "Ana Martínez" },
    { id: 5, nombreCompleto: "Luis Hernández" },
    { id: 6, nombreCompleto: "Carmen López" },
    { id: 7, nombreCompleto: "Roberto Silva" },
    { id: 8, nombreCompleto: "Patricia Morales" },
    { id: 9, nombreCompleto: "Diego Vargas" },
    { id: 10, nombreCompleto: "Sofía Castillo" },
  ]

  // Datos locales de cursos + nivel
  const cursosNivel = [
    { valor: "aritmetica_primaria", nombre: "Aritmética Primaria" },
    { valor: "aritmetica_secundaria", nombre: "Aritmética Secundaria" },
    { valor: "algebra_secundaria", nombre: "Álgebra Secundaria" },
    { valor: "geometria_primaria", nombre: "Geometría Primaria" },
    { valor: "geometria_secundaria", nombre: "Geometría Secundaria" },
  ]

  // Datos locales de sedes
  const sedes = [
    { valor: "carrion", nombre: "Carrión" },
    { valor: "bitanico", nombre: "Bitánico" },
  ]

  // Datos locales de salones
  const salones = [
    { valor: "1ro_secundaria", nombre: "1ro Secundaria" },
    { valor: "2do_secundaria", nombre: "2do Secundaria" },
    { valor: "3ro_secundaria", nombre: "3ro Secundaria" },
    { valor: "4to_secundaria", nombre: "4to Secundaria" },
    { valor: "5to_secundaria", nombre: "5to Secundaria" },
  ]

  const [formData, setFormData] = useState({
    docenteId: "",
    cursoNivel: "",
    sede: "",
    salon: "",
  })

  const [busquedaDocente, setBusquedaDocente] = useState("")
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null)
  const [errores, setErrores] = useState({})

  // Filtrar docentes según la búsqueda
  const docentesFiltrados = useMemo(() => {
    return docentes.filter((docente) => docente.nombreCompleto.toLowerCase().includes(busquedaDocente.toLowerCase()))
  }, [docentes, busquedaDocente])

  // Cargar datos cuando se abre el modal para editar
  useEffect(() => {
    if (asignacion) {
      setFormData({
        docenteId: asignacion.docenteId || "",
        cursoNivel: asignacion.cursoNivel || "",
        sede: asignacion.sede || "",
        salon: asignacion.salon || "",
      })
      setDocenteSeleccionado(asignacion.docenteId || null)
    } else {
      // Resetear el formulario si es una nueva asignación
      setFormData({
        docenteId: "",
        cursoNivel: "",
        sede: "",
        salon: "",
      })
      setDocenteSeleccionado(null)
    }
    setBusquedaDocente("")
    setErrores({})
  }, [asignacion, open])

  const seleccionarDocente = (docente) => {
    setDocenteSeleccionado(docente.id)
    setFormData({
      ...formData,
      docenteId: docente.id,
    })

    // Limpiar error cuando se selecciona un docente
    if (errores.docenteId) {
      setErrores({
        ...errores,
        docenteId: "",
      })
    }
  }

  const manejarCambio = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    // Limpiar error cuando el usuario selecciona
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: "",
      })
    }
  }

  const validarFormulario = () => {
    const nuevosErrores = {}
    let esValido = true

    // Validar campos requeridos
    if (!formData.docenteId) {
      nuevosErrores.docenteId = "Debe seleccionar un docente"
      esValido = false
    }

    const camposRequeridos = ["cursoNivel", "sede", "salon"]
    camposRequeridos.forEach((campo) => {
      if (!formData[campo] || formData[campo].toString().trim() === "") {
        nuevosErrores[campo] = "El campo es obligatorio"
        esValido = false
      }
    })

    setErrores(nuevosErrores)
    return esValido
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()

    if (validarFormulario()) {
      try {
       
        onGuardar(formData)
      } catch (error) {
        console.error("Error al procesar asignación:", error)
        // setErrores({ general: 'Error al procesar la asignación. Intente nuevamente.' });
      }
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth className="modal-curso">
      <DialogTitle className="modal-titulo">
        {asignacion ? "Editar Asignación de Docente" : "Nueva Asignación de Docente"}
      </DialogTitle>

      <form onSubmit={manejarEnvio}>
        <DialogActions className="modal-acciones">
          <Button onClick={onClose} color="inherit" className="boton-cancelar">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary" className="boton-guardar">
            {asignacion ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </form>
      <DialogContent className="modal-contenido" sx={{ maxHeight: "70vh", overflowY: "auto" }}>
        <section className="fila-formulario">
          {/* Columna izquierda - Tabla de docentes */}
          <div className="columna-mitad">
            <section className="seccion-formulario">
              <Typography variant="h6" className="titulo-seccion">
                Seleccionar Docente
              </Typography>

              <div className="grupo-campos">
                <div className="campo-completo">
                  <TextField
                    label="Buscar docente"
                    value={busquedaDocente}
                    onChange={(e) => setBusquedaDocente(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    className="campo-formulario"
                    placeholder="Escriba el nombre del docente..."
                  />
                </div>

                {errores.docenteId && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errores.docenteId}
                  </Typography>
                )}

                <div className="campo-completo">
                  <Box sx={{ mt: 2, maxHeight: 350, overflow: "auto" }}>
                    <TableContainer component={Paper} variant="outlined">
                      <Table stickyHeader size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Nombre Completo</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {docentesFiltrados.map((docente) => (
                            <TableRow
                              key={docente.id}
                              onClick={() => seleccionarDocente(docente)}
                              sx={{
                                cursor: "pointer",
                                backgroundColor: docenteSeleccionado === docente.id ? "#e3f2fd" : "inherit",
                                "&:hover": {
                                  backgroundColor: docenteSeleccionado === docente.id ? "#bbdefb" : "#f5f5f5",
                                },
                              }}
                            >
                              <TableCell>{docente.id}</TableCell>
                              <TableCell>{docente.nombreCompleto}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </div>
              </div>
            </section>
          </div>

          {/* Columna derecha - Selects */}
          <div className="columna-mitad">
            <section className="seccion-formulario">
              <Typography variant="h6" className="titulo-seccion">
                Información de Asignación
              </Typography>

              <div className="grupo-campos">
                {/* Select de Sede */}
                <div className="campo-completo">
                  <FormControl fullWidth variant="outlined" margin="dense" error={!!errores.sede} required>
                    <InputLabel>Sede</InputLabel>
                    <Select
                      name="sede"
                      value={formData.sede}
                      label="Sede"
                      onChange={manejarCambio}
                      className="campo-formulario"
                    >
                      <em>Seleccione una sede</em>
                      {sedes.map((sede) => (
                        <MenuItem key={sede.valor} value={sede.valor}>
                          {sede.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                    {errores.sede && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        {errores.sede}
                      </Typography>
                    )}
                  </FormControl>
                </div>

                {/* Select de Curso + Nivel */}
                <div className="campo-completo">
                  <FormControl fullWidth variant="outlined" margin="dense" error={!!errores.cursoNivel} required>
                    <InputLabel>Curso + Nivel</InputLabel>
                    <Select
                      name="cursoNivel"
                      value={formData.cursoNivel}
                      label="Curso + Nivel"
                      onChange={manejarCambio}
                      className="campo-formulario"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300,
                            width: 250,
                          },
                        },
                      }}
                    >
                      <em>Seleccione curso y nivel</em>
                      {cursosNivel.map((curso) => (
                        <MenuItem key={curso.valor} value={curso.valor}>
                          {curso.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                    {errores.cursoNivel && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        {errores.cursoNivel}
                      </Typography>
                    )}
                  </FormControl>
                </div>

                {/* Select de Salón */}
                <div className="campo-completo">
                  <FormControl fullWidth variant="outlined" margin="dense" error={!!errores.salon} required>
                    <InputLabel>Salón</InputLabel>
                    <Select
                      name="salon"
                      value={formData.salon}
                      label="Salón"
                      onChange={manejarCambio}
                      className="campo-formulario"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300,
                            width: 250,
                          },
                        },
                      }}
                    >
                      <em>Seleccione un salón</em>
                      {salones.map((salon) => (
                        <MenuItem key={salon.valor} value={salon.valor}>
                          {salon.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                    {errores.salon && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        {errores.salon}
                      </Typography>
                    )}
                  </FormControl>
                </div>

                {/* Información del docente seleccionado */}
                {docenteSeleccionado && (
                  <div className="campo-completo">
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        backgroundColor: "#e8f5e8",
                        border: "1px solid #4caf50",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                        Docente Seleccionado:
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#2e7d32" }}>
                        {docentes.find((d) => d.id === docenteSeleccionado)?.nombreCompleto}
                      </Typography>
                    </Box>
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}
