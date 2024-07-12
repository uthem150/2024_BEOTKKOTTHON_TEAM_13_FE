import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Explore.css'
import search from '../../assets/icons/search.svg'
import Masonry from "https://cdn.skypack.dev/react-masonry-css@1.0.16";

const Explore = () => {

  const baseUrl="https://n1.junyeong.dev/api";
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [signinData, setSigninData] = useState(null);

  useEffect(() => {
    const storedSigninData = sessionStorage.getItem('signinData');
    if (storedSigninData) {
      setSigninData(JSON.parse(storedSigninData));
    }
  }, []);

  const handlePhotoClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  useEffect(() => {

    // API 엔드포인트 URL 설정
   
    const apiUrl = `${baseUrl}/recipe/list?keyword=${searchKeyword}&page=1`;

    axios.get(apiUrl)
      .then((response) => {
        const updatedData = response.data.map(item => ({
          ...item,
          thumbnail_image: `${baseUrl}${item.thumbnail_image}`
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
