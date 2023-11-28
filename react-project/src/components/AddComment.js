import React, { useState } from 'react';

const AddComment = ({ onAddComment }) => {
    const [commentText, setCommentText] = useState('');

    const handleCommentTextChange = event => {
        setCommentText(event.target.value);
    };

    const handleAddComment = () => {
        if (commentText.trim() !== '') {
            const newComment = {
                id: new Date().getTime(),
                text: commentText,
                createdAt: new Date(), // Добавляем дату создания комментария
                likes: 0, // Инициализируем количество лайков
                editable: true // Устанавливаем возможность редактирования
            };
            onAddComment(newComment);
            setCommentText('');
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


