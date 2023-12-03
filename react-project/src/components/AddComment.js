import React, { useState } from 'react';
import { authenticate } from '../authMockAPI'; // Импортируем функцию аутентификации из authMockAPI

const AddComment = ({ onAddComment }) => {
    const [commentText, setCommentText] = useState('');

    const handleCommentTextChange = event => {
        setCommentText(event.target.value);
    };

    const handleAddComment = () => {
        const username = 'username1'; // Получите имя пользователя, например, из формы
        const password = 'password1'; // Получите пароль пользователя, например, из формы

        // Проверяем аутентификацию пользователя
        if (authenticate(username, password)) {
            console.log('Пользователь успешно авторизован');
            if (commentText.trim() !== '') {
                const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
                const newComment = {
                    id: new Date().getTime(),
                    text: commentText,
                    createdAt: new Date(), // Добавляем дату создания комментария
                    author: authenticatedUser.name, // Получаем имя пользователя из данных авторизованного пользователя
                    likes: 0, // Инициализируем количество лайков
                    editable: true // Устанавливаем возможность редактирования
                };
                onAddComment(newComment);
                setCommentText('');
            }
        } else {
            console.log('Ошибка аутентификации');
            // Обработка ошибки аутентификации
        }
    };

    return (
        <div>
            <textarea value={commentText} onChange={handleCommentTextChange}></textarea>
            <button onClick={handleAddComment}>Добавить комментарий</button>
        </div>
    );
};

export default AddComment;


