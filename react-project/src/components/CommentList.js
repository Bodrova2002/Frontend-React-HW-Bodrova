import React, { useState, useEffect } from 'react';

const CommentList = ({ article, comments, onDeleteComment }) => {
    const [sortedComments, setSortedComments] = useState([]);

    useEffect(() => {
        setSortedComments(comments); // Обновляем sortedComments при изменении comments
    }, [comments]);

    const sortCommentsByDate = () => {
        const sorted = [...comments].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setSortedComments(sorted);
    };

    const sortCommentsByLikes = () => {
        const sorted = [...comments].sort((a, b) => b.likes - a.likes);
        setSortedComments(sorted);
    };

    const handleLikeComment = (commentId) => {
        const updatedComments = comments.map(comment => {
            if (comment.id === commentId) {
                return { ...comment, likes: comment.likes + 1 };
            }
            return comment;
        });
        setSortedComments([...updatedComments].sort((a, b) => b.likes - a.likes));
    };

    const handleDeleteComment = (commentId) => {
        onDeleteComment(article.articleId, commentId);
    };

    return (
        <div>
            <button onClick={sortCommentsByDate}>Сортировать по дате</button>
            <button onClick={sortCommentsByLikes}>Сортировать по лайкам</button>
            {article.showComments && (
                sortedComments.length > 0 ?
                    sortedComments.map((comment) => (
                        <div key={comment.id}>
                            <p>{comment.text}</p>
                            <p>Дата создания: {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Дата не определена'}</p>
                            <p>Лайки: {comment.likes}</p>
                            <button onClick={() => handleLikeComment(comment.id)}>Лайк</button>
                            <button onClick={() => handleDeleteComment(comment.id)}>Удалить комментарий</button>
                        </div>
                    ))
                    :
                    comments.map((comment) => (
                            <div key={comment.id}>
                                <p>{comment.text}</p>
                                <p>Дата создания: {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Дата не определена'}</p>
                                <p>Лайки: {comment.likes}</p>
                                <button onClick={() => handleLikeComment(comment.id)}>Лайк</button>
                                <button onClick={() => handleDeleteComment(comment.id)}>Удалить комментарий</button>
                            </div>
                        )
                    )
            )}
        </div>
    );
};
export default CommentList;
