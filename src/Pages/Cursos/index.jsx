import ResumenAlumno from "../../Componentes/ResumenAlumno";
import CursoAccordion from "../../Componentes/CursoAccordion.jsx";
import { Box } from "@mui/material";
import { NombreProfesor, NotasTexto, NotasDivider } from "../../Componentes/estilos";

// Datos de prueba
const studentData = {
  institution: "I.E.P Daniel Alcides Carrión",
  academicYear: "2025",
  studentName: "Carlos Rodríguez Mendoza",
  studentId: "ID: SM-2023-0042",
  photoUrl: "https://randomuser.me/api/portraits/men/42.jpg",
  grade: "5to Año de Secundaria",
  section: "Sección A",
  meritRank: 3,
  totalStudents: 45,
  averageGrade: 15,
};

const cursos = [
  "Matemáticas",
  "Historia",
  "Lengua",
  "Ciencias",
  "Arte",
  "Música",
  "Educación Física",
];

const profesores = [
  "Prof. García",
  "Prof. López",
  "Prof. Suárez",
  "Prof. Martínez",
  "Prof. Vega",
  "Prof. Rivera",
  "Prof. López",
];

const notas = [
  [10, 16, 18, 17, 10, 20],
  [15.2, 14, 15, 16, 17, 19],
  [13.5, 12, 14, 15, 16, 18],
  [16.1, 15, 16, 17, 17, 18],
  [14.0, 13, 15, 14, 15, 16],
  [19.0, 18, 17, 19, 20, 19],
  [12.5, 13, 12, 11, 14, 15],
];

const getNotaColorClass = (nota) => {
  if (nota < 13) return "bajo";
  if (nota < 16) return "medio";
  return "alto";
};

function Cursos() {
  return (
    <>
      <Box sx={{ p: 3 }}>
        <ResumenAlumno student={studentData} />
      </Box>

      <Box sx={{ maxWidth: 700, margin: "0 auto", padding: 0 }}>
        {cursos.map((curso, index) => (
          <CursoAccordion key={index} curso={curso} index={index}>
            <NombreProfesor>{profesores[index]}</NombreProfesor>
            {notas[index].map((nota, i) => (
              <div key={i}>
                <NotasTexto>
                  Bimestre {i + 1}:{" "}
                  <span className={getNotaColorClass(nota)}>{nota}</span>
                </NotasTexto>
                <NotasDivider />
              </div>
            ))}
          </CursoAccordion>
        ))}
      </Box>
    </>
  );
}

export default Cursos;
