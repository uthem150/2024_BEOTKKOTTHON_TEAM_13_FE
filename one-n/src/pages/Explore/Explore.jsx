import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Explore.css";
import search from "../../assets/icons/search.svg";
import Masonry from "https://cdn.skypack.dev/react-masonry-css@1.0.16";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import styled from "styled-components";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

//Card 컴포넌트 확장하여 커스터마이징
const CustomCard = styled(Card)`
  /* margin: 10px 4px; */
  margin: 3px;
  margin-top: 10px;
  position: relative;
  .ant-card-body {
    padding: 15px;
  }

  .ant-card-meta-title {
    font-size: 0.7rem;
  }
`;

// 하트 아이콘 스타일링
const LikeIcon = styled.div`
  position: absolute;
  top: 0px;
  right: 5px;
  font-size: 20px;
  cursor: pointer;
  z-index: 1;
  .anticon svg {
    color: #ffdc25;
  }
`;

const Explore = () => {
  const baseUrl = "https://n1.junyeong.dev/api";
  const imgBaseUrl = "https://n1.junyeong.dev/";
  const navigate = useNavigate();

  const [data, setData] = useState([]); // 검색 결과 데이터 저장
  const [searchKeyword, setSearchKeyword] = useState(""); // 입력한 검색어 저장
  const [signinData, setSigninData] = useState(null); // 로그인 데이터 저장
  const [searchHistory, setSearchHistory] = useState([]); // 로컬 스토리지에 저장된 목록
  const [searchClicked, setSearchClicked] = useState(false); // 검색버튼이 눌렸는지 확인
  const [activeTab, setActiveTab] = useState("all"); // 현재 활성화된 탭
  const [likes, setLikes] = useState({}); // 레시피 ID별 좋아요 상태 저장

  useEffect(() => {
    // sessionStorage에 저장된 로그인 데이터
    const storedSigninData = sessionStorage.getItem("signinData");
    if (storedSigninData) {
      setSigninData(JSON.parse(storedSigninData));
    }

    // localStorage에 저장된 검색 기록
    const storedSearchHistory = localStorage.getItem("searchHistory");
    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }

    // 모든 레시피, 좋아요 상태 가져오기
    fetchRecipes("", false);
    if (storedSigninData) {
      fetchLikes();
    }

    // test용
    fetchLikes();
  }, []);

  // 사용자가 좋아요한 레시피 정보 가져오기
  const fetchLikes = () => {
    // API 요청을 위한 URL과 쿼리 파라미터 설정
    // const apiUrl = `${baseUrl}/user/likes?session_id=${signinData.session_id}&type=recipe`;
    const apiUrl = `${baseUrl}/user/likes?session_id=test_session_id&type=recipe`;

    // Axios GET 요청
    axios
      .get(apiUrl)
      .then((response) => {
        // 응답 데이터에서 좋아요 정보를 객체 형태로 변환
        const likesData = response.data.reduce((acc, like) => {
          acc[like.id] = true; // 각 좋아요 항목의 ID를 키로 설정
          return acc;
        }, {});

        console.log("Likes Data:", likesData);
        // 상태 업데이트
        setLikes(likesData); // 받아온 좋아요 데이터 저장
      })
      .catch((error) => {
        console.error("좋아요 정보 가져오기 실패:", error); // 오류 처리
      });
  };

  // 사진 클릭하면 /recipe/{id} 경로로 이동
  const handlePhotoClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  // 좋아요 클릭 시 서버에 요청
  const handleLikeClick = (id) => {
    if (!signinData) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const likeData = {
      session_id: signinData.session_id,
      type: "recipe",
      id: id,
    };

    axios
      .post(`${baseUrl}/user/likes`, likeData)
      .then((response) => {
        console.log("좋아요 성공:", response);
        //좋아요 상태 업데이트
        setLikes((prevLikes) => ({
          ...prevLikes, //이전 상태 복사
          [id]: !prevLikes[id], //클릭한 레시피 ID를 키로 값 토글
        }));
      })
      .catch((error) => {
        console.error("좋아요 실패:", error);
      });
  };

  // 검색입력 변경될 때 마다 업데이트
  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
    setSearchClicked(false); // 검색어 입력 중에는 검색 기록을 보여줌
  };

  const handleSearch = () => {
    // 빈 문자열 검색일 때 종료
    if (searchKeyword.trim() === "") return;

    // 이전 데이터 초기화
    setData([]);

    // 중복된 키워드 제거하고, 새로운 검색어를 맨 앞에 추가
    const updatedSearchHistory = [
      searchKeyword,
      ...searchHistory.filter((keyword) => keyword !== searchKeyword),
    ];
    setSearchHistory(updatedSearchHistory);
    // localStorage에 검색 기록 저장
    localStorage.setItem("searchHistory", JSON.stringify(updatedSearchHistory));

    fetchRecipes(searchKeyword, true);
    setSearchClicked(false); // 검색 실행 후에는 검색 기록을 숨김
  };

  const fetchRecipes = (keyword, isSearchClicked) => {
    setData([]); // 이전 페치 데이터 삭제

    const apiUrl = isSearchClicked
      ? `${baseUrl}/recipe/list?&keyword=${keyword}&page=1`
      : `${baseUrl}/recipe/list?keyword=&page=1`;

    console.log(apiUrl);

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response);
        const updatedData = response.data.map((item) => ({
          ...item,
          thumbnail_image: `${imgBaseUrl}${item.thumbnail_image}`,
        }));
        setData(updatedData); // 받아온 데이터 저장
      })
      .catch((error) => {
        console.error("API 요청 에러:", error);
      });
  };

  const handleDeleteHistory = (keyword, e) => {
    e.stopPropagation(); // 이벤트 전파를 중단하여 fetchRecipes 호출 방지(부모 요소로 이벤트 전달되지 않도록)

    // 해당 keyword 지운 배열 생성
    const updatedSearchHistory = searchHistory.filter(
      (item) => item !== keyword
    );
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedSearchHistory));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // 이전 데이터 초기화
    setData([]);

    if (searchKeyword.trim() !== "") {
      fetchRecipes(searchKeyword, true);
    }
  };

  const handleInputFocus = () => {
    setSearchClicked(true);
  };

  return (
    <>
      <div className="explore-header">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchInputChange}
          onFocus={handleInputFocus}
          placeholder="검색어를 입력하세요"
          className="search"
        />
        <img
          className="search-btn"
          src={search}
          onClick={handleSearch}
          alt="Search"
        />
      </div>

      {searchClicked && searchHistory && searchHistory.length > 0 && (
        <div>
          <div style={{ fontSize: "15px", margin: "25px 15px" }}>
            <strong>최근 검색어</strong>
          </div>
          <div className="search-history">
            {searchHistory.map((keyword, index) => (
              <div
                onClick={() => {
                  setSearchKeyword(keyword);
                  fetchRecipes(keyword, true);
                  setSearchClicked(false); // 최근 검색어 클릭 시 검색 기록 숨김
                }}
                key={index}
                className="search-history-item"
              >
                <span>{keyword}</span>
                <div
                  className="delete-btn"
                  onClick={(e) => handleDeleteHistory(keyword, e)}
                >
                  <svg
                    data-slot="icon"
                    fill="none"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    width="20px"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Masonry
        breakpointCols={2}
        className="grid-container"
        columnClassName="column"
      >
        {data.map((item) => (
          <CustomCard
            key={item.id}
            hoverable={true} // 마우스 오버 시 카드가 약간 확대되는 효과
            cover={
              <div>
                <img
                  src={item.thumbnail_image}
                  onClick={() => handlePhotoClick(item.id)} // 특정 레시피 페이지로 이동
                  alt={`${item.title}`}
                  style={{ width: "100%", height: "auto" }}
                />
                <LikeIcon
                  liked={likes[item.id]} // 현재 좋아요 상태 반영
                  onClick={() => handleLikeClick(item.id)}
                >
                  {likes[item.id] ? <HeartFilled /> : <HeartOutlined />}
                </LikeIcon>
              </div>
            }
          >
            <Meta title={item.title} />
          </CustomCard>
        ))}
      </Masonry>
    </>
  );
};

export default Explore;
