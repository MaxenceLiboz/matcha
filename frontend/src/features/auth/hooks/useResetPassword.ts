import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResetPasswordRequest } from "../types";
import { resetPassword } from "../authAPI";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("j");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setServerError("No reset token found. Please request a new link.");
    }
  }, [location]);

  const mutation = useMutation<void, Error, Omit<ResetPasswordRequest, "confirmPassword">>({
    mutationFn: resetPassword,
    onSuccess: () => {
      setServerError(null);
      setServerSuccess("Your password has been reset successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (error: any) => {
      setServerSuccess(null);
      let errorMessage = "An unexpected error occurred.";
      if (error.response?.data?.error?.message) {
        errorMessage = error.response.data.error.message;
      }
      setServerError(errorMessage);
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordRequest> = (data) => {
    if (!token) {
      setServerError("Reset token is missing.");
      return;
    }
    setServerError(null);
    setServerSuccess(null);
    // Exclude confirmPassword from the submitted data
    const { confirmPassword, ...submissionData } = data;
    mutation.mutate({ ...submissionData, token });
  };

  return { mutation, onSubmit, serverError, serverSuccess, hasToken: !!token };
};
