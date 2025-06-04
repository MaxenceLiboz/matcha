// ../components/LoginForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Alert, CircularProgress, Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LoginFormValues, useLoginUser } from '../hooks/useLoginUser';

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formHookErrors },
  } = useForm<LoginFormValues>({});

  const {serverError } = useLoginUser();
  const navigate = useNavigate(); // For the resend validation link

  const handleResendValidation = () => {
    // Navigate to a new page/component dedicated to resending the validation link
    // This page would typically just ask for the email again.
    navigate('/send-email-verification'); // Example path
  };


  return (
    <Box
      component="form"
    //   onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '400px',
        margin: '20px auto',
        padding: 3,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .03)',
        borderRadius: 2,
      }}
      noValidate
    >
      <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
        Login
      </Typography>

      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        {...register('email', { required: 'Email is required' })}
        error={!!formHookErrors.email || (!!serverError && (serverError.toLowerCase().includes('email') || serverError.toLowerCase().includes('credentials')))}
        helperText={formHookErrors.email?.message}
        // disabled={mutation.isPending}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        required
        {...register('password', { required: 'Password is required' })}
        error={!!formHookErrors.password || (!!serverError && (serverError.toLowerCase().includes('password') || serverError.toLowerCase().includes('credentials')))}
        helperText={formHookErrors.password?.message}
        // disabled={mutation.isPending}
      />

      {serverError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {serverError}
          {serverError.toLowerCase().includes("email is not verified") && (
            <>
              {' '}
              <MuiLink component={RouterLink} variant="body2" to="/send-email-verification" sx={{ml: 1}}>
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
        // disabled={mutation.isPending}
        sx={{ mt: 2, py: 1.5 }}
      >
        {/* {mutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Login'} */}
        Login
      </Button>

      <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
        Need to resend validation email?{' '}
        <MuiLink component={RouterLink} to="/send-email-verification">
          Click here
        </MuiLink>
      </Typography>
      <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
        Don't have an account?{' '}
        <MuiLink component={RouterLink} to="/register">
          Register
        </MuiLink>
      </Typography>
    </Box>
  );
};