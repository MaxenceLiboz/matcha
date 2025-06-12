import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LoginUserRequest,
  UserVerificationOrForgotPasswordRequest,
} from "../types";
import { useMutation } from "@tanstack/react-query";
import { verifyUser } from "../authAPI";

export type LoginFormValues = LoginUserRequest;

export const useVerifyUser = () => {
  const navigate = useNavigate();
  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  );
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Get the token to validate the user.
  const location = useLocation();

  const mutation = useMutation<
    void,
    Error,
    UserVerificationOrForgotPasswordRequest
  >({
    mutationFn: verifyUser,
    onSuccess: (data: void) => {
      setServerSuccess("You have been verified, you can login now");
    },
    onError: (error: any) => {
      let errorMessage =
        "An unexpected error occurred during the verification process.";
      if (error.response && error.response.data) {
        const responseData = error.response.data;
        errorMessage = responseData.error.message;
      }
      setVerificationError(errorMessage);
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setToken(queryParams.get("j"));
  }, [location]);

  useEffect(() => {
    if (token) {
      console.log(token);
      mutation.mutate({ token });
      navigate("/login");
    }
  }, [token]);

  return { serverSuccess, verificationError };
};
