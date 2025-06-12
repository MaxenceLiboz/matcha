import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { User } from '../../types/User';
import { AuthContextType } from '../../types/AuthContext';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		try {
			const storedUser = localStorage.getItem('user');
			if (storedUser) {
				setUser(JSON.parse(storedUser));
			}
		} catch (error) {
			localStorage.removeItem('user');
		}
		setIsLoading(false);
	}, []);

	const login = useCallback((userData: User, access_token: string, refresh_token: string) => {
		console.log("Login successful");
		setUser(userData);
		localStorage.setItem('user', JSON.stringify(userData));
		localStorage.setItem('authToken', access_token);
		localStorage.setItem('refreshToken', refresh_token);
	}, []);

	const logout = useCallback(() => {
		setUser(null);
		localStorage.removeItem('user');
		localStorage.removeItem('authToken');
	}, []);

	
	useEffect(() => {
		const access_token = localStorage.getItem('authToken');
		setIsAuthenticated(!!user && !!access_token);
	}, [user])

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};
