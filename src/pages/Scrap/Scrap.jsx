import React, { useState, useEffect } from 'react';
import './Scrap.css';
import { ReactComponent as Back } from '../../assets/back.svg'
import Modify from '../../assets/modify.png'
import axios from 'axios';
import SaleProduct from '../../components/SaleProduct/SaleProduct';

export default function Scrap() {
    const [satisfaction, setSatisfaction] = useState(44);
    const [products, setProducts] = useState([]);
    const [selectedWishlistButton, setSelectedWishlistButton] = useState('글');
    const handleBackClick = () => {

    }

    const handleWishlistButtonClick = (action) => {
        if (selectedWishlistButton !== action) {
            setSelectedWishlistButton(action); // 선택된 옵션이 현재 선택된 옵션과 다를 때만 상태 변경
        }
    };

    const [selectedOption, setSelectedOption] = useState('ingredients');

    const handleButtonClick = (option) => {
        if (selectedOption !== option) {
            setSelectedOption(option); // 선택된 옵션이 현재 선택된 옵션과 다를 때만 상태 변경
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Axios를 사용하여 데이터 요청
                const response = await axios.get('http://20.39.188.154:8080/post/list', {
                    params: {
                        type: 'all',
                        bcode: '',
                        keyword: '',
                        page: 1
                    }
                });
                // 받아온 데이터를 LocationData로 설정
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // fetchData 함수 호출
        fetchData();
    }, []);

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
                    <div className='scrap-profile-name'>최강벚꽃톤부셔버려</div>

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
            {selectedOption === 'ingredients' &&
                products.map((product, index) => (
                    <SaleProduct key={index} product={product} />
                ))
            }
            {selectedOption === 'wishlist' && (
                <div className="wishlist-buttons">
                    <button className={selectedWishlistButton === '글' ? 'wishlist-button active' : 'wishlist-button'} onClick={() => handleWishlistButtonClick('글')}>글</button>
                    <button className={selectedWishlistButton === '레시피' ? 'wishlist-button active' : 'wishlist-button'} onClick={() => handleWishlistButtonClick('레시피')}>레시피</button>
                </div>
                

            )}
            {selectedWishlistButton === '글' &&
                products.map((product, index) => (
                    <SaleProduct key={index} product={product} />
                ))
            }
        </div>
    )
}
