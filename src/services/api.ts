import axios from 'axios';

const api = axios.create({
  baseURL: 'https://d3ujwk09smrk9z.cloudfront.net', // URL base de tu API
});

// Interceptor para agregar el token JWT automáticamente a cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // O de donde guardes tu token al iniciar sesión
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;