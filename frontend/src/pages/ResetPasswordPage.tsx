import React from "react";
import Layout from "../layouts/MainLayout";
import { ResetPasswordForm } from "../features/auth/components/resetPasswordForm";

const ResetPasswordPage: React.FC = () => {
  return (
    <Layout>
      <ResetPasswordForm />
    </Layout>
  );
};

export default ResetPasswordPage;