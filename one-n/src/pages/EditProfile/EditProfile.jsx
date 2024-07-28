import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Back } from "../../assets/back.svg";
import axios from "axios";
import "./EditProfile.css"; // CSS 파일 import

function EditProfile() {
  const baseUrl = "https://n1.junyeong.dev/api";
  const [nickname, setNickname] = useState("");
  const [signinData, setSigninData] = useState(null); // 유저 데이터

  const navigate = useNavigate();

  // 뒤로가기 버튼 누르면, 이전 페이지로 이동
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSave = () => {
    // 저장 api
    console.log("Saved:", { nickname });
  };

  // 컴포넌트 마운트될 때, sessionStorage에서 signinData 가져옴
  useEffect(() => {
    const storedSigninData = sessionStorage.getItem("signinData");
    if (storedSigninData) {
      // 데이터 있으면, JSON으로 변환 후 업데이트
      setSigninData(JSON.parse(storedSigninData));
    }
  }, []);

  // 컴포넌트 마운트 될 때, 사용자 정보 가져옴
  useEffect(() => {
    //사용자 정보 가져옴
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          // `${baseUrl}/user/info?session_id=${signinData}`
          `${baseUrl}/user/info?session_id=test_session_id`
        );
        setNickname(response.data.nickname);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="edit-profile-container">
      <div className="scrap-back-button-container">
        <button className="scrap-back-button" onClick={handleBackClick}>
          <Back />
        </button>
      </div>
      <div className="info-content">
        <h2>Edit Profile</h2>
        <div className="profile-image-container">
          <div className="scrap-profile-image"></div>
        </div>
        <form>
          <div>
            <label>닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="form-input"
            />
          </div>
        </form>
        <button type="button" onClick={handleSave} className="save-button">
          저장
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
