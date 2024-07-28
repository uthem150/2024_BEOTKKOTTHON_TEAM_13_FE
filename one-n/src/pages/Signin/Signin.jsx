import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Signin.css'
import { ReactComponent as Back } from '../../assets/back.svg'
import logo from '../../assets/logo/logo.png';
import { ReactComponent as GoogleIcon } from '../../assets/social/GoogleIcon.svg';
import { ReactComponent as KakaoIcon } from '../../assets/social/KakaoIcon.svg';
import { ReactComponent as NaverIcon } from '../../assets/social/NaverIcon.svg';

function Signin() {

    const baseUrl = "https://n1.junyeong.dev/api";
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='signinpage-container'>

            <button className='back-button' onClick={handleBackClick}>
                <Back />
            </button>

            <div className="signin-info">
                <div>
                    <div className="signin-title"> 식재료 1/N 할 수 있는 </div>
                    <div className="signin-title2"> 식재료 공동구매 서비스 </div>
                </div>
                <img src={logo} alt='logo' className='signin-logo-img' />
            </div>

            <div className="signin-input">
                <input type="text" className="input-field" placeholder="이메일을 입력해주세요." />
                <input type="password" className="input-field" placeholder="비밀번호를 입력해주세요." />
            </div>

            <button className="signin-btn">이메일로 로그인</button>

            <div className="signup-search">
                <div className="signup-name">회원가입</div>
                <div className="search-name">아이디/비밀번호 찾기</div>
            </div>

            <div className="or-line">
                <div className="border-line" />
                또는
                <div className="border-line" />
            </div>

            <div className="social-icon">
                <GoogleIcon />
                <KakaoIcon />
                <NaverIcon />
            </div>

        </div>
    )

}

export default Signin;