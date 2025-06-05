// src/app/providers/AuthProvider.tsx
import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { User } from '../../types/User';
import { AuthContextType } from '../../types/AuthContext';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

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

	const login = useCallback((userData: User, token: string) => {
		setUser(userData);
		setToken(token);
		localStorage.setItem('user', JSON.stringify(userData));
		localStorage.setItem('authToken', token);
	}, []);

	const logout = useCallback(() => {
		setUser(null);
		localStorage.removeItem('user');
		localStorage.removeItem('authToken');
	}, []);

	const isAuthenticated = !!user && !!token;

	useEffect(() => {
		if (!isAuthenticated) {
			localStorage.removeItem('user');
			localStorage.removeItem('authToken');
		}
	}, [isAuthenticated])

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};
