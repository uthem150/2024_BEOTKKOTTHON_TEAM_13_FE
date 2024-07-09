// 레시피 등록페이지
import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './RecipeReg.css'

import previous from "../../assets/icons/previous.svg";
import quit from "../../assets/icons/quit.png";
import save from "../../assets/icons/save.png";
import camera from "../../assets/icons/camera.png";

import { PlusStep } from "../../components/Recipe/PlusStep";
import { PlusGrd } from "../../components/Recipe/PlusGrd";

function RecipeReg() {
  const navigate = useNavigate();

  const [signinData, setSigninData] = useState(null);

  useEffect(() => {
    const storedSigninData = sessionStorage.getItem("signinData");
    if (storedSigninData) {
      setSigninData(JSON.parse(storedSigninData));
    }
  }, []);

  // 사진 업로드
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // 재료 추가
  const [GrdCount, setGrdCount] = useState(0);

  const addGrd = () => {
    setGrdCount((prevCount) => prevCount + 1);
  };

  // 과정 추가
  const [StepCount, setStepCount] = useState(0);

  const addStep = () => {
    setStepCount((prevCount) => prevCount + 1);
  };

  // 모달 알림창
  const [exitModalOpen, setExitModalOpen] = useState(false); // 퇴장
  const [saveModalOpen, setSaveModalOpen] = useState(false); // 저장
  const [closeModalOpen, setCloseModalOpen] = useState(false); // 닫기

  const onClickExit = () => {
    setExitModalOpen(false);
  };
  const onClicksave = () => {
    setExitModalOpen(false);
  };
  const onClickclose = () => {
    setCloseModalOpen(false);
  };

  return (
    <div>
      <div className="reg-header">
        <img
          src={previous}
          onClick={() => setCloseModalOpen(true)}
          alt="previous"
        />
        <ReactModal
          isOpen={closeModalOpen}
          style={CloseModalStyles}
          contentLabel="Close Modal"
        >
          <div className="closeModal">
            <img src={quit} alt="quit" />
            <h3> 작성을 취소하시겠어요?</h3>
            <h4>
              작성하던 글은 모두 사라지며
              <br />
              임시저장되지 않습니다.
            </h4>
            <div style={{ display: "flex", gap: "16px" }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  ...CloseModalStyles.button,
                  background: "#FFF",
                  border: "1px solid #D9D9D9",
                }}
              >
                {" "}
                취소하기{" "}
              </button>
              <button onClick={onClickclose} style={CloseModalStyles.button}>
                {" "}
                계속하기{" "}
              </button>
            </div>
          </div>
        </ReactModal>
        레시피 게시글 작성
      </div>

      <div className="reg-body">
        <div className="title-reg"> 이름 </div>
        <input
          type="text"
          className="input-title"
          placeholder="요리 이름을 입력해주세요."
        />

        <div className="title-reg"> 표지 이미지 </div>
        <div className="input-top-img">
          {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
          {!image && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="imageInput"
              />
              <label htmlFor="imageInput">
                {" "}
                <img src={camera} alt="camera" />{" "}
              </label>
            </>
          )}
        </div>

        <div className="title-reg" style={{ marginBottom: "16px" }}>
          {" "}
          필요 재료{" "}
        </div>
        <PlusGrd />
        <PlusGrd />
        <PlusGrd />

        {[...Array(GrdCount)].map((_, index) => (
          <PlusGrd key={index} />
        ))}

        <button className="plus-btn" onClick={addGrd}>
          {" "}
          재료 추가{" "}
        </button>

        <div className="title-reg" style={{ margin: "24px 0 16px 0" }}>
          {" "}
          요리 과정{" "}
        </div>
        <PlusStep />

        {[...Array(StepCount)].map((_, index) => (
          <PlusStep key={index} />
        ))}

        <button className="plus-btn" onClick={addStep}>
          {" "}
          과정 추가{" "}
        </button>

        <button className="upload-btn" onClick={() => setExitModalOpen(true)}>
          {" "}
          등록하기{" "}
        </button>
        <ReactModal
          isOpen={exitModalOpen}
          style={ExitModalStyles}
          contentLabel="Exit Modal"
        >
          <div className="exitModal">
            <img src={save} alt="save" />
            <h3> 성공적으로 등록되었어요!</h3>
            <button onClick={onClickExit} style={ExitModalStyles.button}>
              {" "}
              확인{" "}
            </button>
          </div>
        </ReactModal>
      </div>
    </div>
  );
}

const CloseModalStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.3)",
  },
  content: {
    width: "311px",
    height: "300px",
    padding: "32px 16px 0 16px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "16px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    overflow: "auto",
  },
  button: {
    width: "131px",
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

const ExitModalStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.3)",
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
    display: "flex",
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

export default RecipeReg;
