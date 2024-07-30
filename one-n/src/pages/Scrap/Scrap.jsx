import React, { useState, useEffect } from "react";
import "./Scrap.css";
import { ReactComponent as Back } from "../../assets/back.svg";
import Modify from "../../assets/modify.png";
import axios from "axios";
import SaleProduct from "../../components/SaleProduct/SaleProduct";
import Masonry from "https://cdn.skypack.dev/react-masonry-css@1.0.16";
import { useNavigate } from "react-router-dom";

export default function Scrap() {
  const baseUrl = "https://n1.junyeong.dev/api";
  const imgUrl = "https://n1.junyeong.dev";

  const [signinData, setSigninData] = useState(null); // 유저 데이터
  const [satisfaction, setSatisfaction] = useState(null); // 만족도
  const [nickname, setNickname] = useState(null);
  const [products, setProducts] = useState([]);
  // console.log(products);
  const [data, setData] = useState([]); // 작성한 레시피 데이터

  // 메인 > 찜 탭
  const [selectedWishlistButton, setSelectedWishlistButton] = useState("글"); // 찜 탭 내부에서, 선택하는 항목
  const [pickProducts, setPickProducts] = useState([]); // 찜 탭 내부에서, 좋아요한 글
  const [likedRecipe, setLikedRecipe] = useState([]); // 찜 탭 내부에서, 좋아요 한 레시피

  // 처음 탭 상태는 재료탭
  const [selectedOption, setSelectedOption] = useState("ingredients");

  // 컴포넌트 마운트될 때, sessionStorage에서 signinData 가져옴
  useEffect(() => {
    const storedSigninData = sessionStorage.getItem("signinData");
    if (storedSigninData) {
      // 데이터 있으면, JSON으로 변환 후 업데이트
      setSigninData(JSON.parse(storedSigninData));
    }
  }, []);

  const navigate = useNavigate();

  // 뒤로가기 버튼 누르면, 이전 페이지로 이동
  const handleBackClick = () => {
    navigate(-1);
  };

  // edit 버튼 누르면, edit 페이지로 이동
  const handleEditClick = () => {
    navigate("/edit-profile");
  };

  //클릭된 버튼의 옵션을 나타내는 인자 받음
  const handleButtonClick = (option) => {
    // setSelectedWishlistButton(null); //찜 버튼의 선택 상태 초기화
    if (selectedOption !== option) {
      setSelectedOption(option); // 선택된 옵션이 현재 선택된 옵션과 다를 때만 상태 변경(어떤 탭 클릭했는지 변경)
    }
  };

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
        setSatisfaction(response.data.user_rating * 100); // user_rating은 0.0에서 1.0 범위에 있으므로 100을 곱해서 퍼센트로 변환합니다.
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    //사용자 게시물 가져옴
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `${baseUrl}/user/posts?session_id=${signinData}`
          `${baseUrl}/user/posts?session_id=test_session_id`
        );

        console.log(response.params);
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserInfo();
    fetchData();
  }, []);

  // 메인 탭에서 레시피 탭 클릭시
  useEffect(() => {
    if (selectedOption === "recipe") {
      fetchPostRecipe();
    }
  }, [selectedOption]);

  // 자신이 작성한 레시피 리스트
  const fetchPostRecipe = async () => {
    // const apiUrl = `${baseUrl}/user/recipes?session_id=test_${signinData}`;
    const apiUrl = `${baseUrl}/user/recipes?session_id=test_session_id`;

    axios
      .get(apiUrl)
      .then((response) => {
        const updatedData = response.data.map((item) => ({
          ...item,
          thumbnail_image: `${imgUrl}${item.thumbnail_image}`,
        }));
        setData(updatedData); // 작성한 레시피 데이터
        console.log(apiUrl);
        console.log(updatedData);
      })
      .catch((error) => {
        console.error("API 요청 에러:", error);
      });
  };

  // 메인 탭에서 찜 탭 누를 때
  const handleWishlistButtonClick = (action) => {
    console.log(signinData);
    setData([]); //이전 데이터 지움
    if (selectedWishlistButton !== action) {
      setSelectedWishlistButton(action); // 선택된 옵션이 현재 선택된 옵션과 다를 때만 상태 변경
    }
  };

  // 찜 탭 안에서, 좋아요한 글 불러오는 함수
  const fetchLikedPosts = async () => {
    try {
      const response = await axios.get(
        // `${baseUrl}/user/likes?session_id=${signinData}&type=post`
        `${baseUrl}/user/likes?session_id=test_session_id&type=post`
      );
      setPickProducts(response.data);
    } catch (error) {
      console.error("Error fetching liked posts:", error);
    }
  };

  // const fetchLikedRecipe = async () => {
  //     try {
  //         const response = await axios.get('${baseUrl}/user/likes?session_id=test_session_id&type=recipe');
  //         setLikedRecipe(response.data);
  //     } catch (error) {
  //         console.error('Error fetching liked posts:', error);
  //     }
  // };

  // 찜 탭 안에서, 좋아요한 레시피 불러오는 함수
  const fetchLikedRecipe = async () => {
    // const apiUrl = `${baseUrl}/user/likes?session_id=${signinData}&type=recipe`;
    const apiUrl = `${baseUrl}/user/likes?session_id=test_session_id&type=recipe`;

    axios
      .get(apiUrl)
      .then((response) => {
        const updatedData = response.data.map((item) => ({
          ...item,
          thumbnail_image: `${imgUrl}${item.thumbnail_image}`,
        }));
        console.log("요청감");
        console.log(updatedData);
        setLikedRecipe(updatedData);
      })
      .catch((error) => {
        console.error("API 요청 에러:", error);
      });
  };

  // 찜 탭 안에 들어갈 옵션
  useEffect(() => {
    if (selectedWishlistButton === "글") {
      fetchLikedPosts();
    }
  }, [selectedWishlistButton]);

  useEffect(() => {
    if (selectedWishlistButton === "레시피") {
      fetchLikedRecipe();
    }
  }, [selectedWishlistButton]);

  return (
    <div className="scrap-container">
      <div className="scrap-back-button-container">
        <button className="scrap-back-button" onClick={handleBackClick}>
          <Back />
        </button>
      </div>
      <div className="scrap-profile-container">
        <div className="scrap-profile-image"></div>
        <div className="scrap-profile-name-satisfaction-container">
          <div className="scrap-profile-name">{nickname}</div>

          <div className="my-satisfaction-container">
            <span className="my-satisfaction-num">
              만족도
              {satisfaction !== null ? satisfaction + "%" : "불러오는 중..."}
            </span>
            <div className="my-satisfaction-bar">
              <div
                className="my-satisfaction-fill"
                style={{ width: `${satisfaction}%` }}
              ></div>
            </div>
          </div>
        </div>
        {/* edit 버튼 */}
        <button className="profile-modify-button" onClick={handleEditClick}>
          <img src={Modify} alt="Modify"></img>
        </button>
      </div>
      <div className="scrap-option-container">
        <div className="option-buttons">
          <button
            className={selectedOption === "ingredients" ? "active" : ""}
            onClick={() => handleButtonClick("ingredients")}
          >
            재료
          </button>
          <button
            className={selectedOption === "recipe" ? "active" : ""}
            onClick={() => handleButtonClick("recipe")}
          >
            레시피
          </button>
          <button
            className={selectedOption === "wishlist" ? "active" : ""}
            onClick={() => handleButtonClick("wishlist")}
          >
            찜
          </button>
        </div>
      </div>
      <div className="scrap-scroll-container">
        <div className="scrap-scroll">
          {selectedOption === "ingredients" &&
            products.map((item) => (
              <SaleProduct key={item.id} product={item} />
            ))}

          {selectedOption === "recipe" && (
            <Masonry
              breakpointCols={2}
              className="grid-container"
              columnClassName="column"
            >
              {data.map((item) => (
                <div key={item.id} className="grid-item">
                  <img src={item.thumbnail_image} alt={`Image ${item.title}`} />
                </div>
              ))}
            </Masonry>
          )}

          {selectedOption === "wishlist" && (
            <div className="wishlist-buttons">
              <button
                className={
                  selectedWishlistButton === "글"
                    ? "wishlist-button active"
                    : "wishlist-button"
                }
                onClick={() => handleWishlistButtonClick("글")}
              >
                글
              </button>
              <button
                className={
                  selectedWishlistButton === "레시피"
                    ? "wishlist-button active"
                    : "wishlist-button"
                }
                onClick={() => handleWishlistButtonClick("레시피")}
              >
                레시피
              </button>
            </div>
          )}
          {selectedWishlistButton === "글" &&
            pickProducts.map((product, index) => (
              <SaleProduct key={index} product={product} />
            ))}
          {selectedWishlistButton === "레시피" && (
            <Masonry
              breakpointCols={2}
              className="grid-container"
              columnClassName="column"
            >
              {likedRecipe.map((item) => (
                <div key={item.id} className="grid-item">
                  <img src={item.thumbnail_image} alt={`Image ${item.title}`} />
                </div>
              ))}
            </Masonry>
          )}
        </div>
      </div>
    </div>
  );
}
