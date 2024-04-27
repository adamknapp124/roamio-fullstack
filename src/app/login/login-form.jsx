'use client';

import { useState } from 'react';
import { login } from './actions';
import { logout } from './actions';

export default function LoginForm() {
	const [username, setUsername] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login({ username });
		} catch (error) {
			console.log('error', error);
		}
	};

	const handleLogout = async () => {
		alert('Logging out');
		await logout({ username });
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					id='username'
					name='Username'
					placeholder='Username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button type='submit'>Login</button>
			</form>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
}
