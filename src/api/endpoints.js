const PUERTO=9999
const BASE_URL = `http://localhost:${PUERTO}`;

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/Auth.php`,
  REGISTER: `${BASE_URL}/auth/register`,
  GET_USER: `${BASE_URL}/user/profile`,
  UPDATE_USER: `${BASE_URL}/user/update`,
  PRODUCTS: `${BASE_URL}/products`,
};