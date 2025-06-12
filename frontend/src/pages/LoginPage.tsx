import React from "react";
import Layout from "../layouts/MainLayout";
import { LoginForm } from "../features/auth/components/loginForm";

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
