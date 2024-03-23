import React, { useState, useEffect } from 'react';
import './ReProductDetail.css';
import product from '../../assets/example.jpg'
import { ReactComponent as Back } from '../../assets/back.svg'
import { ReactComponent as Pick } from '../../assets/heart.svg'
import { ReactComponent as Location } from '../../assets/Location.svg'

export default function ReProductDetail() {
    const [productData, setProductData] = useState({
        name: "샐러드 재료 공동구매 합니다",
        price: null,
        seller: null,
        satisfaction: null,
        address: "서울특별시 서초구 반포대로 12",
        link: [
            { name: "치커리", url: "https://coupang.com/qwejisdjf" },
            { name: "양상추", url: "https://coupang.com/qwejisdjf" },
            { name: "토마토", url: "https://coupang.com/qwejisdjf" }
        ],
        content: "샐러드 재료 공동구매 합니다.\n치커리, 양상추, 토마토 구매할 예정이고 총 해서\n가격 5000원 입니다. 직거래 강남역에서 가능합니다.",
        total: '2',
        remain: '1',
    });

    // useEffect(() => {
    //     // 백엔드에서 데이터 가져오는 비동기 함수
    //     fetchProductData().then(data => {
    //         setProductData({
    //             ...productData,
    //             price: data.price,
    //             seller: data.seller,
    //             satisfaction: data.satisfaction
    //         });
    //     }).catch(error => {
    //         console.error("Error fetching product data:", error);
    //     });
    // }, [productData]);

    // const fetchProductData = async () => {
    //     // 백엔드에서 상품 데이터를 가져오는 비동기 함수
    //     // 예를 들어, API 호출이나 데이터베이스 쿼리 등을 수행합니다.
    //     // 이 예시에서는 가짜 데이터를 반환합니다.
    //     return {
    //         name: "강원도 햇감자 1kg 10개",
    //         price: 4000,
    //         seller: "윤준영",
    //         satisfaction: 89,
    //         link: "https://coupang.com/qwejisdjf"
    //     };
    // };

    const handleBackClick = () => {
        // 이전 페이지로 돌아가는 기능 추가
    };

    const handlePickClick = () => {
        // 이전 페이지로 돌아가는 기능 추가
    };

    return (
        <div className="product-detail-container">

            <div className="product-header">
                <button className='back-button' onClick={handleBackClick}>
                    <Back />
                </button>
                <div className='product-name'>
                    {productData.name}
                </div>
            </div>

            <div className='image-container'>
                <img src={product} alt="Product" className="product-images" />
            </div>

            <div className='price-pick'>
                <span className='product-price'>
                    {productData.price !== null ? productData.price.toLocaleString() + "원" : "가격 불러오는 중..."}
                </span>
                <button className='back-button' onClick={handlePickClick}>
                    <Pick />
                </button>
            </div>

            <div className='product-seller'>
                <span className='seller-name'>
                    {productData.seller !== null ? productData.seller : "판매자 정보 불러오는 중..."}
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
            <div className='product-address'>
                <span className='address-name'>
                    {productData.address}
                </span>
                <span className='address-distance'>
                    <Location />
                    <span className='product-distance'>
                        216m
                    </span>
                </span>
            </div>

            <div className='reproduct-content'>
                {productData.content}
            </div>
            <div className='product-recipe-header'>
                구매 식재료
            </div>
            <div className='reproduct-link'>
                {productData.link.map((item, index) => (
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
                        모집 인원 {productData.total}명
                    </div>
                    <div className='product-people'>
                        남은 인원 {productData.remain}명
                    </div>
                </div>
            </div>
            <div className='divider'> </div>

            <div className='product-recipe'>
                <div className='product-recipe-header'>
                    만들 수 있는 레시피
                </div>
                <div className='recipe-card-container'>
                    <div className='recipe-card'>
                        <span className='recipe-card-name'>
                            까르보나라
                        </span>
                    </div>
                    <div className='recipe-card'>
                        <span className='recipe-card-name'>
                            까르보나라
                        </span>
                    </div>
                    <div className='recipe-card'>
                        <span className='recipe-card-name'>
                            까르보나라
                        </span>
                    </div>
                    <div className='recipe-card'>
                        <span className='recipe-card-name'>
                            까르보나라
                        </span>
                    </div>
                </div>
                <div className='product-sell-button-container'>
                    <button className='product-sell-button'>
                        구매하기
                    </button>
                </div>
            </div>
        </div>

    );
}
