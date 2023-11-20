export const ADD_CARD = 'ADD_CARD';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const LIKE_COMMENT = 'LIKE_COMMENT';

export const addCard = (cardTitle) => ({
    type: ADD_CARD,
    payload: { title: cardTitle }
});

export const addComment = (articleId, newComment) => ({
    type: ADD_COMMENT,
    payload: { articleId, newComment }
});

export const deleteComment = (articleId, commentId) => ({
    type: DELETE_COMMENT,
    payload: { articleId, commentId }
});

export const likeComment = (articleId, commentId) => ({
    type: LIKE_COMMENT,
    payload: { articleId, commentId }
});