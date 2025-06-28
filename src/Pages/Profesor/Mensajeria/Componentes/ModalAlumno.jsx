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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";
import "../Estilos/modal.css";

export default function ModalNotificacion({
  open,
  onClose,
  notificacion,
  onGuardar,
  alumnos,
  loading,
}) {
  const [formData, setFormData] = useState({
    asunto: "",
    mensaje: "",
    emisor_tipo: "",
    emisor_id: "",
    alumno_id: "",
  });

  const [errores, setErrores] = useState({});

  const tiposEmisor = [
    { valor: "ADMIN", nombre: "Administrador" },
    { valor: "PROFESOR", nombre: "Profesor" },
  ];

  useEffect(() => {
    if (notificacion) {
      setFormData({
        asunto: notificacion.asunto || "",
        mensaje: notificacion.mensaje || "",
        emisor_tipo: notificacion.emisor_tipo || "",
        emisor_id: notificacion.emisor_id || "",
        alumno_id: notificacion.alumno_id || "",
      });
    } else {
      setFormData({
        asunto: "",
        mensaje: "",
        emisor_tipo: "ADMIN", // Valor por defecto
        emisor_id: "1", // Valor por defecto
        alumno_id: "",
      });
    }
    setErrores({});
  }, [notificacion, open]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    let esValido = true;

    if (!formData.asunto.trim()) {
      nuevosErrores.asunto = "El asunto es obligatorio";
      esValido = false;
    }

    if (!formData.mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje es obligatorio";
      esValido = false;
    }

    if (!formData.emisor_tipo) {
      nuevosErrores.emisor_tipo = "Seleccione el tipo de emisor";
      esValido = false;
    }

    if (!formData.emisor_id) {
      nuevosErrores.emisor_id = "El ID del emisor es obligatorio";
      esValido = false;
    }

    if (!formData.alumno_id) {
      nuevosErrores.alumno_id = "Seleccione un alumno";
      esValido = false;
    }

    // Validar que el alumno seleccionado tenga correo
    const alumnoSeleccionado = alumnos.find(
      (al) => al.id === formData.alumno_id
    );
    if (
      formData.alumno_id &&
      (!alumnoSeleccionado || !alumnoSeleccionado.correo)
    ) {
      nuevosErrores.alumno_id =
        "El alumno seleccionado no tiene correo registrado";
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (validarFormulario() && !loading) {
      onGuardar(formData);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {notificacion ? "Editar Notificación" : "Nueva Notificación"}
      </DialogTitle>
      <form onSubmit={manejarEnvio}>
        <DialogContent sx={{ maxHeight: "70vh", overflowY: "auto" }}>
          <TextField
            name="asunto"
            label="Asunto"
            value={formData.asunto}
            onChange={manejarCambio}
            fullWidth
            margin="dense"
            error={!!errores.asunto}
            helperText={errores.asunto}
            disabled={loading}
          />

          <TextField
            name="mensaje"
            label="Mensaje"
            value={formData.mensaje}
            onChange={manejarCambio}
            multiline
            rows={4}
            fullWidth
            margin="dense"
            error={!!errores.mensaje}
            helperText={errores.mensaje}
            disabled={loading}
          />

          <FormControl fullWidth margin="dense" error={!!errores.emisor_tipo}>
            <InputLabel>Tipo de Emisor</InputLabel>
            <Select
              name="emisor_tipo"
              value={formData.emisor_tipo}
              label="Tipo de Emisor"
              onChange={manejarCambio}
              disabled={loading}
            >
              {tiposEmisor.map((tipo) => (
                <MenuItem key={tipo.valor} value={tipo.valor}>
                  {tipo.nombre}
                </MenuItem>
              ))}
            </Select>
            {errores.emisor_tipo && (
              <Typography variant="caption" color="error">
                {errores.emisor_tipo}
              </Typography>
            )}
          </FormControl>

          <TextField
            name="emisor_id"
            label="ID del Emisor"
            value={formData.emisor_id}
            onChange={manejarCambio}
            fullWidth
            margin="dense"
            error={!!errores.emisor_id}
            helperText={errores.emisor_id}
            disabled={loading}
          />

          <FormControl fullWidth margin="dense" error={!!errores.alumno_id}>
            <InputLabel>Alumno Destinatario</InputLabel>
            <Select
              name="alumno_id"
              value={formData.alumno_id}
              label="Alumno Destinatario"
              onChange={manejarCambio}
              disabled={loading}
            >
              {alumnos?.map((al) => (
                <MenuItem key={al.id} value={al.id}>
                  {`${al.nombre} ${al.apellido1} ${al.apellido2}`}
                  {al.correo && (
                    <Typography
                      variant="caption"
                      sx={{ ml: 1, color: "text.secondary" }}
                    >
                      ({al.correo})
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Select>
            {errores.alumno_id && (
              <Typography variant="caption" color="error">
                {errores.alumno_id}
              </Typography>
            )}
          </FormControl>

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress size={24} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Enviando correo...
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit" disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Enviando..." : notificacion ? "Actualizar" : "Enviar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
