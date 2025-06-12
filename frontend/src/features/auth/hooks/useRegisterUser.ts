import { useMutation } from "@tanstack/react-query";
import { RegisterUserRequest, RegisterUserResponse } from "../types";
import { registerUser } from "../authAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export type RegisterFormValues = RegisterUserRequest;

export const useRegisterUser = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const mutation = useMutation<
    RegisterUserResponse,
    Error,
    RegisterUserRequest
  >({
    mutationFn: registerUser,
    onSuccess: (data: RegisterUserResponse) => {
      alert("Verify your email in order to validate your account before login");
      navigate("/login");
    },
    onError: (error: any) => {
      let errorMessage = "An unexpected error occurred during registration.";
      if (error.response && error.response.data) {
        const responseData = error.response.data;
        errorMessage = responseData.error.message;
      }
      setServerError(errorMessage);
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    setServerError(null);
    mutation.mutate(data);
  };

  return { mutation, onSubmit, serverError };
};
