import apiClient from "../../api/apiClient";
import { RegisterUserRequest, RegisterUserResponse, UserVerificationOrForgotPasswordRequest, VerificationOrForgotPasswordRequest } from "./types";

export const registerUser = async (userData: RegisterUserRequest): Promise<RegisterUserResponse> => {
	const { data } = await apiClient.post<RegisterUserResponse>('/user/', userData);
	return data;
};

export const userVerification = async (userData: VerificationOrForgotPasswordRequest): Promise<void> => {
	await apiClient.post<RegisterUserResponse>('/user/verification', userData);
};

export const verifyUser = async (userData: UserVerificationOrForgotPasswordRequest): Promise<void> => {
	await apiClient.post<RegisterUserResponse>('/user/verify-user', userData);
};