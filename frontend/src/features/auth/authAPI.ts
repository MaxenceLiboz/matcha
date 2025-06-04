import apiClient from "../../api/apiClient";
import { RegisterUserRequest, RegisterUserResponse } from "./types";

export const registerUser = async (userData: RegisterUserRequest): Promise<RegisterUserResponse> => {
	const { data } = await apiClient.post<RegisterUserResponse>('/user/', userData);
	return data;
};