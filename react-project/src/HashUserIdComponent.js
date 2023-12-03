import React, { useEffect } from 'react';

const HashUserIdComponent = ({ userId }) => {
    const hashAndSaveUserId = async () => {
        try {
            const data = new TextEncoder().encode(userId);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashedUserId = hashArray.map(byte => ('00' + byte.toString(16)).slice(-2)).join('');

            localStorage.setItem('hashedUserId', hashedUserId);
            console.log('Хэшированный идентификатор пользователя сохранен в локальное хранилище:', hashedUserId);
        } catch (error) {
            console.error("Произошла ошибка при хэшировании идентификатора пользователя:", error);
        }
    };

    useEffect(() => {
        hashAndSaveUserId();
    }, [userId]);

    return null;
};

export default HashUserIdComponent;
