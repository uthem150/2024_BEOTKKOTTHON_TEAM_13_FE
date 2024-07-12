import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';

function Signup () {
      
  const baseUrl="https://n1.junyeong.dev/api";
  const [signupModalOpen, setSignupModalOpen] = useState(true);

  const [signup, setSignup] = useState('');
  const [signin, setSignin] = useState('');

  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    // 세션 만료 여부를 확인하는 함수
    const checkSessionExpiration = async () => {
      try {
        // 세션 만료 여부를 확인하는 API 요청을 보냅니다.
        const response = await axios.get(`${baseUrl}/chats/list?session_id=${signin}`);
        const sessionExpired = response.data.expired;
        if (sessionExpired) {
          // 세션이 만료되었을 경우 로그인 창을 엽니다.
          setSignupModalOpen(true);
        }
      } catch (error) {
        console.error('세션 만료 여부 확인 에러:', error);
      }
    };

    // 컴포넌트가 렌더링될 때 세션 만료 여부를 확인합니다.
    checkSessionExpiration();
  }, []);

  const handleSignup = () => {
    const apiUrlSignup = `${baseUrl}/user/signup`;
    const userData1 = {
      user_id: userId,
      nickname: nickname,
    };

    axios.post(apiUrlSignup, userData1)
      .then((response) => {
        setSignupModalOpen(false);
        setUserId('');
        setNickname('');
        handleSignin(userId);

        sessionStorage.setItem('nickname', nickname);
      })
      .catch((error) => {
        console.error('API 요청 에러:', error);
      });
  };

  const handleSignin = (userId) => {
    const apiUrlSignin = `${baseUrl}/user/signin`;
    const userData2 = {
      user_id: userId
    };

    axios.post(apiUrlSignin, userData2)
      .then((response) => {
        setSignin(response.data);
        sessionStorage.setItem('signinData', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('API 요청 에러:', error);
      });
    };


    return(
        <div>
            <ReactModal
                isOpen={signupModalOpen}
                style={SignupStyles}
                contentLabel="Signup"
              >
                <div className="signupModal">
                  <h3> 반갑습니다! </h3>

                  <div className='signup-body'>
                    <h4> 서비스를 이용하기 위해
                        <br/>
                        닉네임을 입력해주세요.
                    </h4>
                    <div style={{fontSize: '14px', fontWeight:'500'}}>
                        <div style={{display:'flex', alignItems:'flex-start'}}> 아이디 </div>
                        <div>
                          <input style={SignupStyles.input}
                                 value={userId}
                                 onChange={(e) => setUserId(e.target.value)}
                          placeholder='아이디 입력 (영어/숫자 최대 20자)'/>
                        </div>
                    </div>

                    <div style={{fontSize: '14px', fontWeight:'500'}}>
                        <div style={{display:'flex', alignItems:'flex-start'}}> 닉네임 </div>
                        <div>
                          <input style={SignupStyles.input} 
                                 value={nickname}
                                 onChange={(e) => setNickname(e.target.value)}
                          placeholder='닉네임 입력 (한/영 최대 20자)'/>
                        </div>
                    </div>
                    
                  </div>
                  
                  <button style={SignupStyles.button}
                  onClick={handleSignup}> 확인 </button>
                  </div>
              </ReactModal></div>
            )
        }

const SignupStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.3)"
  },
  content: {
    width: "320px",
    height: "370px",
    padding: "24px 16px 24px 16px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "16px",
    backgroundColor: "white",
    display: 'flex',
    justifyContent: 'center',
    textAlign: "center",
    overflow: "auto",
    
  },
  button: {
    width: "279px",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "500",
    backgroundColor: "#FFDC25",
    color: "#191919",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  input: {
    width: '88%',
    padding: '12px 16px',
    display:'flex',
    alignItems: 'flex-start',
    margin: '12px 0 24px 0',
    border: 'none',
    borderRadius:'8px',
    backgroundColor: '#EBEBEB'

  }
};

export default Signup
