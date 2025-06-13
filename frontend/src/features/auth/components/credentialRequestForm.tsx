import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import TextFieldForm from "../../../components/TextFieldForm";
import { VerificationOrForgotPasswordRequest } from "../types";

interface CredentialRequestFormProps {
  title: string;
  buttonText: string;
  onSubmit: SubmitHandler<VerificationOrForgotPasswordRequest>;
  isPending: boolean;
  serverError: string | null;
  serverSuccess: string | null;
  loginPath: string;
  loginText: string;
}

export const CredentialRequestForm: React.FC<CredentialRequestFormProps> = ({
  title,
  buttonText,
  onSubmit,
  isPending,
  serverError,
  serverSuccess,
  loginPath,
  loginText,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formHookErrors },
  } = useForm<VerificationOrForgotPasswordRequest>({});

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
        {title}
      </Typography>

      {serverSuccess && <Alert severity="success">{serverSuccess}</Alert>}

      <TextFieldForm
        name="Email"
        required={true}
        register={register}
        error={formHookErrors.email}
        serverError={serverError}
        isPending={isPending}
      />

      <TextFieldForm
        name="Username"
        required={true}
        register={register}
        error={formHookErrors.username}
        serverError={serverError}
        isPending={isPending}
      />

      {serverError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {serverError}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isPending}
        sx={{ mt: 2, py: 1.5 }}
      >
        {isPending ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          buttonText
        )}
      </Button>

      <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
        {loginText}{" "}
        <MuiLink component={RouterLink} to={loginPath}>
          Login
        </MuiLink>
      </Typography>
    </Box>
  );
};