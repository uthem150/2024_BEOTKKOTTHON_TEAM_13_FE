import React, { useState, useEffect } from 'react';
import SaleProduct from '../../components/SaleProduct/SaleProduct';
import { NavBar } from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import './MoreProductPage.css'
import { ReactComponent as Back } from '../../assets/back.svg'

function MoreProductPage() {
    const baseUrl = "https://n1.junyeong.dev/api";
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [products_r, setProducts_r] = useState([]);
    const [activeButton, setActiveButton] = useState('ingredient');

    const navigate = useNavigate();

    const handleButtonClick = (buttonType) => {
        setPage(1);
        setProducts([]);
        setProducts_r([]);
        setActiveButton(buttonType); // 클릭된 버튼에 대한 상태 업데이트
    };

    const handleBackClick = () => {
        navigate(-1); // Go back one step
    };


    const getFetchData_i = () => {
        const storedBcode = sessionStorage.getItem('myBcode');
        console.log("요청을 보냈습니다");
        const url = `${baseUrl}/post/list?type=ingd&bcode=${storedBcode}&keyword=&page=${page}`;
        console.log(url);
        fetch(url)
            .then((res) => res.json())
            .then((product) => {
                // 새로운 페이지 데이터를 새 배열에 저장
                const newProducts = [...products, ...product];
                setProducts(newProducts); // 기존 데이터와 새 데이터 합치기
            });
    };
    
    const getFetchData_r = () => {
        const storedBcode = sessionStorage.getItem('myBcode');
        console.log("요청을 보냈습니다2222");
        const url = `${baseUrl}/post/list?type=r_ingd&bcode=${storedBcode}&keyword=&page=${page}`;
        console.log(url);
        fetch(url)
            .then((res) => res.json())
            .then((product_r) => {
                // 새로운 페이지 데이터를 새 배열에 저장
                const newProducts_r = [...products_r, ...product_r];
                setProducts_r(newProducts_r); // 기존 데이터와 새 데이터 합치기
            });
    };

    useEffect(() => {
        
        if (activeButton === 'ingredient') {
            getFetchData_i();
        } else if (activeButton === 'recipe-ingredient') {
            getFetchData_r();
        }
    }, [activeButton, page]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const onScroll = () => {
        console.log("실행됨");
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        console.log(scrollTop);
        console.log(clientHeight);
        console.log(scrollHeight);

        if (scrollTop + clientHeight >= scrollHeight - 1) {
            console.log("스크롤 끝");
            setPage((prev) => prev + 1);
        }
    };



    return (
        <div className='more-mainpage-container'>
            <div className='more-main-body'>
                <div className='more-gredient'>
                    <div className='recipe-text'>
                        <div className='more-product-header'>
                            <button className='scrap-back-button' onClick={handleBackClick}>
                                <Back />
                            </button>
                            <div className='more-grd-name'> 공구 중인 식품 </div>
                        </div>
                    </div>
                    <div className='recipe-ingredient-buttons'>
                        {/* 버튼 클릭 시 activeButton 상태를 업데이트 */}
                        <button className={activeButton === 'ingredient' ? 'page-button-active' : ''} onClick={() => handleButtonClick('ingredient')}>식재료</button>
                        <button className={activeButton === 'recipe-ingredient' ? 'page-button-active' : ''} onClick={() => handleButtonClick('recipe-ingredient')}>레시피 재료</button>
                    </div>

                    <div className='sale-gredient-container'>
                        {activeButton === 'ingredient' && (
                            products.map((product, index) => (
                                <SaleProduct key={index} product={product} />
                            ))
                        )}

                        {activeButton === 'recipe-ingredient' && (
                            products_r.map((product, index) => (
                                <SaleProduct key={index} product={product} />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <NavBar />
        </div>
    );
}

export default MoreProductPage;
