import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, Alert, CircularProgress } from "@mui/material";
import { useResetPassword } from "../hooks/useResetPassword";
import { ResetPasswordRequest } from "../types";

export const ResetPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formHookErrors },
  } = useForm<ResetPasswordRequest>();

  const { mutation, onSubmit, serverError, serverSuccess, hasToken } = useResetPassword();

  const password = watch("password");

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "400px",
        margin: "20px auto",
        padding: 3,
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .03)",
        borderRadius: 2,
      }}
      noValidate
    >
      <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
        Reset Your Password
      </Typography>

      {serverSuccess && <Alert severity="success">{serverSuccess}</Alert>}
      {serverError && <Alert severity="error">{serverError}</Alert>}

      <TextField
        label="New Password"
        type="password"
        fullWidth
        required
        {...register("password", {
          required: "New password is required",
          minLength: { value: 8, message: "Password must be at least 8 characters" },
        })}
        error={!!formHookErrors.password}
        helperText={formHookErrors.password?.message}
        disabled={mutation.isPending || !hasToken}
      />

      <TextField
        label="Confirm New Password"
        type="password"
        fullWidth
        required
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
        error={!!formHookErrors.confirmPassword}
        helperText={formHookErrors.confirmPassword?.message}
        disabled={mutation.isPending || !hasToken}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={mutation.isPending || !hasToken}
        sx={{ mt: 2, py: 1.5 }}
      >
        {mutation.isPending ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
      </Button>
    </Box>
  );
};