import { User } from "./User";

export interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (userData: User, access_token: string, refresh_token: string) => void;
	logout: () => void;
}
