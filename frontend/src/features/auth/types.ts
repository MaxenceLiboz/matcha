import { User } from "../../types/User";

export interface RegisterUserRequest {
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	password: string;
}
	
export type RegisterUserResponse = User;