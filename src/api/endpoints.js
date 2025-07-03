const PUERTO = 9999
const BASE_URL = `http://localhost:${PUERTO}`;

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/Auth.php`,
  REGISTER: `${BASE_URL}/auth/register`,
  OBTENER_ALUMNOS: `${BASE_URL}/Admin/crudAlumnos/listarAlumnos.php`,
  CREAR_ALUMNO: `${BASE_URL}/Admin/crudAlumnos/agregarAlumnos.php`,
  EDITAR_ALUMNO: `${BASE_URL}/Admin/crudAlumnos/editarAlumnos.php?id=`,
  DESACTIVAR_ALUMNO: `${BASE_URL}/Admin/crudAlumnos/desactivarProfesor.php`,
  OBTENER_PROFESORES: `${BASE_URL}/Admin/crudProfes/listarProfesores.php`,
  CREAR_PROFESOR: `${BASE_URL}/Admin/crudProfes/agregarProfesor.php`,
  DESACTIVAR_PROFESOR: `${BASE_URL}/Admin/crudProfes/desactivarProfesor.php`,
  EDITAR_PROFESOR: `${BASE_URL}/Admin/crudProfes/editarProfesor.php?id=`,
  OBTENER_CURSOS: `${BASE_URL}/Admin/crudCursos/listarCursos.php`,
  CREAR_CURSO: `${BASE_URL}/Admin/crudCursos/agregarCurso.php`,
  EDITAR_CURSO: `${BASE_URL}/Admin/crudCursos/editarCurso.php?id=`,

  OBTENER_ASIGNACIONES: `${BASE_URL}/Admin/crudAsignaciones/nuevolistar.php`,
  CREAR_ASIGNACION: `${BASE_URL}/Admin/crudAsignaciones/nuevasignacion.php`,
  EDITAR_ASIGNACION: `${BASE_URL}/Admin/crudAsignaciones/editarAsignaciones.php`,

  OBTENER_SEDES: `${BASE_URL}/Admin/crudSedes/listarSedes.php`,
  OBTENER_NIVEL: `${BASE_URL}/Admin/crudNivel/listarNivel.php`,
  OBTENER_GRADOS: `${BASE_URL}/Admin/crudGrados/listarGrados.php`,
  OBTENER_GRADOSV2: `${BASE_URL}/obtenerGrados.php`,
  OBTENER_CURSOSV2: `${BASE_URL}/Admin/crudCursos/listarCursos.php`,


  //API PARA ASISTENCIA
  GRADOS_ASISTENCIA: `${BASE_URL}/Docente/crudAsistencia/obtenerGrados.php`,
  ALUMNOS_FILTRADOS: `${BASE_URL}/Docente/crudAsistencia/alumnosFiltrados.php`,
  GUARDAR_ASISTENCIA: `${BASE_URL}/Docente/crudAsistencia/guardarAsistencia.php`,
  MODIFICAR_ASISTENCIA: `${BASE_URL}/Docente/crudAsistencia/modificarAsistencia.php`,
  SEDES_ASISTENCIA: `${BASE_URL}/Docente/crudAsistencia/obtenerSedes.php`,

  //API PARA NOTIFICACIONES
  OBTENER_NOTIFICACIONES: `${BASE_URL}/Docente/crudNotificar/listarNotificacion.php`,
  ENVIAR_CORREO: `${BASE_URL}/Docente/PHPMailer/enviarCorreo.php`,
};