import axios from 'axios';

// Check if env variable is loading correctly
console.log("API URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');

        if (userInfo) {
            const { token } = JSON.parse(userInfo);

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;