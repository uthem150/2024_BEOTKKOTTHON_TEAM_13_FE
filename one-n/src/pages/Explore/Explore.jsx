import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Explore.css";
import search from "../../assets/icons/search.svg";
import Masonry from "https://cdn.skypack.dev/react-masonry-css@1.0.16";

const Explore = () => {
  const baseUrl = "https://n1.junyeong.dev/api";
  const imgBaseUrl = "https://n1.junyeong.dev/";
  const navigate = useNavigate();

  const [data, setData] = useState([]); // 검색 결과 데이터 저장
  const [searchKeyword, setSearchKeyword] = useState(""); // 입력한 검색어 저장
  const [signinData, setSigninData] = useState(null); // 로그인 데이터 저장
  const [searchHistory, setSearchHistory] = useState([]); // 로컬 스토리지에 저장된 목록
  const [searchClicked, setSearchClicked] = useState(false); // 검색버튼이 눌렸는지 확인
  const [activeTab, setActiveTab] = useState("ingd"); // 현재 활성화된 탭

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
  }, []);

  // 사진 클릭하면 /recipe/{id} 경로로 이동
  const handlePhotoClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  // 검색입력 변경될 때 마다 업데이트
  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
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

    setSearchClicked(true);
    fetchRecipes(searchKeyword, activeTab);
  };

  const fetchRecipes = (keyword, tab) => {
    setData([]); // 이전 페치 데이터 삭제

    const apiUrl = searchClicked
      ? `${baseUrl}/post/list?bcode=&type=${tab}&keyword=${keyword}&page=1` // 검색 버튼을 누른 후 받아올 주소
      : `${baseUrl}/post/list?bcode=&type=all&keyword=${keyword}&page=1`; // 처음 검색할 때 받아올 주소

    console.log(apiUrl);

    axios
      .get(apiUrl)
      .then((response) => {
        const updatedData = response.data.map((item) => ({
          ...item,
          thumbnail_image: `${imgBaseUrl}${item.image}`,
        }));
        setData(updatedData); // 받아온 데이터 저장
        console.log(updatedData);
      })
      .catch((error) => {
        console.error("API 요청 에러:", error);
      });
  };

  const handleDeleteHistory = (keyword, e) => {
    e.stopPropagation(); // 이벤트 전파를 중단하여 fetchRecipes 호출 방지

    // 해당 keyword 지운 배열 생성
    const updatedSearchHistory = searchHistory.filter(
      (item) => item !== keyword
    );
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedSearchHistory));
  };

  useEffect(() => {
    // 빈 문자열 아니면, fetch
    if (searchKeyword.trim() !== "") {
      fetchRecipes(searchKeyword, activeTab);
    }
  }, [searchKeyword, activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // 이전 데이터 초기화
    setData([]);

    if (searchKeyword.trim() !== "") {
      fetchRecipes(searchKeyword, tab);
    }
  };

  return (
    <>
      <div className="explore-header">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchInputChange}
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

      {searchClicked && (
        <div className="tabs">
          <div
            style={{
              backgroundColor: activeTab === "ingd" ? "yellow" : "white",
            }}
            className="tab"
            onClick={() => handleTabClick("ingd")}
          >
            재료
          </div>
          <div
            style={{
              backgroundColor: activeTab === "r_ingd" ? "yellow" : "white",
            }}
            className="tab"
            onClick={() => handleTabClick("r_ingd")}
          >
            레시피
          </div>
        </div>
      )}

      {!searchClicked && searchHistory && searchHistory.length > 0 && (
        <div>
          <div style={{ fontSize: "15px", margin: "15px 15px" }}>
            <strong>최근 검색어</strong>
          </div>
          <div className="search-history">
            {searchHistory.map((keyword, index) => (
              <div
                onClick={() => {
                  setSearchKeyword(keyword);
                  setSearchClicked(true);
                  fetchRecipes(keyword, activeTab);
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
          <div key={item.id} className="grid-item">
            <img
              src={item.thumbnail_image}
              onClick={() => handlePhotoClick(item.id)}
              alt={`${item.title}`}
            />
          </div>
        ))}
      </Masonry>
    </>
  );
};

export default Explore;
