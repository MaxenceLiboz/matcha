import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterForm } from "../features/auth/components/registerForm";
import { PublicRoute } from "./routes/PublicRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ResendVerificationPage from "../pages/ResendVerificationPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ProfilePage from "../pages/ProfileDisplayPage";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<PublicRoute element={<RegisterForm />} />} />
      <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
      <Route path="/send-email-verification" element={<PublicRoute element={<ResendVerificationPage />} />} />
      <Route path="/forgot-password" element={<PublicRoute element={<ForgotPasswordPage />} />} />
      <Route path="/reset-password" element={<PublicRoute element={<ResetPasswordPage />} />} />

      <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
      <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
