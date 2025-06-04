import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginUserRequest } from "../types";

export type LoginFormValues = LoginUserRequest;

export const useLoginUser = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Get the token to validate the user.
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setToken(queryParams.get('j'));
  }, [location]);

  useEffect(() => {
    if (token) {
      console.log(token);
    }
  }, [token])
  

  return { serverError };
};