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
  const baseUrl = "https://n1.junyeong.dev/api";
  const navigate = useNavigate();

  const [signinData, setSigninData] = useState(null);

  // useEffect(() => {
  //   const storedSigninData = sessionStorage.getItem("signinData");
  //   if (storedSigninData) {
  //     setSigninData(JSON.parse(storedSigninData));
  //   }
  // }, []);

  // 사진 업로드
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // 재료 추가
  const [GrdCount, setGrdCount] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const addIngredient = (ingredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  // 과정 추가
  const [StepCount, setStepCount] = useState(0);
  const [processes, setProcesses] = useState([]);
  const addProcess = (process) => {
    setProcesses((prevProcesses) => [...prevProcesses, process]);
  };

  // 레시피 등록 함수
  const registerRecipe = () => {
    const recipeData = {
      userId: signinData.userId, // 사용자 ID
      thumbnailImage: URL.createObjectURL(image),
      title: document.querySelector('.input-title').value.trim(),
      ingredients: ingredients, // 재료 목록
      processes: processes, // 과정 목록
    };

    // 실제로 API에 POST 요청 보내는 부분
    fetch(`${baseUrl}/recipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('네트워크 응답 오류');
      })
      .then(data => {
        console.log('레시피 등록 성공:', data);
        setSaveModalOpen(true);
      })
      .catch(error => {
        console.error('레시피 등록 오류:', error);
      });
  };

  // 모달 알림창
  const [saveModalOpen, setSaveModalOpen] = useState(false); // 저장
  const [closeModalOpen, setCloseModalOpen] = useState(false); // 작성취소 나가기

  const onClickSave = () => {
    registerRecipe();
  };
  const onClickClose = () => {
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
              <button onClick={onClickClose} style={CloseModalStyles.button}>
                {" "}
                계속하기{" "}
              </button>
            </div>
          </div>
        </ReactModal>
        <text> 레시피 게시글 작성</text>
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

        {/* 재료 추가 컴포넌트 */}
        {[...Array(GrdCount+3)].map((_, index) => (
          <PlusGrd key={index} addIngredient={addIngredient} />
        ))}

        <button className="plus-btn" onClick={() => setGrdCount(prevCount => prevCount + 1)}>
          {" "}
          재료 추가{" "}
        </button>

        <div className="title-reg" style={{ margin: "24px 0 16px 0" }}>
          {" "}
          요리 과정{" "}
        </div>

        {/* 과정 추가 컴포넌트 */}
        {[...Array(StepCount + 1)].map((_, index) => (
          <PlusStep key={index} index={index} addProcess={addProcess} />
        ))}

        <button className="plus-btn" onClick={() => setStepCount(prevCount => prevCount + 1)}>
          {" "}
          과정 추가{" "}
        </button>

        <button className="upload-btn" onClick={onClickSave}>
          {" "}
          등록하기{" "}
        </button>

        <ReactModal
          isOpen={saveModalOpen}
          style={SaveModalStyles}
          contentLabel="Save Modal"
        >
          <div className="saveModal">
            <img src={save} alt="save" />
            <h3> 성공적으로 등록되었어요!</h3>
            <button onClick={() => setSaveModalOpen(false)} style={SaveModalStyles.button}>
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

const SaveModalStyles = {
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
