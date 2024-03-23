import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactModal from 'react-modal';
import './ChatRoom.css'

import previous from '../../assets/icons/previous.svg'
import down from '../../assets/icons/down.png'
import exit from '../../assets/icons/exit.png'
import img from '../../assets/icons/img.png'
import send from '../../assets/icons/send.png'
import door from '../../assets/icons/door.png';
import save from '../../assets/icons/save.png';

import { ReviewSelect } from '../../components/Review/ReviewSelect';

function ChatRoom() {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const [data, setData] = useState([]);
  const [Exit, setExit] = useState(null);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [rounded, setRounded] = useState(false);
  
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);  
  const [closeModalOpen, setCloseModalOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    setRounded(!rounded); 
  };

  // 채팅방 퇴장
  const onClickExit = () => {
    const apiUrl = 'http://20.39.188.154:8080/chat/exit-user';
     
    axios.post(apiUrl)
      .then((response) => {
        setExit(response.data);
      })
      .catch((error) => {
        console.error('API 요청 에러:', error);
      });
    
    navigate(-1);
  }

  const onClickclose = () => {
    setExitModalOpen(false);
  };

  const onClickReview = () => {
    setReviewModalOpen(false);
  }

  // 채팅방 전체 메시지
  useEffect(() => {
    const apiUrl = `http://20.39.188.154:8080/chat/init-messages?id=${chatId}&session_id=test_session_id`;
   
    axios.get(apiUrl)
      .then((response) => {
        const updatedData = response.data.map(item => ({
        ...item,
        profile_image: `http://20.39.188.154${item.profile_image}`
      }));
      setData(updatedData);
      })
      .catch((error) => {
        console.error('API 요청 에러:', error);
      });
    }, [chatId]);

  return (
    <div>
        <div className='room-header'>
          <div className='top-header'>
            <img src={previous} onClick={() => navigate(-1)}/>

            <div className='product'>
              <div className='product-img' />
              <span> 닭갈비 공동구매 </span>
            </div>

            <div className='rt-header'>

              {/* 퇴장 */}
              <img src={exit} onClick={() => setExitModalOpen(true)} alt='exit'/>
              <ReactModal
                isOpen={exitModalOpen}
                style={ExitModalStyles}
                contentLabel="Exit Modal"
              >
                <div className="exitModal" >
                  <img src={door} style={{marginBottom:"16px"}} alt='door'/>
                  <div style={{fontSize: '20px', fontWeight: '700', marginBottom: '18px'}}>정말 퇴장하시겠어요?</div>
                  <div style={{fontSize: '16px', fontWeight: '500', marginBottom: '24px'}}> 채팅방은 영구적으로 삭제되며
                    <br/>
                    거래는 자동으로 취소됩니다.
                  </div>
                  <div style={{display: 'flex', gap: '16px'}}>
                    <button onClick={onClickclose} style={{...ExitModalStyles.button, backgroundColor:'#FFF', border:'1px solid #D9D9D9'}}> 취소 </button>
                    <button onClick={onClickExit} style={ExitModalStyles.button}> 확인 </button>
                  </div>
                  </div>
                </ReactModal>
            </div>
          </div>

          <div>    
          <img src={down} onClick={toggleDropdown} className={`drop ${rounded ? 'rounded' : ''}`} /> 
          {dropdownVisible && (
            <div id='dropdown' className='dropdown'>
              
              {/* 채팅방 종료 → 리뷰 작성 */}
              <button onClick={() => setReviewModalOpen(true)}> 거래완료 </button>
              <ReactModal
                isOpen={reviewModalOpen}
                style={ReviewModalStyles}
                contentLabel="Review Modal"
              >
                <div className="reviewModal">
                  <div style={{padding: '12px'}}> 리뷰 작성</div>

                  <div className='review-body'>
                    <input placeholder='거래에 대한 후기를 작성해주세요.'/>
                    <div style={{margin: '16px 16px 0 16px'}}> 만족도</div>
                    <ReviewSelect/> {/* 만족도 슬라이더 */}
                  </div>
                  
                  <button style={ReviewModalStyles.button}
                  onClick={() => {
                    setCloseModalOpen(true);  
                  }}> 등록하기 </button>
                  <ReactModal
                  isOpen={closeModalOpen}
                  style={CloseModalStyles}
                  contentLabel="check Modal"
                  >
                    <div className="checkModal">
                      <img src={save} alt='save' />
                      <h3> 성공적으로 등록되었어요!</h3>
                      <button style={CloseModalStyles.button}
                      onClick={() => {
                        setCloseModalOpen(false);
                        setReviewModalOpen(false);
                      }}> 확인 </button>
                    </div>
                  </ReactModal>
                  </div>
              </ReactModal>
            </div>
          )}
          </div>
        </div>

        <div className='room-body'>


          {/* 채팅메세지 */}
          {data.map((item, index) => (
          <div className='other' key={index}>
          {item.type === 'NOTICE' ? (
            <div style={{ display:'flex', gap:'20px', alignItems:'center', margin: '8px 0', fontSize: '12px', color: '#8593A8', textAlign: 'center' }}>
              <div style={{ flex: '1', borderBottom: '1px solid #8593A8', opacity:'0.5' }}></div>
              {item.message}
              <div style={{ flex: '1', borderBottom: '1px solid #8593A8', opacity:'0.5' }}></div>
            </div>
          ) : (
            <>
              {index === 0 || data[index - 1].nickname !== item.nickname ? (
                <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '8px 0' }}>
                  <img src={item.profile_image} style={{ width: '35px', height: '35px' }} />
                  <div style={{ marginLeft: '5px' }}>
                    <div style={{ fontSize: '14px', marginBottom: '5px' }}> {item.nickname} </div>
                    <div className='message'> {item.message} </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '8px 0' }}>
                  <div style={{ marginLeft: '40px' }}>
                    <div className='message'> {item.message} </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        ))}

         
        </div>
        
        <div className='input-msg'>
          <img src={img} alt='img'/>
          <input placeholder='메세지 보내기' />
          <img src={send} alt='send' className='send'/>
        </div>
        
    </div>
  )
}

const ExitModalStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.3)"
  },
  content: {
    width: "311px",
    height: "285px",
    padding: "32px 16px 16px 16px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "16px",
    backgroundColor: "white",
    display: 'flex',
    justifyContent: "center",
    textAlign: "center",
    overflow: "auto",
  },
  button: {
    width: "132px",
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
};

const ReviewModalStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.3)"
  },
  content: {
    width: "311px",
    height: "370px",
    padding: "16px 0",
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
};

const CloseModalStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.3)"
  },
  content: {
    width: "311px",
    height: "240px",
    padding: "32px 16px 0 16px",
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
  
}
export default ChatRoom;