import { useState, useEffect } from "react";
import Estilos from "./Estilos.module.css";

function ModalFormulario({ alumno, onGuardar, onCerrar }) {
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellido: "",
    edad: "",
    promedio: "",
  });

  // Actualizar el estado cuando se recibe un alumno para editar
  useEffect(() => {
    if (alumno) {
      setFormData(alumno);
    } else {
      setFormData({
        id: "",
        nombre: "",
        apellido: "",
        edad: "",
        promedio: "",
      });
    }
  }, [alumno]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "edad"
          ? Number.parseInt(value) || ""
          : name === "promedio"
          ? Number.parseFloat(value) || ""
          : value,
    });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <div className={Estilos.modalFondo}>
      <div className={Estilos.modalContenido}>
        <h2>{alumno ? "Editar Alumno" : "Agregar Alumno"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={Estilos.campoFormulario}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className={Estilos.campoFormulario}>
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className={Estilos.campoFormulario}>
            <label htmlFor="edad">Edad:</label>
            <input
              type="number"
              id="edad"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className={Estilos.campoFormulario}>
            <label htmlFor="promedio">Promedio:</label>
            <input
              type="number"
              id="promedio"
              name="promedio"
              value={formData.promedio}
              onChange={handleChange}
              required
              step="0.1"
              min="0"
              max="10"
            />
          </div>

          <div className={Estilos.botonesFormulario}>
            <button type="submit" className={Estilos.botonGuardar}>
              Guardar
            </button>
            <button
              type="button"
              onClick={onCerrar}
              className={Estilos.botonCancelar}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalFormulario;
