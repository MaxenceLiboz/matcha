import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginUserRequest, LoginUserResponse, UserVerificationOrForgotPasswordRequest } from "../types";
import { useMutation } from "@tanstack/react-query";
import { loginUser, verifyUser } from "../authAPI";
import { SubmitHandler } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../../hooks/useAuth";
import { User } from "../../../types/User";

export type LoginFormValues = LoginUserRequest;

export const useLoginUser = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  // Get the token to validate the user.
  const location = useLocation();
  const { login, isAuthenticated, isLoading } = useAuth()

  const mutation = useMutation<LoginUserResponse, Error, LoginUserRequest>({
		mutationFn: loginUser,
		onSuccess: (data: LoginUserResponse) => {
      const user = jwtDecode<User>(data.access_token);
      login(user, data.access_token, data.refresh_token)
		},
		onError: (error: any) => {
      console.log(error)
			let errorMessage = 'An unexpected error occurred during the login process.';
			if (error.response && error.response.data) {
				const responseData = error.response.data;
				errorMessage = responseData.error.message
			}
			setServerError(errorMessage);
		},
	});

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    setServerError(null);
    mutation.mutate(data);
  };

  return {mutation, onSubmit, serverError };
};