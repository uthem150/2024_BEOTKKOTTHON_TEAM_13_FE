// 간단 레시피 컴포넌트
import React, { useState } from "react"
import { Link } from 'react-router-dom';
import '../../pages/MainPage/MainPage.css'

import pick from '../../assets/pick.svg'
import FiledPick from '../../assets/filedpick.png'

export const ThrumnailRecipe = ({data}) => {

  const [picked, setPicked] = useState(false);

  const togglePicked = () => {
    setPicked(!picked);
};

    return(
        <div className='recipePhoto'>
            {data.map((item) => (
              <div key={item.id}>
                <Link to={`/recipe/${item.id}`}>
                  <img src={item.thumbnail_image} className='rec-photo' />
                </Link>
                <div className='photoStyle'  >
                  <img src={picked ? FiledPick : pick} onClick={togglePicked} className="pick" />
                  <span> {item.title} </span> 
              </div>
              </div>
            ))}
        </div>
    )
}