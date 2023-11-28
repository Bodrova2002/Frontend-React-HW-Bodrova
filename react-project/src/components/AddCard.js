import React, { useReducer, useCallback, useEffect } from 'react';

const initialState = { cardTitle: '' };

function reducer(state, action) {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, cardTitle: action.payload };
        case 'RESET_TITLE':
            return { ...state, cardTitle: '' };
        default:
            return state;
    }
}

const AddCard = ({ onAddCard }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleTitleChange = useCallback((event) => {
        dispatch({ type: 'SET_TITLE', payload: event.target.value });
    }, []);

    const handleAddCard = useCallback(() => {
        onAddCard(state.cardTitle);
        dispatch({ type: 'RESET_TITLE' });
    }, [onAddCard, state.cardTitle]);

    useEffect(() => {
        console.log('Пользователь посетил страницу для добавления карточки');
    }, []);

    return (
        <div>
            <input type="text" value={state.cardTitle} onChange={handleTitleChange} />
            <button onClick={handleAddCard}>Add Card</button>
        </div>
    );
};

export default AddCard;
