import { useEffect, useState } from "react";
import TablaAsistencia from "../../../Componentes/TablaAsistencia";
import Estilos from "./Estilos.module.css";

function TomarAsistencia() {
  // Array de alumnos con datos iniciales
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/listarAlumnos.php")
      .then((res) => res.json())
      .then((data) => setAlumnos(data));
  }, []);

  // Estado para almacenar la asistencia
  const [asistencia, setAsistencia] = useState([]);

  // Estado para mostrar los resultados guardados
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Función para guardar la asistencia
  const guardarAsistencia = (asistenciaData) => {
    setAsistencia(asistenciaData);
    setMostrarResultados(true);
  };

  return (
    <div className={Estilos.contenedor}>
      <header className={Estilos.encabezado}>
        <h1>Sistema de Asistencia de Alumnos</h1>
      </header>

      <main className={Estilos.contenidoprincipal}>
        <TablaAsistencia
          alumnos={alumnos}
          onGuardarAsistencia={guardarAsistencia}
        />

        {mostrarResultados && (
          <div className={Estilos.resultados}>
            <h2>Registro de Asistencia</h2>
            <ul>
              {asistencia.map((registro, index) => (
                <li key={index}>
                  <strong>
                    {registro.nombre} {registro.apellido1} {registro.apellido2}:
                  </strong>
                  {registro.estado === "P" && " Puntual"}
                  {registro.estado === "T" && " Tardanza"}
                  {registro.estado === "A" && " Ausente"}
                  {(registro.estado === "T" || registro.estado === "A") &&
                    registro.observacion &&
                    ` - Motivo: ${registro.observacion}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default TomarAsistencia;
