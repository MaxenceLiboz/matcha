import React from "react";
import Layout from "../layouts/MainLayout";
import { useCredentialRequest } from "../features/auth/hooks/useCredentialRequest";
import { forgotPassword } from "../features/auth/authAPI";
import { CredentialRequestForm } from "../features/auth/components/credentialRequestForm";

const ForgotPasswordPage: React.FC = () => {
  const { mutation, onSubmit, serverError, serverSuccess } =
    useCredentialRequest({
      mutationFn: forgotPassword,
      successMessage:
        "If an account exists with that email and username, a password reset link has been sent.",
      navigateOnSuccess: "/login",
    });

  return (
    <Layout>
      <CredentialRequestForm
        title="Forgot Password"
        buttonText="Send Reset Link"
        onSubmit={onSubmit}
        isPending={mutation.isPending}
        serverError={serverError}
        serverSuccess={serverSuccess}
        loginPath="/login"
        loginText="Remembered your password?"
      />
    </Layout>
  );
};

export default ForgotPasswordPage;