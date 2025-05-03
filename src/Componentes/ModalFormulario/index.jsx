import { useState, useEffect } from "react";
import Estilos from "./Estilos.module.css";

function ModalFormulario({ alumno, columnas, onGuardar, onCerrar }) {
  // Estado inicial del formulario
  const [formData, setFormData] = useState(() => {
    const inicial = {};
    columnas.forEach((col) => {
      inicial[col] = alumno?.[col] ?? "";
    });
    return inicial;
  });

  // Actualizar el estado cuando se edita
  useEffect(() => {
    const inicial = {};
    columnas.forEach((col) => {
      inicial[col] = alumno?.[col] ?? "";
    });
    setFormData(inicial);
  }, [alumno, columnas]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          {columnas.map((columna) => (
            <div key={columna} className={Estilos.campoFormulario}>
              <label htmlFor={columna}>{columna}:</label>
              <input
                name={columna}
                value={formData[columna]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
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
