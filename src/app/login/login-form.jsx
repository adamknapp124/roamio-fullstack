'use client';

import { useState } from 'react';
import { login } from './actions';

export default function LoginForm() {
	const [username, setUsername] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login({ username });
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
		</div>
	);
}
