import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { User } from "../../types/User";
import { AuthContextType } from "../../types/AuthContext";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      console.log("Loading user from local storage", isLoading);
      const storedUser = localStorage.getItem("user");
      const access_token = localStorage.getItem("authToken");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true && !!access_token);
        setIsLoading(false);
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    } catch (error) {
      localStorage.removeItem("user");
    }
  }, []);

  const login = useCallback(
    (userData: User, access_token: string, refresh_token: string) => {
      console.log("Login successful");
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      window.location.reload();
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
