import { useState, useEffect } from "react";
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
} from "@mui/material";
import "../Estilos/modal.css";

export default function ModalAlumno({ open, onClose, alumno, onGuardar }) {
  // Estado unificado para todos los campos del formulario
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    nivelEstudio: "",
    grado: "",
    sede: "",
  });

  const [errores, setErrores] = useState({});

  // Datos de niveles de estudio
  const nivelesEstudio = [
    { valor: 1, nombre: "Primaria" },
    { valor: 2, nombre: "Secundaria" },
  ];

  // Datos de grados según el nivel
  const gradosPrimaria = [
    { valor: 1, nombre: "1ro" },
    { valor: 2, nombre: "2do" },
    { valor: 3, nombre: "3ro" },
    { valor: 4, nombre: "4to" },
    { valor: 5, nombre: "5to" },
    { valor: 6, nombre: "6to" },
  ];

  const gradosSecundaria = [
    { valor: 1, nombre: "1ro" },
    { valor: 2, nombre: "2do" },
    { valor: 3, nombre: "3ro" },
    { valor: 4, nombre: "4to" },
    { valor: 5, nombre: "5to" },
  ];

  // Datos de sedes con nuevos valores
  const sedes = [
    { valor: 1, nombre: "Sede Carrión" },
    { valor: 2, nombre: "Sede Británico" },
  ];

  // Función para obtener los grados disponibles según el nivel seleccionado
  const obtenerGradosDisponibles = () => {
    if (formData.nivelEstudio === 1) {
      return gradosPrimaria;
    } else if (formData.nivelEstudio === 2) {
      return gradosSecundaria;
    }
    return [];
  };

  // Cargar datos del alumno cuando se abre el modal para editar
  useEffect(() => {
    if (alumno) {
      setFormData({
        dni: alumno.dni || "",
        nombre: alumno.nombre || "",
        apellido1: alumno.apellido1 || "",
        apellido2: alumno.apellido2 || "",
        nivelEstudio: alumno.nivelEstudio || "",
        grado: alumno.grado || "",
        sede: alumno.sede || "",
      });
    } else {
      // Resetear el formulario si es un nuevo alumno
      setFormData({
        dni: "",
        nombre: "",
        apellido1: "",
        apellido2: "",
        nivelEstudio: "",
        grado: "",
        sede: "",
      });
    }
    setErrores({});
  }, [alumno, open]);

  // Función unificada para manejar cambios en todos los campos
  const manejarCambio = (e) => {
    const { name, value } = e.target;

    // Si cambia el nivel de estudio, resetear el grado
    if (name === "nivelEstudio") {
      setFormData({
        ...formData,
        [name]: value,
        grado: "", // Resetear grado cuando cambia el nivel
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Limpiar error cuando el usuario escribe
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: "",
      });
    }

    // También limpiar error de grado si se cambia el nivel
    if (name === "nivelEstudio" && errores.grado) {
      setErrores({
        ...errores,
        [name]: "",
        grado: "",
      });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    let esValido = true;

    // Validar campos requeridos
    const camposRequeridos = [
      "dni",
      "nombre",
      "apellido1",
      "apellido2",
      "nivelEstudio",
      "grado",
      "sede",
    ];

    camposRequeridos.forEach((campo) => {
      if (!formData[campo] || formData[campo].toString().trim() === "") {
        nuevosErrores[campo] = `El campo es obligatorio`;
        esValido = false;
      }
    });

    // Validar DNI (debe tener 8 dígitos)
    if (formData.dni && formData.dni.length !== 8) {
      nuevosErrores.dni = "El DNI debe tener 8 dígitos";
      esValido = false;
    }

    // Validar que se haya seleccionado un nivel antes del grado
    if (formData.grado && !formData.nivelEstudio) {
      nuevosErrores.nivelEstudio =
        "Debe seleccionar primero el nivel de estudio";
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      onGuardar(formData);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="modal-alumno"
    >
      <DialogTitle className="modal-titulo">
        {alumno ? "Editar Alumno" : "Agregar Nuevo Alumno"}
      </DialogTitle>

      <form onSubmit={manejarEnvio}>
        <DialogContent className="modal-contenido">
          <section className="fila-formulario">
            {/* Información Personal */}
            <div className="columna-mitad">
              <section className="seccion-formulario">
                <Typography variant="h6" className="titulo-seccion">
                  Información Personal
                </Typography>
                <div className="grupo-campos">
                  <div className="campo-completo">
                    <TextField
                      name="dni"
                      label="DNI"
                      type="number"
                      value={formData.dni}
                      onChange={manejarCambio}
                      required
                      error={!!errores.dni}
                      helperText={errores.dni}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                      inputProps={{ maxLength: 8 }}
                    />
                  </div>
                  <div className="campo-completo">
                    <TextField
                      name="nombre"
                      label="Nombre"
                      value={formData.nombre}
                      onChange={manejarCambio}
                      required
                      error={!!errores.nombre}
                      helperText={errores.nombre}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                    />
                  </div>
                  <div className="campo-completo">
                    <TextField
                      name="apellido1"
                      label="Primer Apellido"
                      value={formData.apellido1}
                      onChange={manejarCambio}
                      required
                      error={!!errores.apellido1}
                      helperText={errores.apellido1}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                    />
                  </div>
                  <div className="campo-completo">
                    <TextField
                      name="apellido2"
                      label="Segundo Apellido"
                      value={formData.apellido2}
                      onChange={manejarCambio}
                      required
                      error={!!errores.apellido2}
                      helperText={errores.apellido2}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Información Académica */}
            <div className="columna-mitad">
              <section className="seccion-formulario">
                <Typography variant="h6" className="titulo-seccion">
                  Información Académica
                </Typography>
                <div className="grupo-campos">
                  {/* Select de Nivel de Estudio */}
                  <div className="campo-completo">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      error={!!errores.nivelEstudio}
                      required
                    >
                      <InputLabel>Nivel de Estudio</InputLabel>
                      <Select
                        name="nivelEstudio"
                        value={formData.nivelEstudio}
                        label="Nivel de Estudio"
                        onChange={manejarCambio}
                        className="campo-formulario"
                        displayEmpty
                      >
                        <em>Seleccione el nivel de estudio</em>
                        {nivelesEstudio.map((nivel) => (
                          <MenuItem key={nivel.valor} value={nivel.valor}>
                            {nivel.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errores.nivelEstudio && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 1.5 }}
                        >
                          {errores.nivelEstudio}
                        </Typography>
                      )}
                    </FormControl>
                  </div>

                  {/* Select de Grado - Solo se muestra si hay nivel seleccionado */}
                  <div className="campo-completo">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      error={!!errores.grado}
                      required
                      disabled={!formData.nivelEstudio}
                    >
                      <InputLabel>Grado</InputLabel>
                      <Select
                        name="grado"
                        value={formData.grado}
                        label="Grado"
                        onChange={manejarCambio}
                        className="campo-formulario"
                        displayEmpty
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                              width: 250,
                            },
                          },
                        }}
                      >
                        <em>
                          {formData.nivelEstudio
                            ? "Seleccione el grado"
                            : "Primero seleccione el nivel de estudio"}
                        </em>
                        {obtenerGradosDisponibles().map((grado) => (
                          <MenuItem key={grado.valor} value={grado.valor}>
                            {grado.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errores.grado && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 1.5 }}
                        >
                          {errores.grado}
                        </Typography>
                      )}
                    </FormControl>
                  </div>

                  {/* Select de Sede */}
                  <div className="campo-completo">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      error={!!errores.sede}
                      required
                    >
                      <InputLabel>Sede</InputLabel>
                      <Select
                        name="sede"
                        value={formData.sede}
                        label="Sede"
                        onChange={manejarCambio}
                        className="campo-formulario"
                        displayEmpty
                      >
                        <em>Seleccione la Sede</em>
                        {sedes.map((sede) => (
                          <MenuItem key={sede.valor} value={sede.valor}>
                            {sede.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errores.sede && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 1.5 }}
                        >
                          {errores.sede}
                        </Typography>
                      )}
                    </FormControl>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </DialogContent>

        <DialogActions className="modal-acciones">
          <Button onClick={onClose} color="inherit" className="boton-cancelar">
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="boton-guardar"
          >
            {alumno ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
