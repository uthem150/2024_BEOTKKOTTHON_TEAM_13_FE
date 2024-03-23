import InputForm from '../../components/InputForm/InputForm';
import { useContext, useState } from 'react';
import { MyContext } from '../MyContextProvider/MyContextProvider';
import './ProductPostForm.css'



export default function RecipeIngredientsPost() {
    const { postContent, setPostContent } = useContext(MyContext);
    const [ingredients, setIngredients] = useState([{ id: 1, name: '', url: '' }]); // 초기 재료 상태

    const handleContentInputChange = (e) => {
        setPostContent(e.target.value);
    }

    const handleAddIngredient = () => {
        const newIngredientId = ingredients.length + 1;
        setIngredients([...ingredients, { id: newIngredientId, name: '', url: '' }]);
    };

    const handleIngredientNameChange = (e, id) => {
        const updatedIngredients = ingredients.map(ingredient => {
            if (ingredient.id === id) {
                return { ...ingredient, name: e.target.value };
            }
            return ingredient;
        });
        setIngredients(updatedIngredients);
    };

    const handleIngredientUrlChange = (e, id) => {
        const updatedIngredients = ingredients.map(ingredient => {
            if (ingredient.id === id) {
                return { ...ingredient, url: e.target.value };
            }
            return ingredient;
        });
        setIngredients(updatedIngredients);
    };

    return (
        <div>
            <input
                className='product-post-content'
                placeholder='상품에 대한 설명을 넣어주세요.'
                onChange={handleContentInputChange}
                value={postContent}
            />
            <p className='product-post-ingredient-text'>재료</p>
            {ingredients.map(ingredient => (
                <div key={ingredient.id} className='product-post-ingredient-container'>
                    
                    <div className='product-post-ingredient-num-container'>
                        <div className='product-post-ingredient-num'>{ingredient.id}</div>
                        <input
                            className='product-post-ingredient-name'
                            placeholder='재료명을 입력해주세요.'
                            value={ingredient.name}
                            onChange={e => handleIngredientNameChange(e, ingredient.id)}
                        />
                    </div>
                    <input
                        className='product-post-ingredient-url'
                        placeholder='URL 링크를 입력해주세요.'
                        value={ingredient.url}
                        onChange={e => handleIngredientUrlChange(e, ingredient.id)}
                    />
                </div>
            ))}
            <div className='ingredient-add-button-container'>
                <button className='ingredient-add-button' onClick={handleAddIngredient}>재료 추가하기</button>
            </div>

            {/* 가격, 인원수 등의 입력 폼 */}
            <InputForm title='가격' placeholder='가격을 입력해주세요.(인당 가격)' />
            <InputForm title='인원수' placeholder='모임에 참여할 인원 수를 정해주세요.' />
        </div>
    );
}