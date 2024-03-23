import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Explore.css'
import search from '../../assets/icons/search.svg'
import Masonry from "https://cdn.skypack.dev/react-masonry-css@1.0.16";

const Explore = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handlePhotoClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  useEffect(() => {
    const apiUrl = `http://20.39.188.154:8080/recipe/list?keyword=${searchKeyword}&page=1`;

    axios.get(apiUrl)
      .then((response) => {
        const updatedData = response.data.map(item => ({
          ...item,
          thumbnail_image: `http://20.39.188.154${item.thumbnail_image}`
        }));
        setData(updatedData);
      })
      .catch((error) => {
        console.error('API 요청 에러:', error);
      });
  }, [searchKeyword]);

  return (
    <>
      <div className='explore-header'>
        <input type='text' value={searchKeyword} onChange={handleSearchInputChange} 
             placeholder="검색어를 입력하세요" className='search' />
        <img src={search} />
      </div>

      <Masonry
        breakpointCols={2}
        className="grid-container"
        columnClassName="column"
      >
        {data.map((item) => (
          <div key={item.id} className="grid-item">
            <img src={item.thumbnail_image} onClick={() => handlePhotoClick(item.id)} alt={`${item.title}`} />
          </div>
        ))}

      </Masonry>
    </>
  )
};

export default Explore;
