import React from 'react';
import { logout } from './authMockAPI';
import { authenticate } from './authMockAPI';

const Header = () => {
    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <h1>Заголовок</h1>
            <button onClick={handleLogout}>Выйти</button> {/* Добавляем кнопку "Выйти" */}
        </div>
    );
};

export default Header;