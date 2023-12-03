import React, { useReducer, useCallback, useEffect } from 'react';
import { authenticate } from '../authMockAPI'; // Imported only authenticate function

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

    const handleAuthAndAddCard = () => {
        const username = 'username1'; // Замените на логику получения имени пользователя из формы
        const password = 'password1'; // Замените на логику получения пароля из формы

        if (authenticate(username, password)) {
            console.log('Пользователь успешно авторизован');
            handleAddCard();
        } else {
            console.log('Неправильное имя пользователя или пароль');
        }
    };

    return (
        <div>
            <input type="text" value={state.cardTitle} onChange={handleTitleChange} />
            <button onClick={handleAddCard}>Добавить карточку</button>
            <button onClick={handleAuthAndAddCard}>Войти для добавления карточки</button>
        </div>
    );
};

export default AddCard;

