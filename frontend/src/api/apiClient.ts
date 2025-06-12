import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/User";

// Access the single base URL environment variable (Create React App syntax)
const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_PORT;

if (!HOST || !PORT) {
  throw new Error("HOST and PORT env are not set");
}

const apiClient = axios.create({
  baseURL: `http://${HOST}:${PORT}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add refresh token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
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
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.config.url !== "/refresh-token" &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      let refresh_token = localStorage.getItem("refreshToken");
      if (refresh_token && refresh_token !== "") {
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${refresh_token}`;
        await axios
          .create({
            baseURL: `http://${HOST}:${PORT}/api/v1`,
			headers: {
				"Authorization": `Bearer ${refresh_token}`
			}
          })
          .get("/auth/refresh-token")
          .then((response) => {
			const user = jwtDecode<User>(response.data.access_token);
			localStorage.setItem("authToken", response.data.access_token);
			localStorage.setItem("refreshToken", response.data.refresh_token);
			localStorage.setItem("user", JSON.stringify(user));
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${response.data.access_token}`;
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.access_token}`;
          })
          .catch((err) => {
            if (err.response.status === 401) {
              localStorage.removeItem("authToken");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("user");
              window.location.reload();
            }
          });
        return apiClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
