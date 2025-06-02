import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import { RegisterFormValues, useRegisterUser } from '../hooks/useRegisterUser';


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

			<TextField
				label="Email"
				type="email"
				fullWidth
				required
				{...register('email', { required: "Email is required" })} 
				error={!!formHookErrors.email || (!!serverError && serverError.toLowerCase().includes('email'))}
				helperText={formHookErrors.email?.message}
				disabled={mutation.isPending}
			/>

			<TextField
				label="Username"
				type="text"
				fullWidth
				required
				{...register('username', { required: "Username is required" })}
				error={!!formHookErrors.username || (!!serverError && serverError.toLowerCase().includes('username'))}
				helperText={formHookErrors.username?.message}
				disabled={mutation.isPending}
			/>

			<TextField
				label="First Name"
				type="text"
				fullWidth
				required
				{...register('first_name', { required: "First name is required" })}
				error={!!formHookErrors.first_name}
				helperText={formHookErrors.first_name?.message}
				disabled={mutation.isPending}
			/>

			<TextField
				label="Last Name"
				type="text"
				fullWidth
				required
				{...register('last_name', { required: "Last name is required" })}
				error={!!formHookErrors.last_name}
				helperText={formHookErrors.last_name?.message}
				disabled={mutation.isPending}
			/>

			<TextField
				label="Password"
				type="password"
				fullWidth
				required
				{...register('password', { required: "Password is required" })}
				error={!!formHookErrors.password || (!!serverError && serverError.toLowerCase().includes('password'))}
				helperText={formHookErrors.password?.message}
				disabled={mutation.isPending}
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
		</Box>
	);
};