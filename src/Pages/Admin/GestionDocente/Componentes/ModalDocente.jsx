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

export default function ModalDocente({ open, onClose, docente, onGuardar }) {
  // Estado unificado para todos los campos del formulario
  const [formData, setFormData] = useState({
    dni: "",
    nombreDocente: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    sedeAsignada: "",
    cursoEnsenar: "",
    salon: "",
  });

  const [errores, setErrores] = useState({});

  // Datos de sedes
  const sedes = [
    { valor: 1, nombre: "Sede Carrión" },
    { valor: 2, nombre: "Sede Británico" },
  ];

  // Datos de cursos disponibles
  const cursos = [
    { valor: 1, nombre: "Matemáticas" },
    { valor: 2, nombre: "Comunicación" },
    { valor: 3, nombre: "Ciencias Naturales" },
    { valor: 4, nombre: "Historia y Geografía" },
    { valor: 5, nombre: "Educación Física" },
  ];

  // Datos de salones disponibles
  const salones = [
    { valor: 1, nombre: "1ro de Secundaria" },
    { valor: 2, nombre: "2do de Secundaria" },
    { valor: 3, nombre: "3ro de Secundaria" },
    { valor: 4, nombre: "4to de Secundaria" },
    { valor: 5, nombre: "5to de Secundaria" },
    { valor: 6, nombre: "1ro de Primaria" },
    { valor: 7, nombre: "2do de Primaria" },
    { valor: 8, nombre: "3ro de Primaria" },
    { valor: 9, nombre: "4to de Primaria" },
    { valor: 10, nombre: "5to de Primaria" },
  ];

  // Cargar datos del docente cuando se abre el modal para editar
  useEffect(() => {
    if (docente) {
      setFormData({
        dni: docente.dni || "",
        nombreDocente: docente.nombreDocente || "",
        apellidoPaterno: docente.apellidoPaterno || "",
        apellidoMaterno: docente.apellidoMaterno || "",
        sedeAsignada: docente.sedeAsignada || "",
        cursoEnsenar: docente.cursoEnsenar || "",
        salon: docente.salon || "",
      });
    } else {
      // Resetear el formulario si es un nuevo docente
      setFormData({
        dni: "",
        nombreDocente: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        sedeAsignada: "",
        cursoEnsenar: "",
        salon: "",
      });
    }
    setErrores({});
  }, [docente, open]);

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
      "nombreDocente",
      "apellidoPaterno",
      "apellidoMaterno",
      "sedeAsignada",
      "cursoEnsenar",
      "salon",
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
        {docente ? "Editar Docente" : "Agregar Nuevo Docente"}
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
                      name="nombreDocente"
                      label="Nombre de Docente"
                      value={formData.nombreDocente}
                      onChange={manejarCambio}
                      required
                      error={!!errores.nombreDocente}
                      helperText={errores.nombreDocente}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                    />
                  </div>
                  <div className="campo-completo">
                    <TextField
                      name="apellidoPaterno"
                      label="Apellido Paterno"
                      value={formData.apellidoPaterno}
                      onChange={manejarCambio}
                      required
                      error={!!errores.apellidoPaterno}
                      helperText={errores.apellidoPaterno}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                    />
                  </div>
                  <div className="campo-completo">
                    <TextField
                      name="apellidoMaterno"
                      label="Apellido Materno"
                      value={formData.apellidoMaterno}
                      onChange={manejarCambio}
                      required
                      error={!!errores.apellidoMaterno}
                      helperText={errores.apellidoMaterno}
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
                  {/* Select de Sede Asignada */}
                  <div className="campo-completo">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      error={!!errores.sedeAsignada}
                      required
                    >
                      <InputLabel>Sede Asignada</InputLabel>
                      <Select
                        name="sedeAsignada"
                        value={formData.sedeAsignada}
                        label="Sede Asignada"
                        onChange={manejarCambio}
                        className="campo-formulario"
                        displayEmpty
                      >
                        <em>Seleccione la sede asignada</em>
                        {sedes.map((sede) => (
                          <MenuItem key={sede.valor} value={sede.valor}>
                            {sede.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errores.sedeAsignada && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 1.5 }}
                        >
                          {errores.sedeAsignada}
                        </Typography>
                      )}
                    </FormControl>
                  </div>

                  {/* Select de Curso a Enseñar */}
                  <div className="campo-completo">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      error={!!errores.cursoEnsenar}
                      required
                    >
                      <InputLabel>Curso a Enseñar</InputLabel>
                      <Select
                        name="cursoEnsenar"
                        value={formData.cursoEnsenar}
                        label="Curso a Enseñar"
                        onChange={manejarCambio}
                        className="campo-formulario"
                        displayEmpty
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                              width: 300,
                            },
                          },
                        }}
                      >
                        <em>Seleccione el curso a enseñar</em>
                        {cursos.map((curso) => (
                          <MenuItem key={curso.valor} value={curso.valor}>
                            {curso.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errores.cursoEnsenar && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 1.5 }}
                        >
                          {errores.cursoEnsenar}
                        </Typography>
                      )}
                    </FormControl>
                  </div>

                  {/* Select de Salón */}
                  <div className="campo-completo">
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      error={!!errores.salon}
                      required
                    >
                      <InputLabel>Salón</InputLabel>
                      <Select
                        name="salon"
                        value={formData.salon}
                        label="Salón"
                        onChange={manejarCambio}
                        className="campo-formulario"
                        displayEmpty
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                              width: 300,
                            },
                          },
                        }}
                      >
                        <em>Seleccione el salón</em>
                        {salones.map((salon) => (
                          <MenuItem key={salon.valor} value={salon.valor}>
                            {salon.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errores.salon && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 1.5 }}
                        >
                          {errores.salon}
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
            {docente ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
