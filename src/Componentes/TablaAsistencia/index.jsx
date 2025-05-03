import { useState, useEffect } from "react";
import Estilos from "./Estilos.module.css";

const TablaAsistencia = ({ alumnos, onGuardarAsistencia }) => {
  // Estado para almacenar los datos de asistencia
  const [datosAsistencia, setDatosAsistencia] = useState([]);

  // Estado para manejar el texto de búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Estado para almacenar los alumnos filtrados según la búsqueda
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);

  // Efecto para inicializar los datos de asistencia y alumnos filtrados
  useEffect(() => {
    if (alumnos) {
      setDatosAsistencia(alumnos);
      setAlumnosFiltrados(alumnos);
    }
  }, [alumnos]);

  // Efecto para filtrar alumnos según el texto de búsqueda
  useEffect(() => {
    const resultadosFiltrados = alumnos.filter(
      (alumno) =>
        alumno.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        alumno.apellido1.toLowerCase().includes(busqueda.toLowerCase()) ||
        alumno.apellido2.toLowerCase().includes(busqueda.toLowerCase())
    );
    setAlumnosFiltrados(resultadosFiltrados);
  }, [busqueda, alumnos]);

  // Método para cambiar el estado de asistencia de un alumno
  const cambiarEstado = (id, estado) => {
    setDatosAsistencia((prev) =>
      prev.map((dato) =>
        dato.id === id ? { ...dato, estado, observacion: "" } : dato
      )
    );
  };

  // Método para cambiar la observación de un alumno
  const cambiarObservacion = (id, observacion) => {
    setDatosAsistencia((prevDatos) =>
      prevDatos.map((dato) =>
        dato.id === id ? { ...dato, observacion } : dato
      )
    );
  };

  // Método para guardar los cambios realizados en la asistencia
  const guardar = () => {
    const registrosModificados = datosAsistencia.filter((dato) => {
      const original = alumnos.find((a) => a.id === dato.id);
      return (
        dato.estado !== original.estado ||
        dato.observacion !== original.observacion
      );
    });

    if (registrosModificados.length === 0) {
      alert("No se hicieron cambios.");
      return;
    }

    onGuardarAsistencia(registrosModificados);
  };

  // Variable para verificar si todos los alumnos tienen un estado asignado
  const todosAsignados = datosAsistencia.every((d) => d.estado !== "");

  return (
    <div className={Estilos.tablaAsistenciaContenedor}>
      {/* Barra de búsqueda */}
      <div className={Estilos.barraBusqueda}>
        <input
          type="text"
          placeholder="Buscar alumno..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={Estilos.campoBusqueda}
        />
      </div>

      {/* Tabla de asistencia */}
      <div className={Estilos.tablaContenedor}>
        <table className={Estilos.tablaAsistencia}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Primer Apellido</th>
              <th>Segundo Apellido</th>
              <th>Asistencia</th>
              <th>Observación</th>
            </tr>
          </thead>
          <tbody>
            {alumnosFiltrados.map((alumno) => {
              const datoAsistencia =
                datosAsistencia.find((d) => d.id === alumno.id) || {};
              const requiereObservacion =
                datoAsistencia.estado === "T" || datoAsistencia.estado === "A";

              return (
                <tr key={alumno.id}>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellido1}</td>
                  <td>{alumno.apellido2}</td>
                  <td className={Estilos.celdaBotones}>
                    <button
                      className={`${Estilos.botonAsistencia} ${
                        datoAsistencia.estado === "P" ? Estilos.puntual : ""
                      }`}
                      onClick={() => cambiarEstado(alumno.id, "P")}
                    >
                      P
                    </button>

                    <button
                      className={`${Estilos.botonAsistencia} ${
                        datoAsistencia.estado === "T" ? Estilos.tarde : ""
                      }`}
                      onClick={() => cambiarEstado(alumno.id, "T")}
                    >
                      T
                    </button>

                    <button
                      className={`${Estilos.botonAsistencia} ${
                        datoAsistencia.estado === "A" ? Estilos.ausente : ""
                      }`}
                      onClick={() => cambiarEstado(alumno.id, "A")}
                    >
                      A
                    </button>
                  </td>
                  <td>
                    {requiereObservacion && (
                      <input
                        type="text"
                        placeholder="Motivo..."
                        value={datoAsistencia.observacion || ""}
                        onChange={(e) =>
                          cambiarObservacion(alumno.id, e.target.value)
                        }
                        className={Estilos.campoObservacion}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Botón para guardar asistencia */}
      <div className={Estilos.contenedorBotonGuardar}>
        <button
          onClick={guardar}
          className={Estilos.botonGuardar}
          disabled={!todosAsignados}
        >
          Guardar Asistencia
        </button>
      </div>
    </div>
  );
};

export default TablaAsistencia;
