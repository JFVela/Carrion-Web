// Definición de las columnas de la tabla
export const COLUMNAS_TABLA = [
  { key: "id", label: "ID", sortable: true },
  { key: "nombre", label: "Nombre", sortable: true },
  { key: "apellido1", label: "Primer Apellido", sortable: true },
  { key: "apellido2", label: "Segundo Apellido", sortable: true },
  { key: "gradoSeccion", label: "Grado y Sección", sortable: true },
  { key: "sede", label: "Sede", sortable: true },
  { key: "acciones", label: "Acciones", sortable: false },
]

// Definición de los campos del formulario
export const CAMPOS_FORMULARIO = [
  { key: "nombre", label: "Nombre", type: "text", required: true },
  { key: "apellido1", label: "Primer Apellido", type: "text", required: true },
  { key: "apellido2", label: "Segundo Apellido", type: "text", required: true },
  { key: "gradoSeccion", label: "Grado y Sección", type: "text", required: true },
  { key: "sede", label: "Sede", type: "text", required: true },
]
