import React from "react";
import './SaleProduct.css';
import profile from '../../assets/Profile.png'
import Mypick from '../../assets/pick.svg'
import FiledPick from '../../assets/filedpick.png'
import { useState} from "react";
import { useNavigate } from "react-router-dom";

export default function SaleProduct({ product}) {
    const navigate = useNavigate();

    const [picked, setPicked] = useState(false);

    const togglePicked = () => {
        setPicked(!picked);
    };

    const handleProductClick = () => {
        console.log("handleProductClick 함수가 실행되었습니다."); // 확인을 위한 로그 추가
        const typeToPathMap = {
            'ingd': 'product-detail',
            'r_ingd': 'reproduct-detail'
        };
    
        const path = typeToPathMap[product.type];
        if (path) {
            console.log("dfdf");
            navigate(`/${path}/${product.id}`);
        } else {
            console.log("문제가 뭐야");
            console.error("Unknown product type:", product.type);
            // Handle error, e.g., show an alert to the user
        }
    };
    

    return (
        <div className="sale-product">
            <div className="product-details">
                <img src={product.image} alt="Product" className="product-image" />
                <div className="sale-product-details">
                    <button className="sale-product-pick-button" onClick={togglePicked}>
                        <img src={picked ? FiledPick : Mypick} alt="Pick" />
                    </button>
                    <div className="sale-product-title-container"  onClick={handleProductClick}>
                        <div>
                            <div className="sale-product-title">{product.title}</div>
                        </div>
                        <div className="sale-product-price">{product.price}원</div>
                    </div>

                    <div className='sale-product-satisfaction-container'>
                        <div className="sale-product-user-name">
                            {product.user.nickname}
                        </div>
                        <div className="sale-product-satisfaction">
                            <span className='sale-product-satisfaction-num'>
                                만족도 {product.user.rating !== null ? product.user.rating + "%" : "불러오는 중..."}
                            </span>
                            <div className='sale-product-satisfaction-bar'>
                                <div className='sale-product-satisfaction-fill' style={{ width: `${product.user.rating || 0}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="products">
                {product.ingredients && product.ingredients.map((item, index) => (
                    <span key={index} className="product-item">{item}</span>
                ))}
            </div>
        </div>
    );
}
