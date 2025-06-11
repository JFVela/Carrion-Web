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

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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

  // Estado para el grado y nivel académico
  const [gradoNivel, setGrado] = useState("");

  // Datos de grados y niveles académicos
  const grados = [
    { valor: "1ro_sec", nombre: "1RO SECUNDARIA" },
    { valor: "2do_sec", nombre: "2DO SECUNDARIA" },
    { valor: "3ro_sec", nombre: "3RO SECUNDARIA" },
    { valor: "4to_sec", nombre: "4TO SECUNDARIA" },
    { valor: "5to_sec", nombre: "5TO SECUNDARIA" },
  ];

  // Función para manejar el cambio en el select de grado
  const evento = (event) => {
    setGrado(event.target.value);
  };

  // Variables de estado
  const [sede, setSede] = useState("");

  // Datos de sedes
  const sedes = [
    { valor: "sede-carrion", nombre: "Sede Carrion" },
    { valor: "sede-britanico", nombre: "Sede Britanico" },
  ];

  // Función para manejar cambios
  const manejarCambioSede = (evento) => {
    setSede(evento.target.value);
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
                      name="dni"
                      label="DNI"
                      type="number"
                      value={formData.dni}
                      onChange={handleChange}
                      required
                      error={!!errores.dni}
                      helperText={errores.dni}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                    />
                  </div>
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
                    <InputLabel>Grado</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gradoNivel}
                      label="Grado"
                      onChange={evento}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                      required
                      displayEmpty
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200, // Altura máxima del dropdown
                            width: 250,
                          },
                        },
                      }}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <em>Ingrese grado y nivel académico</em>;
                        }
                        return (
                          grados.find((g) => g.valor === selected)?.nombre ||
                          selected
                        );
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Ingrese grado y nivel académico</em>
                      </MenuItem>
                      {grados.map((grado) => (
                        <MenuItem key={grado.valor} value={grado.valor}>
                          {grado.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="campo-completo">
                    <InputLabel>Sede</InputLabel>
                    <Select
                      labelId="select-sede-label"
                      id="select-sede"
                      value={sede}
                      label="Sede"
                      onChange={manejarCambioSede}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      className="campo-formulario"
                      required
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <em>Ingrese la Sede</em>;
                        }
                        return (
                          sedes.find((s) => s.valor === selected)?.nombre ||
                          selected
                        );
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Ingrese la Sede</em>
                      </MenuItem>
                      {sedes.map((sede) => (
                        <MenuItem key={sede.valor} value={sede.valor}>
                          {sede.nombre}
                        </MenuItem>
                      ))}
                    </Select>
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
