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
    gradoSeccion: "",
    sede: "",
  });

  const [errores, setErrores] = useState({});

  // Datos de grados y niveles académicos
  const grados = [
    { valor: "1ro_sec", nombre: "1RO SECUNDARIA" },
    { valor: "2do_sec", nombre: "2DO SECUNDARIA" },
    { valor: "3ro_sec", nombre: "3RO SECUNDARIA" },
    { valor: "4to_sec", nombre: "4TO SECUNDARIA" },
    { valor: "5to_sec", nombre: "5TO SECUNDARIA" },
  ];

  // Datos de sedes
  const sedes = [
    { valor: "sede-carrion", nombre: "Sede Carrion" },
    { valor: "sede-britanico", nombre: "Sede Britanico" },
  ];

  // Cargar datos del alumno cuando se abre el modal para editar
  useEffect(() => {
    if (alumno) {
      setFormData({
        dni: alumno.dni || "",
        nombre: alumno.nombre || "",
        apellido1: alumno.apellido1 || "",
        apellido2: alumno.apellido2 || "",
        gradoSeccion: alumno.gradoSeccion || "",
        sede: alumno.sede || "",
      });
    } else {
      // Resetear el formulario si es un nuevo alumno
      setFormData({
        dni: "",
        nombre: "",
        apellido1: "",
        apellido2: "",
        gradoSeccion: "",
        sede: "",
      });
    }
    setErrores({});
  }, [alumno, open]);

  // Función unificada para manejar cambios en todos los campos
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error cuando el usuario escribe
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: "",
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
      "gradoSeccion",
      "sede",
    ];

    camposRequeridos.forEach((campo) => {
      if (!formData[campo] || formData[campo].trim() === "") {
        nuevosErrores[campo] = `El campo es obligatorio`;
        esValido = false;
      }
    });

    // Validar DNI (debe tener 8 dígitos)
    if (formData.dni && formData.dni.length !== 8) {
      nuevosErrores.dni = "El DNI debe tener 8 dígitos";
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
                  <div className="campo-completo">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      error={!!errores.gradoSeccion}
                      required
                    >
                      <InputLabel>Grado</InputLabel>
                      <Select
                        name="gradoSeccion"
                        value={formData.gradoSeccion}
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
                        <em>Seleccione grado y nivel académico</em>
                        {grados.map((grado) => (
                          <MenuItem key={grado.valor} value={grado.valor}>
                            {grado.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errores.gradoSeccion && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 1.5 }}
                        >
                          {errores.gradoSeccion}
                        </Typography>
                      )}
                    </FormControl>
                  </div>
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
