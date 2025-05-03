import React from "react";
import Estilos from "./Estilos.module.css";

function TablaAlumnos({ alumnos, onEditar, onEliminar }) {
  // Si no hay alumnos, mostrar mensaje
  if (alumnos.length === 0) {
    return <p>No hay alumnos para mostrar.</p>;
  }

  // Obtener las columnas dinámicamente del primer alumno
  const columnas = Object.keys(alumnos[0]).filter((key) => key !== "id");

  return (
    <div className={Estilos.tablaContenedor}>
      <table className={Estilos.tablaAlumnos}>
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th key={columna}>
                {columna.charAt(0).toUpperCase() + columna.slice(1)}
              </th>
            ))}
            {/* Aquí: */}
            <th key="acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id}>
              {columnas.map((columna) => (
                <td key={`${alumno.id}-${columna}`}>{alumno[columna]}</td>
              ))}
              {/* Y aquí: */}
              <td key={`acciones-${alumno.id}`} className={Estilos.acciones}>
                <button
                  onClick={() => onEditar(alumno)}
                  className={Estilos.botonEditar}
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(alumno.id)}
                  className={Estilos.botonEliminar}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaAlumnos;
