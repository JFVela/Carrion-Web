// Definición de las columnas de la tabla de docentes
export const COLUMNAS_TABLA_DOCENTE = [
  { key: "dni", label: "DNI", sortable: true },
  { key: "nombreDocente", label: "Nombre", sortable: true },
  { key: "apellidoPaterno", label: "Apellido Paterno", sortable: true },
  { key: "apellidoMaterno", label: "Apellido Materno", sortable: true },
  { key: "telefono", label: "Teléfono", sortable: true },
  { key: "correoElectronico", label: "Email", sortable: true },
  { key: "acciones", label: "Acciones", sortable: false },
];

// Definición de los campos del formulario de docentes
export const CAMPOS_FORMULARIO_DOCENTE = [
  { key: "dni", label: "DNI", type: "number", required: true },
  { key: "nombreDocente", label: "Nombre del Docente", type: "text", required: true },
  { key: "apellidoPaterno", label: "Apellido Paterno", type: "text", required: true },
  { key: "apellidoMaterno", label: "Apellido Materno", type: "text", required: true },
  { key: "telefono", label: "Teléfono", type: "number", required: true },
  { key: "direccion", label: "Dirección", type: "text", required: true },
  { key: "correoElectronico", label: "Correo Electrónico", type: "email", required: true },
];
