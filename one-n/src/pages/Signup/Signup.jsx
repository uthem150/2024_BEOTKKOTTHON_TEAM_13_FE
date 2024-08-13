import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { ReactComponent as Back } from '../../assets/back.svg';
import { ReactComponent as RightCheck } from '../../assets/rightCheck.svg';
import { ReactComponent as WrongCheck } from '../../assets/wrongCheck.svg';

function Signup() {

    const baseUrl = "https://n1.junyeong.dev/api";
    const navigate = useNavigate();

    const [nickname, setNickname] = useState('');

    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsEmailValid(emailRegex.test(newEmail));
    };

    // 전화번호
    const [phoneNum, setPhoneNum] = useState('');
    const [showConfirmPhoneNum, setShowConfirmPhoneNum] = useState(false);

    // 비밀번호
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isPasswordValid = password.length >= 10 && password.length <= 15;
    const passwordsMatch = password && confirmPassword && password === confirmPassword;

    // 체크박스
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isYouthChecked, setIsYouthChecked] = useState(false);
    const [isSmallPaymentChecked, setIsSmallPaymentChecked] = useState(false);
    const [isECommerceChecked, setIsECommerceChecked] = useState(false);
    const [isMarketingChecked, setIsMarketingChecked] = useState(false);

    // 전체동의 체크박스 변경 핸들러
    const handleAllCheckChange = () => {
        const newCheckedState = !isAllChecked;
        setIsAllChecked(newCheckedState);
        setIsYouthChecked(newCheckedState);
        setIsSmallPaymentChecked(newCheckedState);
        setIsECommerceChecked(newCheckedState);
        setIsMarketingChecked(newCheckedState);
    };

    // 개별 체크박스 상태 변경 핸들러
    const handleCheckboxChange = () => {
        setIsAllChecked(
            isYouthChecked &&
            isSmallPaymentChecked &&
            isECommerceChecked &&
            isMarketingChecked
        );
    };

    useEffect(() => {
        handleCheckboxChange();
    }, [isYouthChecked, isSmallPaymentChecked, isECommerceChecked, isMarketingChecked]);


    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSendCodeClick = () => {
        setShowConfirmPhoneNum(true);
    };

    const handleSignup = () => {
        // const apiUrlSignup = `${baseUrl}/user/signup`;

        // axios.post(apiUrlSignup)
        //   .then((response) => {
        navigate("/")
        //   })
        //   .catch((error) => {
        //     console.error('API 요청 에러:', error);
        //   });
    };

    return (
        <div className='signuppage-container'>
            <div className="top-nav">
                <button className='back-button' onClick={handleBackClick}>
                    <Back />
                </button>
                <div className="signup-title">회원가입</div>
            </div>

            {/* 닉네임 */}
            <div className="info-layout">
                <div className="info-title">닉네임</div>
                <input
                    className={`info-input ${nickname ? 'has-text' : ''}`}
                    placeholder="사용하실 닉네임을 입력해주세요."
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </div>

            {/* 이메일 */}
            <div className="info-layout">
                <div className="info-title">이메일</div>
                <input
                    className={`info-input ${email ? 'has-text' : ''}`}
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={handleEmailChange}
                />
                {!isEmailValid && email && (
                <div className="error_message">
                    <WrongCheck />
                    <div style={{ margin: '0 8px' }}>
                    유효한 이메일을 입력해주세요.
                    </div>
                </div>
            )}
            </div>

            {/* 휴대폰 인증 */}
            <div className="info-layout" style={{ marginBottom: showConfirmPhoneNum ? '96px' : '40px' }}>
                <div className="info-title">휴대폰 인증</div>
                <div className="input-wrapper">
                    <input
                        className={`info-input ${phoneNum ? 'has-text' : ''}`}
                        placeholder="인증하실 휴대폰 번호를 입력해주세요."
                        value={phoneNum}
                        onChange={(e) => setPhoneNum(e.target.value)}
                    />
                    <button className="send-code-button" onClick={handleSendCodeClick}>
                        인증번호 전송
                    </button>
                </div>
                <div style={{ margin: 8 }} />
                {showConfirmPhoneNum && (
                    <input
                        className="info-input"
                        placeholder="인증번호를 입력해주세요."
                    />
                )}
            </div>

            {/* 비밀번호 */}
            <div className="info-layout">
                <div className="info-title">비밀번호</div>
                <input
                    className={`info-input ${password ? 'has-text' : ''}`}
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isPasswordValid && (
                    <div className="match_message">
                        <RightCheck />
                        <div style={{ margin: '0 8px' }}>
                            사용 가능한 비밀번호입니다
                        </div>
                    </div>
                )}
                {!isPasswordValid && password && (
                    <div className="error_message">
                        <WrongCheck />
                        <div style={{ margin: '0 8px' }}>
                            비밀번호로 사용하실 수 없습니다.
                        </div>
                    </div>
                )}

            </div>

            {/* 비밀번호 확인 */}
            <div className="info-layout">
                <div className="info-title">비밀번호 확인</div>
                <input
                    className={`info-input ${confirmPassword ? 'has-text' : ''}`}
                    placeholder="비밀번호를 한 번 더 입력해주세요."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                 {passwordsMatch && (
                    <div className="match_message">
                        <RightCheck />
                        <div style={{ margin: '0 8px' }}>
                            설정한 비밀번호와 일치합니다.
                        </div>
                    </div>
                )}
                {confirmPassword && !passwordsMatch && (
                    <div className="error_message">
                        <WrongCheck />
                        <div style={{ margin: '0 8px' }}>
                            설정한 비밀번호가 일치하지 않습니다.
                        </div>
                    </div>
                )}
            </div>

            <div className="service-info">
                <div className="info-title">서비스 정책</div>
                <div className="service-box">

                    {/* 전체동의 체크박스 */}
                    <div className="service-box-content">
                        <input
                            id='all-checkbox'
                            type='checkbox'
                            checked={isAllChecked}
                            onChange={handleAllCheckChange}
                        />
                        <label htmlFor='all-checkbox' style={{ fontWeight: 600 }}>
                            전체동의
                        </label>
                    </div>
                    <div className="service-all-comment">하단의 약관에 모두 동의합니다.</div>

                    {/* 개별 체크박스들 */}
                    <div className="service-box-content">
                        <input
                            id='youth-checkbox'
                            type='checkbox'
                            checked={isYouthChecked}
                            onChange={() => setIsYouthChecked(!isYouthChecked)}
                        />
                        <label htmlFor='youth-checkbox'>
                            청소년법 약관
                        </label>
                    </div>

                    <div className="service-box-content">
                        <input
                            id='small-payment-checkbox'
                            type='checkbox'
                            checked={isSmallPaymentChecked}
                            onChange={() => setIsSmallPaymentChecked(!isSmallPaymentChecked)}
                        />
                        <label htmlFor='small-payment-checkbox'>
                            소액결제 동의 약관
                        </label>
                    </div>

                    <div className="service-box-content">
                        <input
                            id='ecommerce-checkbox'
                            type='checkbox'
                            checked={isECommerceChecked}
                            onChange={() => setIsECommerceChecked(!isECommerceChecked)}
                        />
                        <label htmlFor='ecommerce-checkbox'>
                            전자상거래 조약 약관
                        </label>
                    </div>

                    <div className="service-box-content">
                        <input
                            id='marketing-checkbox'
                            type='checkbox'
                            checked={isMarketingChecked}
                            onChange={() => setIsMarketingChecked(!isMarketingChecked)}
                        />
                        <label htmlFor='marketing-checkbox'>
                            (선택) 마케팅 수신 및 정보 보관
                        </label>
                    </div>

                </div>
            </div>

            <button className="signup-btn" onClick={handleSignup}>회원가입</button>
        </div>
    );
}

export default Signup;
