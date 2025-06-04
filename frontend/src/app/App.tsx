import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RegisterForm } from '../features/auth/components/registerUser';

function App() {
	return (
		<Routes>
			<Route path="/register" element={<RegisterForm />}>
			</Route>
		</Routes>
	);
}

export default App;
