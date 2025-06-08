"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { CAMPOS_FORMULARIO } from "../configuracion";
import "../Estilos/modal.css";

export default function ModalAlumno({ open, onClose, alumno, onGuardar }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    gradoSeccion: "",
    sede: "",
  });

  const [errores, setErrores] = useState({});

  // Cargar datos del alumno cuando se abre el modal para editar
  useEffect(() => {
    if (alumno) {
      setFormData({
        nombre: alumno.nombre || "",
        apellido1: alumno.apellido1 || "",
        apellido2: alumno.apellido2 || "",
        gradoSeccion: alumno.gradoSeccion || "",
        sede: alumno.sede || "",
      });
    } else {
      // Resetear el formulario si es un nuevo alumno
      setFormData({
        nombre: "",
        apellido1: "",
        apellido2: "",
        gradoSeccion: "",
        sede: "",
      });
    }
    setErrores({});
  }, [alumno, open]);

  const handleChange = (e) => {
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

    CAMPOS_FORMULARIO.forEach((campo) => {
      if (campo.required && !formData[campo.key]) {
        nuevosErrores[campo.key] = `El campo ${campo.label} es obligatorio`;
        esValido = false;
      }
    });

    setErrores(nuevosErrores);
    return esValido;
  };

  const handleSubmit = (e) => {
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

      <form onSubmit={handleSubmit}>
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
                      name="nombre"
                      label="Nombre"
                      value={formData.nombre}
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                    <TextField
                      name="gradoSeccion"
                      label="Grado y Sección"
                      value={formData.gradoSeccion}
                      onChange={handleChange}
                      required
                      error={!!errores.gradoSeccion}
                      helperText={errores.gradoSeccion}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                    />
                  </div>
                  <div className="campo-completo">
                    <TextField
                      name="sede"
                      label="Sede"
                      value={formData.sede}
                      onChange={handleChange}
                      required
                      error={!!errores.sede}
                      helperText={errores.sede}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                    />
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
