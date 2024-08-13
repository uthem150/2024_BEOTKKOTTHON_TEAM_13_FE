import React, { useState, useEffect } from 'react';
import './plus.css';

export const PlusGrd = ({ index, ingredient, setIngredient }) => {
    const [name, setName] = useState(ingredient?.name || '');
    const [amount, setAmount] = useState(ingredient?.amount || '');

    // Update ingredient whenever name or amount changes
    useEffect(() => {
        if (setIngredient) {
            setIngredient(index, { name, amount });
        }
    }, [name, amount, index, setIngredient]);

    return (
        <div className="plusGrd">
            <input
                type="text"
                placeholder="재료 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="양"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
        </div>
    );
};
