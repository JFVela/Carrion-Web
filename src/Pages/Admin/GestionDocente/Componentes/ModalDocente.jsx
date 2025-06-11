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
} from "@mui/material";
import "../Estilos/modal.css";

export default function ModalDocente({ open, onClose, docente, onGuardar }) {
  // Estado unificado para todos los campos del formulario
  const [formData, setFormData] = useState({
    dni: "",
    nombreDocente: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    direccion: "",
    correoElectronico: "",
  });

  const [errores, setErrores] = useState({});

  // Cargar datos del docente cuando se abre el modal para editar
  useEffect(() => {
    if (docente) {
      setFormData({
        dni: docente.dni || "",
        nombreDocente: docente.nombreDocente || "",
        apellidoPaterno: docente.apellidoPaterno || "",
        apellidoMaterno: docente.apellidoMaterno || "",
        telefono: docente.telefono || "",
        direccion: docente.direccion || "",
        correoElectronico: docente.correoElectronico || "",
      });
    } else {
      // Resetear el formulario si es un nuevo docente
      setFormData({
        dni: "",
        nombreDocente: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        telefono: "",
        direccion: "",
        correoElectronico: "",
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
      "telefono",
      "direccion",
      "correoElectronico",
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

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      formData.correoElectronico &&
      !emailRegex.test(formData.correoElectronico)
    ) {
      nuevosErrores.correoElectronico = "Ingrese un correo electrónico válido";
      esValido = false;
    }

    // Validar teléfono (debe tener 9 dígitos)
    if (formData.telefono && formData.telefono.length !== 9) {
      nuevosErrores.telefono = "El teléfono debe tener 9 dígitos";
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
        <DialogContent
          className="modal-contenido"
          sx={{ maxHeight: "70vh", overflowY: "auto" }}
        >
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
                      label="Nombre del Docente"
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

            {/* Información de Contacto */}
            <div className="columna-mitad">
              <section className="seccion-formulario">
                <Typography variant="h6" className="titulo-seccion">
                  Información de Contacto
                </Typography>
                <div className="grupo-campos">
                  <div className="campo-completo">
                    <TextField
                      name="telefono"
                      label="Teléfono"
                      type="number"
                      value={formData.telefono}
                      onChange={manejarCambio}
                      required
                      error={!!errores.telefono}
                      helperText={errores.telefono}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                      inputProps={{ maxLength: 9 }}
                    />
                  </div>
                  <div className="campo-completo">
                    <TextField
                      name="direccion"
                      label="Dirección"
                      value={formData.direccion}
                      onChange={manejarCambio}
                      required
                      error={!!errores.direccion}
                      helperText={errores.direccion}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                      multiline
                      rows={3}
                    />
                  </div>
                  <div className="campo-completo">
                    <TextField
                      name="correoElectronico"
                      label="Correo Electrónico"
                      type="email"
                      value={formData.correoElectronico}
                      onChange={manejarCambio}
                      required
                      error={!!errores.correoElectronico}
                      helperText={errores.correoElectronico}
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
            {docente ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
