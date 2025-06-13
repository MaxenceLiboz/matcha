import React from "react";
import Layout from "../layouts/MainLayout";
import { useCredentialRequest } from "../features/auth/hooks/useCredentialRequest";
import { userVerification } from "../features/auth/authAPI";
import { CredentialRequestForm } from "../features/auth/components/credentialRequestForm";

const ResendVerificationPage: React.FC = () => {
  const { mutation, onSubmit, serverError, serverSuccess } =
    useCredentialRequest({
      mutationFn: userVerification,
      successMessage:
        "If the account exists and is not verified, a new verification email has been sent.",
      navigateOnSuccess: "/login",
    });

  return (
    <Layout>
      <CredentialRequestForm
        title="Resend Verification Email"
        buttonText="Resend Email"
        onSubmit={onSubmit}
        isPending={mutation.isPending}
        serverError={serverError}
        serverSuccess={serverSuccess}
        loginPath="/login"
        loginText="Already verified?"
      />
    </Layout>
  );
};

export default ResendVerificationPage;