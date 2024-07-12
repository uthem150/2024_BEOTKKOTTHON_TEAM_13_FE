import React, { useState, useEffect } from 'react';
import './ReProductDetail.css';
import product from '../../assets/example.jpg'
import { ReactComponent as Back } from '../../assets/back.svg'
import { ReactComponent as Pick } from '../../assets/heart.svg'
import { ReactComponent as Location } from '../../assets/Location.svg'
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as Next } from '../../assets/Next.svg'
import FiledPick from '../../assets/filedproductpick.png'
import Mypick from '../../assets/productpick.png'

export default function ReProductDetail() {
    const baseUrl = "https://n1.junyeong.dev/api";
    const { productId } = useParams();
    const navigate = useNavigate();
    const [daysRemaining, setDaysRemaining] = useState(null);
    const [productData, setProductData] = useState({});
    const [picked, setPicked] = useState(false);

    const togglePicked = (event) => {
        event.stopPropagation(); // 이벤트 버블링 방지
        setPicked(!picked);
    };

    const fetchProductData = async (productId) => {
        // productId를 이용하여 백엔드에서 상품 데이터를 가져오는 비동기 함수
        try {
            const response = await fetch(`${baseUrl}/post/${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching product data:', error);
            return null;
        }
    };

    useEffect(() => {
        // productId를 이용하여 상품 데이터 가져오기
        fetchProductData(productId).then(data => {
            setProductData(data);
            calculateDaysRemaining(data.closed_at); // 남은 일 수 계산
        }).catch(error => {
            console.error("Error fetching product data:", error);
        });
    }, [productId]);

    const calculateDaysRemaining = (closingDate) => {
        const currentDate = new Date(); // 현재 날짜
        const closingDateTime = new Date(closingDate); // 마감 날짜
        const timeDifference = closingDateTime.getTime() - currentDate.getTime(); // 밀리초 단위로 남은 시간 계산
        const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // 일 단위로 변환 후 올림하여 남은 일 수 계산
        setDaysRemaining(remainingDays); // 남은 일 수 상태 업데이트
    };

    const handleBackClick = () => {
        navigate(-1);
    };


    const handleMapButton = () => {
        // check-location 페이지로 이동하고 productData의 위치 정보를 함께 전달
        navigate('/check-location', {
            state: {
                address: productData.location.address,
                latitude: productData.location.latitude,
                longitude: productData.location.longitude
            }
        });
    };


    return (

        <div className="product-detail-container">
            {Object.keys(productData).length > 0 && (
                <div>
                    <div className="product-header">
                        <button className='back-button' onClick={handleBackClick}>
                            <Back />
                        </button>
                        <div className='product-name'>
                            {productData.title}
                        </div>
                        <button className='detial-pick-button' onClick={togglePicked}>
                            <img src={picked ? FiledPick : Mypick} alt="Pick" />
                        </button>
                    </div>

                    <div className='image-container'>
                        <img src={productData.image} alt="Product" className="product-images" />
                    </div>

                    <div className='price-pick'>
                        <div className='price-date-container'>

                            <div className='testtest'>
                                {daysRemaining !== null && (
                                    <div className='alert-dute-date'>마감 {daysRemaining}일 전</div>
                                )}

                                <div className='product-price'>{productData.price} 원 </div>
                            </div>

                            <div className='create-date-container'>
                                {productData.created_at && (
                                    <div className='create-date'>
                                        {new Date(productData.created_at).toLocaleDateString('ko-KR')}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    <div className='product-seller'>
                        <span className='seller-name'>
                            {productData.nickname !== null ? productData.nickname : "판매자 정보 불러오는 중..."}
                        </span>
                        <span className='product-satisfaction'>
                            만족도
                            <span className='satisfaction-num'>
                                {productData.satisfaction !== null ? productData.satisfaction + "%" : "불러오는 중..."}
                            </span>
                            <div className='product-satisfaction-bar'>
                                <div className='satisfaction-fill' style={{ width: `${productData.satisfaction}%` }}></div>
                            </div>
                        </span>
                    </div>


                    <div className='reproduct-content'>
                        {productData.contents}
                    </div>
                    <div className='product-address'>
                        <p className='product-detail-address-text'>거래희망 장소</p>
                        <div className='address-name'>
                            {productData.location.address}
                            <button className='look-map' onClick={handleMapButton}>
                                <Next className='next-button-style' />
                            </button>
                        </div>
                    </div>
                    <div className='product-recipe-header'>
                        구매 식재료
                    </div>
                    <div className='reproduct-link'>
                        {productData.ingredients.map((item, index) => (
                            <div key={index} className='link-container'>
                                <div className='link-item'>
                                    <div className='ingredient-name'>{item.name}</div>
                                    <div className='link-url'>
                                        <a href={item.url} target='_blank' rel='noopener noreferrer'>{item.url}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='people-container'>
                        <div className='product-people-container'>
                            <div className='product-people'>
                                모집 인원 {productData.group_size}명
                            </div>
                            <div className='product-people'>
                                남은 인원 {productData.group_size - productData.cur_group_size}명
                            </div>
                        </div>
                        <div className='remaining-message'>
                            {productData.group_size - productData.cur_group_size}자리 밖에 안 남았어요!
                        </div>
                    </div>

                    <div className='product-sell-button-container'>
                        <button className='product-sell-button'>
                            구매하기
                        </button>
                    </div>


                </div>
            )}
        </div>

    );
}
