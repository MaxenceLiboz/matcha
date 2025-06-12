import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { VerificationOrForgotPasswordRequest } from "../types";

interface UseCredentialRequestProps {
  mutationFn: (data: VerificationOrForgotPasswordRequest) => Promise<void>;
  successMessage: string;
  navigateOnSuccess?: string;
}

export const useCredentialRequest = ({
  mutationFn,
  successMessage,
  navigateOnSuccess,
}: UseCredentialRequestProps) => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const mutation = useMutation<void, Error, VerificationOrForgotPasswordRequest>({
    mutationFn,
    onSuccess: () => {
      setServerError(null);
      setServerSuccess(successMessage);
      if (navigateOnSuccess) {
        setTimeout(() => {
          navigate(navigateOnSuccess);
        }, 3000); // Navigate after 3 seconds to allow user to read the message
      }
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

  const onSubmit: SubmitHandler<VerificationOrForgotPasswordRequest> = (data) => {
    setServerError(null);
    setServerSuccess(null);
    mutation.mutate(data);
  };

  return { mutation, onSubmit, serverError, serverSuccess };
};