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

export default function ModalCurso({ open, onClose, curso, onGuardar }) {
  // Estado unificado para todos los campos del formulario
  const [formData, setFormData] = useState({
    nombreCurso: "",
    nivel: "",
  });

  const [errores, setErrores] = useState({});

  // Datos de niveles de estudio
  const niveles = [
    { valor: 1, nombre: "Primaria" },
    { valor: 2, nombre: "Secundaria" },
  ];

  // Cargar datos del curso cuando se abre el modal para editar
  useEffect(() => {
    if (curso) {
      setFormData({
        nombreCurso: curso.nombre || "",
        nivel: curso.nivel || "",
      });
    } else {
      // Resetear el formulario si es un nuevo curso
      setFormData({
        nombreCurso: "",
        nivel: "",
      });
    }
    setErrores({});
  }, [curso, open]);

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
    const camposRequeridos = ["nombreCurso", "nivel"];

    camposRequeridos.forEach((campo) => {
      if (!formData[campo] || formData[campo].toString().trim() === "") {
        nuevosErrores[campo] = `El campo es obligatorio`;
        esValido = false;
      }
    });

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
      maxWidth="sm"
      fullWidth
      className="modal-curso"
    >
      <DialogTitle className="modal-titulo">
        {curso ? "Editar Curso" : "Agregar Nuevo Curso"}
      </DialogTitle>

      <form onSubmit={manejarEnvio}>
        <DialogContent
          className="modal-contenido"
          sx={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          <section className="seccion-formulario">
            <Typography variant="h6" className="titulo-seccion">
              Información del Curso
            </Typography>
            <div className="grupo-campos">
              <div className="campo-completo">
                <TextField
                  name="nombreCurso"
                  label="Nombre del Curso"
                  value={formData.nombreCurso}
                  onChange={manejarCambio}
                  required
                  error={!!errores.nombreCurso}
                  helperText={errores.nombreCurso}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  className="campo-formulario"
                />
              </div>

              {/* Select de Nivel */}
              <div className="campo-completo">
                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  error={!!errores.nivel}
                  required
                >
                  <InputLabel>Nivel</InputLabel>
                  <Select
                    name="nivel"
                    value={formData.nivel}
                    label="Nivel"
                    onChange={manejarCambio}
                    className="campo-formulario"
                    displayEmpty
                  >
                    <em>Seleccione el nivel</em>
                    {niveles.map((nivel) => (
                      <MenuItem key={nivel.valor} value={nivel.valor}>
                        {nivel.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                  {errores.nivel && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, ml: 1.5 }}
                    >
                      {errores.nivel}
                    </Typography>
                  )}
                </FormControl>
              </div>
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
            {curso ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
