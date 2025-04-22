import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookIcon from "@mui/icons-material/Book";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { Encabezado } from "../estilos";

const CartitasResumen = () => {
  const data = [
    { titulo: "Asistencia", valor: "92%", icono: <CalendarMonthIcon /> },
    { titulo: "Cursos Inscritos", valor: "12 Cursos", icono: <BookIcon /> },
    { titulo: "Clases Grabadas", valor: "24 clases", icono: <VideoCameraFrontIcon /> },
  ];

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      {data.map((item, index) => (
        <div className="col" key={index}>
          <div className="card h-100">
            <div className="card-body">
              <Encabezado>
                <h5 className="card-title">{item.titulo}</h5>
                {item.icono}
              </Encabezado>
              <p className="card-text">{item.valor}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartitasResumen;
