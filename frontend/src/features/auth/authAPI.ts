import apiClient from "../../api/apiClient";
import { LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse, UserVerificationOrForgotPasswordRequest, VerificationOrForgotPasswordRequest } from "./types";

export const registerUser = async (userData: RegisterUserRequest): Promise<RegisterUserResponse> => {
	const { data } = await apiClient.post<RegisterUserResponse>('/auth/register', userData);
	return data;
};

export const userVerification = async (userData: VerificationOrForgotPasswordRequest): Promise<void> => {
	await apiClient.post<RegisterUserResponse>('/auth/send-verification', userData);
};

export const verifyUser = async (userData: UserVerificationOrForgotPasswordRequest): Promise<void> => {
	await apiClient.post<RegisterUserResponse>('/auth/verify-user', userData);
};

export const loginUser = async (userData: LoginUserRequest): Promise<LoginUserResponse> => {
	const { data } = await apiClient.post<LoginUserResponse>('/auth/login', userData);
	return data;
};