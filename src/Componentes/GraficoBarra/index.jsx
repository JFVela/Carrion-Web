import { BarChart } from "@mui/x-charts";
import { Bordes, Titulo } from "../estilos";

const GraficoBarra = ({ notas, cursos }) => {
  return (
    <Bordes>
      <Titulo>Promedio Académico</Titulo>
      <BarChart
        series={[{ data: notas }]}
        height={290}
        xAxis={[{ data: cursos, scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </Bordes>
  );
};

export default GraficoBarra;
