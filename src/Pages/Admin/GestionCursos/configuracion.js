// Definición de las columnas de la tabla de cursos
export const COLUMNAS_TABLA_CURSO = [
  { key: "nombre", label: "Nombre del Curso", sortable: true },
  { key: "nivel", label: "Nivel", sortable: true },

  { key: "acciones", label: "Acciones", sortable: false },
]

// Definición de los campos del formulario de cursos
export const CAMPOS_FORMULARIO_CURSO = [
  { key: "nombre", label: "Nombre del Curso", type: "text", required: true },
  { key: "nivel", label: "Nivel", type: "select", required: true }
]
