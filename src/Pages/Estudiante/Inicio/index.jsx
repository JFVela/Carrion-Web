import CartitasResumen from "../../../Componentes/CartitasResumen";
import { Contenido } from "../../../Componentes/estilos";
import GraficoBarra from "../../../Componentes/GraficoBarra";
import MensajeProfesor from "../../../Componentes/MensajeProfesor";
import "bootstrap/dist/css/bootstrap.min.css";

const Inicio = () => {
  const notasBarra = [16, 14, 18, 12, 15, 19, 17, 13, 16, 11, 20, 10];
  const cursosBarra = [
    "Mate",
    "Comu",
    "Hist",
    "Geo",
    "Física",
    "Química",
    "Bio",
    "Arte",
    "Música",
    "Inglés",
    "EP",
    "Relig",
  ];

  const nombreProfe = [
    "Profesor Juan Figueroa",
    "Profesora Carmen",
    "Profesor David",
    "Profesora Carmen",
    "Profesora Carmen",
    "Profesora Carmen",
  ];

  const mensajeProfe = [
    "Tarea para Vectores II",
    "Tarea Raz. Verbal: pagina 15-25",
    "Tarea en la pagina 15 al 22",
    "Tarea Raz. Verbal: pagina 15-25",
    "Tarea Raz. Verbal: pagina 15-25",
    "Tarea Raz. Verbal: pagina 15-25",
  ];

  return (
    <>
      <CartitasResumen />
      <Contenido>
        <GraficoBarra notas={notasBarra} cursos={cursosBarra} />
        <MensajeProfesor nombres={nombreProfe} mensajes={mensajeProfe} />
      </Contenido>
    </>
  );
};

export default Inicio;
