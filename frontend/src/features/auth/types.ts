import { User } from "../../types/User";

export interface RegisterUserRequest {
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	password: string;
}
	
export type RegisterUserResponse = User;

export interface LoginUserRequest {
	email: string;
	password: string;
}

export interface LoginUserResponse {
	access_token: string;
	refresh_token: string;
}

export interface VerificationOrForgotPasswordRequest {
	email: string;
	username: string;
}

export interface UserVerificationOrForgotPasswordRequest {
    token: string;
}