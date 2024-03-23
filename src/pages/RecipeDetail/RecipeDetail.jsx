// 레시피 상세페이지
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css'
import user from '../../assets/icons/user.png'
import previous from '../../assets/icons/previous.svg';
import dot from '../../assets/icons/dot.png';
import pick from '../../assets/pick.svg'
import FiledPick from '../../assets/filedpick.png'
import arrow from '../../assets/icons/direct-arrow.png'

function RecipeDetail() {
    const navigate = useNavigate();
    const { recipeId } = useParams();
    
    const [recipe, setRecipe] = useState(null);
    const [picked, setPicked] = useState(false);

    const togglePicked = () => {
        setPicked(!picked);
    }

    useEffect(() => {
        const apiUrl = `http://20.39.188.154:8080/recipe/${recipeId}`;
        axios.get(apiUrl)
        .then(response => {
            const updatedData = {
                ...response.data,
                thumbnail_image: `http://20.39.188.154${response.data.thumbnail_image}`
            };
            setRecipe(updatedData);
            })
            .catch(error => {
                console.error('API 요청 에러:', error);
            });
    }, [recipeId]);

    if (!recipe) {
        return <div>Loading...</div>;
    }
    
    return (
      <div>
        <div className='recipe-header'>
            <img src={previous} alt='previous' onClick={() => navigate(-1)} />
            <img src={dot} alt='dot' />
        </div>

        <div className='body'>

            <img src={recipe.thumbnail_image} className='recipe-img'/>
            <div className='user'>
                <img src={user} />
                <div>{recipe.user.nickname}</div>
            </div>
            

            <div className='recipe-title'>
                <div > {recipe.title} </div>
                <div className='indicate'>
                  <img src={picked ? FiledPick : pick} onClick={togglePicked} style={{width: 20}} className="pick" />
                   {recipe.likes_count}
                </div>
            </div>
            
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginTop: '40px'}}> 재료 </div>
            <div className='grd-tag'>
                {recipe.ingredients.map( ingredient => (
                <>
                  <div key={ingredient.id}>
                    {ingredient.name} <img src={arrow} />
                </div> {ingredient.id}
                </>
                ))}
            </div>
            
            <div className='cook'> 요리 방법 </div>
            <>
              {recipe.processes.map( (process, index) => (
                <>
                  <img src={process.image} className='step-img'/>
                  <div className='cook-step'>
                    <div className='step1' > {index+1} </div>
                    <div className='step1-detail'> {process.contents}</div>
                </div>
                </>
                ))}
            </>

                
        </div>
            
            

            


    </div>
  )
}

export default RecipeDetail;