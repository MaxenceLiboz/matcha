import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Alert, CircularProgress, Link as MuiLink } from '@mui/material';
import { RegisterFormValues, useRegisterUser } from '../hooks/useRegisterUser';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import TextFieldForm from '../../../components/TextFieldForm';

export const RegisterForm: React.FC = () => {

	const {register, handleSubmit, formState: { errors: formHookErrors },} = useForm<RegisterFormValues>({});

	const {mutation, onSubmit, serverError} = useRegisterUser();

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				maxWidth: '400px',
				margin: '20px auto',
				padding: 3,
				boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .03)', // Softer shadow
				borderRadius: 2,
			}}
			noValidate
		>
			<Typography variant="h5" component="h1" textAlign="center" gutterBottom>
				Create Account
			</Typography>

			<TextFieldForm 
				name='Email'
				required={true}
				register={register}
				error={formHookErrors.email}
				serverError={serverError}
				isPending={mutation.isPending}
			/>

			<TextFieldForm
				name='Username'
				required={true}
				register={register}
				error={formHookErrors.username}
				serverError={serverError}
				isPending={mutation.isPending}
			/>

			<TextFieldForm
				name='First name'
				required={true}
				register={register}
				error={formHookErrors.first_name}
				serverError={serverError}
				isPending={mutation.isPending}
			/>

			<TextFieldForm
				name='Last name'
				required={true}
				register={register}
				error={formHookErrors.last_name}
				serverError={serverError}
				isPending={mutation.isPending}
			/>

			<TextFieldForm
				name='Password'
				required={true}
				register={register}
				error={formHookErrors.password}
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
				{mutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Register'}
			</Button>

			<Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
				Do you have an account?{' '}
				<MuiLink component={RouterLink} to="/login">
					Login
				</MuiLink>
			</Typography>
		</Box>
	);
};