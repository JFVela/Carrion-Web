// Definición de las columnas de la tabla de gestión académica
export const COLUMNAS_TABLA_GESTION = [
  { key: "id", label: "ID", sortable: true },
  { key: "docenteNombre", label: "Profesor", sortable: true },
  { key: "cursoNombre", label: "Curso", sortable: true },
  { key: "sedeNombre", label: "Sede", sortable: true },
  { key: "salonNombre", label: "Salón", sortable: true },
  { key: "acciones", label: "Acciones", sortable: false },
]

// Definición de los campos del formulario de gestión académica
export const CAMPOS_FORMULARIO_GESTION = [
  { key: "docenteId", label: "Profesor", type: "select", required: true },
  { key: "cursoNivel", label: "Curso", type: "select", required: true },
  { key: "sede", label: "Sede", type: "select", required: true },
  { key: "salon", label: "Salón", type: "select", required: true },
]

// Mapeo de valores a nombres para sedes
export const SEDES = {
  carrion: "Carrión",
  bitanico: "Bitánico",
}

// Mapeo de valores a nombres para cursos
export const CURSOS_NIVEL = {
  aritmetica_primaria: "Aritmética Primaria",
  aritmetica_secundaria: "Aritmética Secundaria",
  algebra_secundaria: "Álgebra Secundaria",
  geometria_primaria: "Geometría Primaria",
  geometria_secundaria: "Geometría Secundaria",
}

// Mapeo de valores a nombres para salones
export const SALONES = {
  "1ro_secundaria": "1ro Secundaria",
  "2do_secundaria": "2do Secundaria",
  "3ro_secundaria": "3ro Secundaria",
  "4to_secundaria": "4to Secundaria",
  "5to_secundaria": "5to Secundaria",
}
