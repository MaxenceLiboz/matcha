// ../hooks/useLoginUser.ts

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { VerificationOrForgotPasswordRequest } from "../types";
import { useMutation } from "@tanstack/react-query";
import { userVerification } from "../authAPI";
import { SubmitHandler } from "react-hook-form";

export type UserVerificationFormValues = VerificationOrForgotPasswordRequest;

export const useUserVerification = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const mutation = useMutation<
    void,
    Error,
    VerificationOrForgotPasswordRequest
  >({
    mutationFn: userVerification,
    onSuccess: (data: void) => {
      alert("Email to verify yourself have been sent");
      navigate("/login");
    },
    onError: (error: any) => {
      let errorMessage = "An unexpected error occurred during registration.";
      if (error.response && error.response.data) {
        const responseData = error.response.data;
        errorMessage = responseData.error.message;
      }
      console.log(errorMessage);
      setServerError(errorMessage);
    },
  });

  const onSubmit: SubmitHandler<UserVerificationFormValues> = (data) => {
    setServerError(null);
    mutation.mutate(data);
  };

  return { mutation, onSubmit, serverError };
};
