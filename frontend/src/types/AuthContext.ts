import { User } from "./User";

export interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean; // To handle initial loading of user from storage
	login: (userData: User, access_token: string, refresh_token: string) => void; // token is optional
	logout: () => void;
}
