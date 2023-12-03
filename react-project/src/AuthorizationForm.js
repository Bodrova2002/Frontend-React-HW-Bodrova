import React, { useState } from 'react';
import { authenticate } from './authMockAPI';

const AuthorizationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (authenticate(username, password)) {
            // Логика для успешной аутентификации
        } else {
            // Логика для обработки неудачной аутентификации
        }
    };

    return (
        <div>
            <h2>Форма авторизации</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Логин" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
};

export default AuthorizationForm;