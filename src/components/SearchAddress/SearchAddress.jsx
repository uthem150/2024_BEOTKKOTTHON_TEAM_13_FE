import './SearchAddress.css'
import { ReactComponent as Back } from '../../assets/back.svg'
import { Link, useNavigate } from 'react-router-dom';


export default function SearchAddress() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // 뒤로가기
    }
    return (
        <div className="search-address-container">
            <div className="product-post-header">
                <button className='back-button' onClick={goBack}>
                    <Back />
                </button>
                <div className='product-post-text'>
                    <p className='centered-text'>주소 검색</p>
                </div>
            </div>
            <div className='search-address-input-container'>
                <input className='search-address-input'
                    placeholder='주소를 검색하세요.'></input>
            </div>

            <div className='search-address-button-container'>
                <Link to='/select-location'>
                    <button className='search-address-button'>
                        지도보기
                    </button>
                </Link>

            </div>
        </div>
    );
}