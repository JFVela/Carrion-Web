// Definición de las columnas de la tabla de docentes
export const COLUMNAS_TABLA_DOCENTE = [
  { key: "dni", label: "DNI", sortable: true },
  { key: "nombre", label: "Nombre", sortable: true },
  { key: "apellido1", label: "Apellido Paterno", sortable: true },
  { key: "apellido2", label: "Apellido Materno", sortable: true },
  { key: "telefono", label: "Teléfono", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "acciones", label: "Acciones", sortable: false },
];

// Definición de los campos del formulario de docentes
export const CAMPOS_FORMULARIO_DOCENTE = [
  { key: "dni", label: "DNI", type: "number", required: true },
  { key: "nombre", label: "Nombre del Docente", type: "text", required: true },
  { key: "apellido1", label: "Apellido Paterno", type: "text", required: true },
  { key: "apellido2", label: "Apellido Materno", type: "text", required: true },
  { key: "telefono", label: "Teléfono", type: "number", required: true },
  { key: "direccion", label: "Dirección", type: "text", required: true },
  { key: "email", label: "Correo Electrónico", type: "email", required: true },
];
