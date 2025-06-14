import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, Alert, CircularProgress, Link as MuiLink } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LoginFormValues, useVerifyUser } from "../hooks/useVerifyUser";
import { useLoginUser } from "../hooks/useLoginUser";
import TextFieldForm from "../../../components/TextFieldForm";

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formHookErrors },
  } = useForm<LoginFormValues>({});
  const { serverSuccess, verificationError } = useVerifyUser();
  const { mutation, onSubmit, serverError } = useLoginUser();

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
        Login
      </Typography>

      {serverSuccess && (
        <Alert severity="success" sx={{ mt: 1 }}>
          {serverSuccess}
        </Alert>
      )}

      {verificationError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {verificationError}
        </Alert>
      )}

      <TextFieldForm
        name="Email"
        required={true}
        register={register}
        error={formHookErrors.email}
        serverError={serverError}
        isPending={mutation.isPending}
      />

      <TextFieldForm
        name="Password"
        required={true}
        register={register}
        error={formHookErrors.password}
        serverError={serverError}
        isPending={mutation.isPending}
      />

      {serverError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {serverError}
          {serverError.toLowerCase().includes("email is not verified") && (
            <>
              {" "}
              <MuiLink component={RouterLink} variant="body2" to="/send-email-verification" sx={{ ml: 1 }}>
                Resend verification email?
              </MuiLink>
            </>
          )}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={mutation.isPending}
        sx={{ mt: 2, py: 1.5 }}
      >
        {mutation.isPending ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="body2">
          <MuiLink component={RouterLink} to="/forgot-password">
            Forgot Password
          </MuiLink>
        </Typography>
        <Typography variant="body2">
          <MuiLink component={RouterLink} to="/send-email-verification">
            Resend verification
          </MuiLink>
        </Typography>
      </Box>
      <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
        Don't have an account?{" "}
        <MuiLink component={RouterLink} to="/register">
          Register
        </MuiLink>
      </Typography>
    </Box>
  );
};
