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

// Add refresh token to headers
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


// If token is not valid and we have a refresh token, try to refresh it
apiClient.interceptors.response.use((response) => {
	return response
  }, async function (error) {
	const originalRequest = error.config;
	if (error.config.url != "/refresh-token" && error.response.status === 401 && !originalRequest._retry) {
	  originalRequest._retry = true;
	  let refresh_token = localStorage.getItem('refresh_token');
	  if (refresh_token && refresh_token != "") {
		apiClient.defaults.headers.common['Authorization'] = `Bearer ${refresh_token}`;
		await apiClient.post('/refresh-token').then((response) => {
		  localStorage.setItem('authToken', response.data.accessToken);
		  localStorage.setItem('refreshToken', response.data.refreshToken);
		  originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
		  apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
		}).catch((err) => {
		  console.log(err.response.status);
		  refresh_token = null;
		});
		return apiClient(originalRequest);
	  }
	}
	return Promise.reject(error);
  });
  
  

export default apiClient;