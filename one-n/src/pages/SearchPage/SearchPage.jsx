import React, { useState, useEffect, useContext } from "react";
import searchIcon from "../../assets/icons/search.svg";
import "./SearchPage.css";
import RecentlySearch from "../../components/Search/RecentlySearch";
import IngredientSearch from "../../components/Search/IngredientSearch";
import axios from "axios";
import { NavBar } from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Back } from "../../assets/back.svg";

export default function SearchPage() {
  const baseUrl = "https://n1.junyeong.dev/api";
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchedData, setSearchedData] = useState(null); // 검색 결과를 저장할 상태
  const [recentlySearch, setRecentlySearch] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 세션 스토리지에서 최근 검색어를 가져옴
    const storedSearch = sessionStorage.getItem("recentlySearch");
    if (storedSearch) {
      setRecentlySearch(JSON.parse(storedSearch));
    }
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  const handleBackClick = () => {
    navigate(-1); // Go back one step
  };

  const handleSearch = () => {
    const storedBcode = sessionStorage.getItem("myBcode");

    // 검색어가 비어있으면 요청을 보내지 않음
    if (!searchKeyword.trim()) return;

    const url = `${baseUrl}/post/list`;
    const params = {
      type: "all",
      bcode: storedBcode,
      keyword: searchKeyword.trim(),
      page: 1,
    };

    console.log(params.bcode);
    console.log(url);

    axios
      .get(url, { params })
      .then((response) => {
        // 요청 성공 시 검색 결과를 상태에 저장
        setSearchedData(response.data);

        // 세션 스토리지에 검색어 저장
        const updatedSearch = [
          searchKeyword.trim(),
          ...recentlySearch.slice(0, 4),
        ];
        sessionStorage.setItem("recentlySearch", JSON.stringify(updatedSearch));
      })
      .catch((error) => {
        // 요청 실패 시 에러 처리
        console.error("검색 요청 실패:", error);
      });
  };

  // 검색 버튼 클릭 시 검색 결과가 있으면 IngredientSearch로, 없으면 RecentlySearch로 변경
  const searchContent = searchedData ? (
    <IngredientSearch product={searchedData} />
  ) : (
    <RecentlySearch recentlySearch={recentlySearch} />
  );

  return (
    <div className="search-container">
      <div className="search-back-button-container">
        <button className="search-back-button" onClick={handleBackClick}>
          <Back />
        </button>
      </div>
      <div className="input-container">
        <input
          className="product-search"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <img
          className="search-icon"
          src={searchIcon}
          alt="search"
          onClick={handleSearch}
        />
      </div>
      {searchContent}
      <NavBar />
    </div>
  );
}
