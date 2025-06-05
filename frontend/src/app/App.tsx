import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RegisterForm } from '../features/auth/components/registerForm';
import { LoginForm } from '../features/auth/components/loginForm';
import { UserVerificationForm } from '../features/auth/components/userVerificationForm';
import { PublicRoute } from './routes/PublicRoute';
import { ProtectedRoute } from './routes/ProtectedRoute';

function App() {
	return (
		<Routes>
			<Route path="/register" element={<PublicRoute element={<RegisterForm />} />}/>
			<Route path="/login" element={<PublicRoute element={<LoginForm />} />}/>
			<Route path="/send-email-verification" element={<PublicRoute element={<UserVerificationForm />} />}/>

			<Route path="/" element={<ProtectedRoute element={<div>HOMEPAGE</div>} />}/>

			<Route path="*" element={<Navigate to="/login"/>}/>
		</Routes>
	);
}

export default App;
