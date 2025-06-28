// 📌 Columnas para la tabla de notificaciones
export const COLUMNAS_TABLA_NOTIFICACIONES = [
  { key: "id", label: "ID", sortable: true },
  { key: "alumno", label: "Alumno", sortable: true },
  { key: "emisor_tipo", label: "Tipo Emisor", sortable: true },
  { key: "emisor", label: "Emisor", sortable: true },
  { key: "mensaje", label: "Mensaje", sortable: false },
  { key: "hora_notificacion", label: "Hora", sortable: true },
  { key: "acciones", label: "Acciones", sortable: false },
];

// 📌 Campos del formulario de notificación
export const CAMPOS_FORMULARIO_NOTIFICACION = [
  { key: "alumno_id", label: "Alumno", type: "select", required: true },
  { key: "emisor_tipo", label: "Tipo de Emisor", type: "select", required: true },
  { key: "emisor_id", label: "Emisor", type: "select", required: true },
  { key: "mensaje", label: "Mensaje", type: "textarea", required: true },
];

// 📌 Tipos de emisor disponibles
export const TIPOS_EMISOR = {
  PROFESOR: "Profesor",
  ADMIN: "Administrador",
};
