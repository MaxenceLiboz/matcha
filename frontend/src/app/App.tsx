import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RegisterForm } from '../features/auth/components/registerForm';
import { LoginForm } from '../features/auth/components/loginForm';
import { UserVerificationForm } from '../features/auth/components/userVerificationForm';

function App() {
	return (
		<Routes>
			<Route path="/register" element={<RegisterForm />}/>
			<Route path="/login" element={<LoginForm />}/>
			<Route path="/send-email-verification" element={<UserVerificationForm />}/>
		</Routes>
	);
}

export default App;
