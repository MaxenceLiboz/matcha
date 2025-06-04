import axios from 'axios';

// Access the single base URL environment variable (Create React App syntax)
const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_PORT;

if (!HOST || ! PORT) {
	throw new Error("HOST and PORT env are not set");
}

const apiClient = axios.create({
	baseURL: `http://${HOST}:${PORT}/api/v1`,
	headers: {
		'Content-Type': 'application/json',
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('authToken');
		if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default apiClient;