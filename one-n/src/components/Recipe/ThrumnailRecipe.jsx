// 간단 레시피 컴포넌트
import React, { useState } from "react"
import { Link } from 'react-router-dom';
import '../../pages/MainPage/MainPage.css'

export const ThrumnailRecipe = ({data}) => {

    return(
        <div className='recipePhoto'>
            {data.map((item) => (
              <div key={item.id}>
                <Link to={`/recipe/${item.id}?becode=`}>
                  <img src={item.thumbnail_image} className='rec-photo' />
                </Link>
                <div className='photoStyle'  >
                  <span> {item.title} </span> 
              </div>
              </div>
            ))}
        </div>
    )
}