import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import { ReactComponent as Back } from '../../assets/back.svg';
import logo from '../../assets/logo/logo.png';
import { ReactComponent as GoogleIcon } from '../../assets/social/GoogleIcon.svg';
import { ReactComponent as KakaoIcon } from '../../assets/social/KakaoIcon.svg';
import { ReactComponent as NaverIcon } from '../../assets/social/NaverIcon.svg';
import axios from 'axios';

function Signin() {
    const baseUrl = "https://n1.junyeong.dev/api";
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSignin = async () => {
        if (email && password) {
            try {
                const response = await axios.post(`${baseUrl}/user/signin`, {
                    email,
                    password
                });
                console.log('로그인 요청 성공:', response.data);
                navigate("/"); // 홈으로 이동
            } catch (error) {
                console.error('로그인 오류:', error.response ? error.response.data : error.message);
            }
        } else {
            console.log('이메일과 비밀번호를 입력해주세요.');
        }
    };

    const toSignup = () => {
        navigate("/signup");
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
                <input
                    type="text"
                    className="input-field"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="input-field"
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="signin-btn" onClick={handleSignin}>이메일로 로그인</button>

            <div className="signup-search">
                <div className="signup-name" onClick={toSignup}>회원가입</div>
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
    );
}

export default Signin;
