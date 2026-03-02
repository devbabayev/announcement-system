import axios from 'axios';

// 1. Əsas linki (Base URL) bir dəfə burda təyin edirik
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Komanda yoldaşınızın hazırladığı backend portu
});

// 2. Sorğu (Request) İnterceptor-u: Hər API sorğusu getməmişdən əvvəl işə düşür
api.interceptors.request.use(
  (config) => {
    // Brauzerin yaddaşından istifadəçinin token-ini götürürük
    const token = localStorage.getItem('token');
    
    // Əgər token varsa, onu gizli şəkildə "Header"-ə yapışdırırıq ki, Backend bizi tanısın
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