import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Explore.css";
import search from "../../assets/icons/search.svg";
import Masonry from "https://cdn.skypack.dev/react-masonry-css@1.0.16";

const Explore = () => {
  const baseUrl = "https://n1.junyeong.dev/api";
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [signinData, setSigninData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]); //로컬 스토리지에 저장된 목록
  const [searchClicked, setSearchClicked] = useState(false); //검색버튼이 눌렸는지 확인

  useEffect(() => {
    const storedSigninData = sessionStorage.getItem("signinData");
    if (storedSigninData) {
      setSigninData(JSON.parse(storedSigninData));
    }

    const storedSearchHistory = localStorage.getItem("searchHistory");
    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }
  }, []);

  const handlePhotoClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (searchKeyword.trim() === "") return;

    const updatedSearchHistory = [
      searchKeyword,
      ...searchHistory.filter((keyword) => keyword !== searchKeyword),
    ];
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedSearchHistory));

    fetchRecipes(searchKeyword);
    setSearchClicked(!searchClicked); //상태 토글
  };

  const fetchRecipes = (searchKeyword) => {
    const apiUrl = `${baseUrl}/recipe/list?keyword=${searchKeyword}&page=1`;

    axios
      .get(apiUrl)
      .then((response) => {
        const updatedData = response.data.map((item) => ({
          ...item,
          thumbnail_image: `${baseUrl}/${item.thumbnail_image}`,
        }));
        setData(updatedData);
        console.log(updatedData);
      })
      .catch((error) => {
        console.error("API 요청 에러:", error);
      });
  };

  const handleDeleteHistory = (keyword) => {
    const updatedSearchHistory = searchHistory.filter(
      (item) => item !== keyword
    );
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedSearchHistory));
  };

  useEffect(() => {
    if (searchKeyword.trim() !== "") {
      fetchRecipes(searchKeyword);
    }
  }, [searchKeyword]);

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
        <img src={search} onClick={handleSearch} alt="Search" />
      </div>

      {searchHistory && searchHistory.length > 0 && (
        <div>
          <div style={{ fontSize: "15px", margin: "15px 15px" }}>
            <strong>최근 검색어</strong>
          </div>
          <div className="search-history">
            {searchHistory.map((keyword, index) => (
              <div key={index} className="search-history-item">
                <span onClick={() => setSearchKeyword(keyword)}>{keyword}</span>
                <div
                  className="delete-btn"
                  onClick={() => handleDeleteHistory(keyword)}
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
