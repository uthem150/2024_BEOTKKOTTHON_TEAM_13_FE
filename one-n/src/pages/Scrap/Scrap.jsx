import React, { useState, useEffect } from 'react';
import './Scrap.css';
import { ReactComponent as Back } from '../../assets/back.svg'
import Modify from '../../assets/modify.png'
import axios from 'axios';
import SaleProduct from '../../components/SaleProduct/SaleProduct';
import Masonry from "https://cdn.skypack.dev/react-masonry-css@1.0.16";
import { useNavigate } from 'react-router-dom';

export default function Scrap() {
    const baseUrl = "https://n1.junyeong.dev/api";
    const [satisfaction, setSatisfaction] = useState(null);
    const [data, setData] = useState([]);
    const [nickname, setNickname] = useState(null);
    const [products, setProducts] = useState([]);
    const [pickProducts, setPickProducts] = useState([]);
    const [likedRecipe, setLikedRecipe] = useState([]);
    const [selectedWishlistButton, setSelectedWishlistButton] = useState(null);
    const [selectedOption, setSelectedOption] = useState('ingredients');
    const [signinData, setSigninData] = useState(null);

    useEffect(() => {
        const storedSigninData = sessionStorage.getItem('signinData');
        if (storedSigninData) {
            setSigninData(JSON.parse(storedSigninData));
        }
    }, []);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }

    const handleWishlistButtonClick = (action) => {
        console.log(signinData);
        setData([]);
        if (selectedWishlistButton !== action) {
            setSelectedWishlistButton(action); // 선택된 옵션이 현재 선택된 옵션과 다를 때만 상태 변경
        }
    };



    const handleButtonClick = (option) => {
        setSelectedWishlistButton(null);
        if (selectedOption !== option) {
            setSelectedOption(option); // 선택된 옵션이 현재 선택된 옵션과 다를 때만 상태 변경
        }
    };
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`${baseUrl}/user/info?session_id=${signinData}`);
                setNickname(response.data.nickname);
                setSatisfaction(response.data.user_rating * 100); // user_rating은 0.0에서 1.0 범위에 있으므로 100을 곱해서 퍼센트로 변환합니다.
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/user/posts?session_id=${signinData}`);

                console.log(response.params);
                console.log(response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserInfo();
        fetchData();
    }, []);

    const fetchLikedPosts = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/likes?session_id=${signinData}&type=post`);
            setPickProducts(response.data);
        } catch (error) {
            console.error('Error fetching liked posts:', error);
        }
    };

    // const fetchLikedRecipe = async () => {
    //     try {
    //         const response = await axios.get('${baseUrl}/user/likes?session_id=test_session_id&type=recipe');
    //         setLikedRecipe(response.data);
    //     } catch (error) {
    //         console.error('Error fetching liked posts:', error);
    //     }
    // };

    const fetchLikedRecipe = async () => {
        const apiUrl = `${baseUrl}/user/likes?session_id=${signinData}&type=recipe`

        axios.get(apiUrl)
            .then((response) => {
                const updatedData = response.data.map(item => ({
                    ...item,
                    thumbnail_image: `${baseUrl}${item.thumbnail_image}`
                }));
                console.log("요청감");
                console.log(updatedData);
                setLikedRecipe(updatedData);
            })
            .catch((error) => {
                console.error('API 요청 에러:', error);
            });
    };



    const fetchPostRecipe = async () => {
        const apiUrl = `${baseUrl}/user/recipes?session_id=test_${signinData}`;

        axios.get(apiUrl)
            .then((response) => {
                const updatedData = response.data.map(item => ({
                    ...item,
                    thumbnail_image:`${baseUrl}${item.thumbnail_image}`
                }));
                setData(updatedData);
            })
            .catch((error) => {
                console.error('API 요청 에러:', error);
            });
    };


    useEffect(() => {
        if (selectedWishlistButton === '글') {
            fetchLikedPosts();
        }
    }, [selectedWishlistButton]);

    useEffect(() => {
        if (selectedWishlistButton === '레시피') {
            fetchLikedRecipe();
        }
    }, [selectedWishlistButton]);

    useEffect(() => {
        if (selectedOption === 'recipe') {
            fetchPostRecipe();
        }
    }, [selectedOption]);





    return (
        <div className='scrap-container'>
            <div className='scrap-back-button-container'>
                <button className='scrap-back-button' onClick={handleBackClick}>
                    <Back />
                </button>
            </div>
            <div className='scrap-profile-container'>
                <div className='scrap-profile-image'>
                    <button className='profile-modify-button'>
                        <img src={Modify} alt='Modify'></img>
                    </button>

                </div>
                <div className='scrap-profile-name-satisfaction-container'>
                    <div className='scrap-profile-name'>{nickname}</div>

                    <div className="my-satisfaction-container" >
                        <span className='my-satisfaction-num'>
                            만족도 {satisfaction !== null ? satisfaction + "%" : "불러오는 중..."}
                        </span>
                        <div className='my-satisfaction-bar'>
                            <div className='my-satisfaction-fill' style={{ width: `${satisfaction}%` }}></div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='scrap-option-container'>
                <div className='option-buttons'>
                    <button className={selectedOption === 'ingredients' ? 'active' : ''} onClick={() => handleButtonClick('ingredients')}>재료</button>
                    <button className={selectedOption === 'recipe' ? 'active' : ''} onClick={() => handleButtonClick('recipe')}>레시피</button>
                    <button className={selectedOption === 'wishlist' ? 'active' : ''} onClick={() => handleButtonClick('wishlist')}>찜</button>
                </div>
            </div>
            <div className='scrap-scroll'>
                {selectedOption === 'ingredients' &&
                    products.map((product, index) => (
                        <SaleProduct key={index} product={product} />
                    ))
                }

                {selectedOption === 'recipe' &&
                    <Masonry
                        breakpointCols={2}
                        className="grid-container"
                        columnClassName="column"
                    >
                        {data.map((item) => (
                            <div key={item.id} className="grid-item">
                                <img src={item.thumbnail_image} alt={`Image ${item.title}`} />
                            </div>
                        ))}

                    </Masonry>
                }




                {selectedOption === 'wishlist' && (
                    <div className="wishlist-buttons">
                        <button className={selectedWishlistButton === '글' ? 'wishlist-button active' : 'wishlist-button'} onClick={() => handleWishlistButtonClick('글')}>글</button>
                        <button className={selectedWishlistButton === '레시피' ? 'wishlist-button active' : 'wishlist-button'} onClick={() => handleWishlistButtonClick('레시피')}>레시피</button>
                    </div>


                )}
                {selectedWishlistButton === '글' &&
                    pickProducts.map((product, index) => (
                        <SaleProduct key={index} product={product} />
                    ))
                }
                {selectedWishlistButton === '레시피' &&
                    <Masonry
                        breakpointCols={2}
                        className="grid-container"
                        columnClassName="column"
                    >
                        {likedRecipe.map((item) => (
                            <div key={item.id} className="grid-item">
                                <img src={item.thumbnail_image} alt={`Image ${item.title}`} />
                            </div>
                        ))}
                    </Masonry>
                }

            </div>
        </div>
    )
}
