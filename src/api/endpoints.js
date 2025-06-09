const PUERTO=9999
const BASE_URL = `http://localhost:${PUERTO}`;

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/Auth.php`,
  REGISTER: `${BASE_URL}/auth/register`,
  GET_USERS: `${BASE_URL}/Admin/crudAlumnos/listarAlumnos.php`,
  CREAR_ALUMNO: `${BASE_URL}/Admin/crudAlumnos/agregarAlumnos.php`,
  PRODUCTS: `${BASE_URL}/products`,
};