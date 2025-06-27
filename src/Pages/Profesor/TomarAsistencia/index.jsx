import { useEffect, useState } from "react";
import TablaAsistencia from "../../../Componentes/TablaAsistencia";
import Estilos from "./Estilos.module.css";

function TomarAsistencia() {
  // Array de alumnos con datos iniciales
  const [alumnos, setAlumnos] = useState([]);
  const [datosIniciales, setDatosIniciales] = useState(null);

  useEffect(() => {
    // 1) Cargo lista de alumnos
    fetch("http://localhost:9999/listarAlumnos.php")
      .then((res) => res.json())
      .then((data) => setAlumnos(data));
  }, []);

  useEffect(() => {
    if (alumnos.length === 0) return;
    fetch("http://localhost:9999/listarAsistenciaHoy.php")
      .then((res) => res.json())
      .then((data) => {
        const inicial = alumnos.map((al) => ({
          ...al,
          estado: data[al.id]?.estado || "",
          observacion: data[al.id]?.observacion || "",
        }));
        setDatosIniciales(inicial);
      });
  }, [alumnos]);

  // Estado para almacenar la asistencia
  const [asistencia, setAsistencia] = useState([]);

  // Estado para mostrar los resultados guardados
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Función para guardar la asistencia
  const guardarAsistencia = (asistenciaData) => {
    setAsistencia(asistenciaData);
    setMostrarResultados(true);

    const payload = asistenciaData.map(({ id, estado, observacion }) => ({
      alumno_id: id,
      estado: estado === "P" ? "PUNTUAL" : estado === "T" ? "TARDE" : "AUSENTE",
      observaciones: observacion || "",
    }));

    console.log("Payload a enviar:", payload);

    // 2) Envío al backend
    fetch("http://localhost:9999/guardarAsistencia.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          console.log("Respuesta JSON:", json);
          alert("✅ Asistencia guardada correctamente");
        } catch {
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
        {datosIniciales ? (
          <TablaAsistencia
            alumnos={datosIniciales}
            onGuardarAsistencia={guardarAsistencia}
          />
        ) : (
          <p>Cargando…</p>
        )}
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
