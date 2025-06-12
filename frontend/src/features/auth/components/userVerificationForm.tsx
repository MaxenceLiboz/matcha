import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  UserVerificationFormValues,
  useUserVerification,
} from "../hooks/useUserVerification";
import TextFieldForm from "../../../components/TextFieldForm";

export const UserVerificationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formHookErrors },
  } = useForm<UserVerificationFormValues>({});

  const { mutation, onSubmit, serverError } = useUserVerification();

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
        Send email to verify account
      </Typography>

      <TextFieldForm
        name="Email"
        required={true}
        register={register}
        error={formHookErrors.email}
        serverError={serverError}
        isPending={mutation.isPending}
      />

      <TextFieldForm
        name="Username"
        required={true}
        register={register}
        error={formHookErrors.username}
        serverError={serverError}
        isPending={mutation.isPending}
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
        disabled={mutation.isPending}
        sx={{ mt: 2, py: 1.5 }}
      >
        {mutation.isPending ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Resend email verification"
        )}
      </Button>

      <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
        Want to login?{" "}
        <MuiLink component={RouterLink} to="/login">
          Login
        </MuiLink>
      </Typography>
    </Box>
  );
};
