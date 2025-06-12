import { useContext } from "react";
import { AuthContext } from "../app/providers/authProvider";
import { AuthContextType } from "../types/AuthContext";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
