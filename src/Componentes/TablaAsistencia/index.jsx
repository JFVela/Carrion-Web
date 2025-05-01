import { useState, useEffect } from "react";
import Estilos from "./Estilos.module.css";

const TablaAsistencia = ({ alumnos, onGuardarAsistencia }) => {
  const [datosAsistencia, setDatosAsistencia] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);

  useEffect(() => {
    const asistenciaInicial = alumnos.map((alumno) => ({
      ...alumno,
      estado: "",
      observacion: "",
    }));
    setDatosAsistencia(asistenciaInicial);
    setAlumnosFiltrados(alumnos);
  }, [alumnos]);

  useEffect(() => {
    const resultadosFiltrados = alumnos.filter(
      (alumno) =>
        alumno.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        alumno.apellido1.toLowerCase().includes(busqueda.toLowerCase()) ||
        alumno.apellido2.toLowerCase().includes(busqueda.toLowerCase())
    );
    setAlumnosFiltrados(resultadosFiltrados);
  }, [busqueda, alumnos]);

  const cambiarEstado = (id, estado) => {
    setDatosAsistencia((prev) =>
      prev.map((dato) =>
        dato.id === id ? { ...dato, estado, observacion: "" } : dato
      )
    );
  };

  const cambiarObservacion = (id, observacion) => {
    setDatosAsistencia((prevDatos) =>
      prevDatos.map((dato) =>
        dato.id === id ? { ...dato, observacion } : dato
      )
    );
  };

  const guardar = () => {
    const registrosValidos = datosAsistencia.filter((dato) => dato.estado);
    onGuardarAsistencia(registrosValidos);
  };

  const todosAsignados = datosAsistencia.every((d) => d.estado !== "");

  return (
    <div className={Estilos.tablaAsistenciaContenedor}>
      <div className={Estilos.barraBusqueda}>
        <input
          type="text"
          placeholder="Buscar alumno..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={Estilos.campoBusqueda}
        />
      </div>

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
