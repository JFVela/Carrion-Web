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
    // Guarda resultados localmente
    setAsistencia(asistenciaData);
    setMostrarResultados(true);

    // 1) Preparo el payload con las claves que espera el PHP
    const payload = asistenciaData.map(({ id, estado, observacion }) => ({
      alumno_id: id,
      // convierto tu código corto a la palabra completa (opcional, según tu lógica PHP)
      estado: estado === "P" ? "PUNTUAL" : estado === "T" ? "TARDE" : "AUSENTE",
      observaciones: observacion || "",
    }));

    console.log("Payload a enviar:", payload);

    // 2) Envío al backend
    fetch("http://localhost:3000/guardarAsistencia.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          // intento parsear JSON
          const json = JSON.parse(text);
          console.log("Respuesta JSON:", json);
          alert("✅ Asistencia guardada correctamente");
        } catch {
          // si falla, muestro el texto crudo (HTML o error de PHP)
          console.error("Respuesta no-JSON del servidor:", text);
          alert("❌ Error del servidor: revisa la consola.");
        }
      })
      .catch((error) => {
        console.error("Error de conexión:", error);
        alert("❌ No fue posible conectar con el servidor.");
      });
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
                    {registro.id} {registro.nombre} {registro.apellido1}{" "}
                    {registro.apellido2}:
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
