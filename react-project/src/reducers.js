import { ADD_CARD, ADD_COMMENT, DELETE_COMMENT, LIKE_COMMENT } from './actions';

const initialState = {
    cards: [],
    articles: [],
    comments: []
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                cards: [
                    ...state.cards,
                    {
                        cardId: Math.random().toString(),
                        title: action.payload.title,
                        creationDate: new Date(),
                        comments: [],
                        commentsCount: 0,
                        likes: 0
                    }
                ]
            };

        case ADD_COMMENT:
            return {
                ...state,
                articles: state.articles.map((article) =>
                    article.articleId === action.payload.articleId
                        ? {
                            ...article,
                            comments: [...article.comments, action.payload.newComment],
                            commentsCount: article.commentsCount + 1
                        }
                        : article
                ),
                comments: [...state.comments, action.payload.newComment]
            };

        case DELETE_COMMENT:
            return {
                ...state,
                articles: state.articles.map((article) =>
                    article.articleId === action.payload.articleId
                        ? {
                            ...article,
                            comments: article.comments.filter(
                                (comment) => comment.id !== action.payload.commentId
                            ),
                            commentsCount: article.comments.filter(
                                (comment) => comment.id !== action.payload.commentId
                            ).length
                        }
                        : article
                ),
                comments: state.comments.filter(
                    (comment) => comment.id !== action.payload.commentId
                )
            };

        case LIKE_COMMENT:
            return {
                ...state,
                articles: state.articles.map((article) =>
                    article.articleId === action.payload.articleId
                        ? {
                            ...article,
                            comments: article.comments.map((comment) =>
                                comment.id === action.payload.commentId
                                    ? { ...comment, likes: comment.likes + 1 }
                                    : comment
                            )
                        }
                        : article
                ),
                comments: state.comments.map((comment) =>
                    comment.id === action.payload.commentId
                        ? { ...comment, likes: comment.likes + 1 }
                        : comment
                )
            };

        default:
            return state;
    }
};