import React, { useState } from 'react';

const AddCard = ({ onAddCard }) => {
    const [cardTitle, setCardTitle] = useState('');

    const handleTitleChange = (event) => {
        setCardTitle(event.target.value);
    };

    const handleAddCard = () => {
        onAddCard(cardTitle);
        setCardTitle('');
    };

    return (
        <div>
            <input type="text" value={cardTitle} onChange={handleTitleChange} />
            <button onClick={handleAddCard}>Add Card</button>
        </div>
    );
};

export default AddCard;