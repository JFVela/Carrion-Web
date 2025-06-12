"use client";

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
    area: "",
  });

  const [errores, setErrores] = useState({});

  // Datos de niveles de estudio
  const niveles = [
    { valor: 1, nombre: "Primaria" },
    { valor: 2, nombre: "Secundaria" },
  ];

  // Datos de áreas académicas
  const areas = [
    { valor: 1, nombre: "Comunicación" },
    { valor: 2, nombre: "Matemáticas" },
    { valor: 3, nombre: "Ciencias Naturales" },
    { valor: 4, nombre: "Ciencias Sociales" },
    { valor: 5, nombre: "Arte y Cultura" },
    { valor: 6, nombre: "Educación Física" },
    { valor: 7, nombre: "Inglés" },
    { valor: 8, nombre: "Computación" },
  ];

  // Cargar datos del curso cuando se abre el modal para editar
  useEffect(() => {
    if (curso) {
      setFormData({
        nombreCurso: curso.nombre || "",
        nivel: curso.nivel || "",
        area: curso.area || "",
      });
    } else {
      // Resetear el formulario si es un nuevo curso
      setFormData({
        nombreCurso: "",
        nivel: "",
        area: "",
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
    const camposRequeridos = ["nombreCurso", "nivel", "area"];

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

              {/* Select de Área */}
              <div className="campo-completo">
                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  error={!!errores.area}
                  required
                >
                  <InputLabel>Área</InputLabel>
                  <Select
                    name="area"
                    value={formData.area}
                    label="Área"
                    onChange={manejarCambio}
                    className="campo-formulario"
                    displayEmpty
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                          width: 250,
                        },
                      },
                    }}
                  >
                    <em>Seleccione el área</em>
                    {areas.map((area) => (
                      <MenuItem key={area.valor} value={area.valor}>
                        {area.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                  {errores.area && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, ml: 1.5 }}
                    >
                      {errores.area}
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
