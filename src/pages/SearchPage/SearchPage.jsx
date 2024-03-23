import React, { useState } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import './SearchPage.css';
import RecentlySearch from '../../components/Search/RecentlySearch';
import IngredientSearch from '../../components/Search/IngredientSearch';
import axios from 'axios';

export default function SearchPage() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchedData, setSearchedData] = useState(null); // 검색 결과를 저장할 상태

    const handleSearch = () => {
        // 검색어가 비어있으면 요청을 보내지 않음
        if (!searchKeyword.trim()) return;

        const url = 'http://20.39.188.154:8080/post/list';
        const params = {
            type: 'all',
            bcode: '',
            keyword: searchKeyword.trim(),
            page: 1
        };

        console.log(params.keyword);

        axios.get(url, { params })
            .then(response => {
                // 요청 성공 시 검색 결과를 상태에 저장
                
                setSearchedData(response.data);
            })
            .catch(error => {
                // 요청 실패 시 에러 처리
                console.error('검색 요청 실패:', error);
            });
    };

    // 검색 버튼 클릭 시 검색 결과가 있으면 IngredientSearch로, 없으면 RecentlySearch로 변경
    const searchContent = searchedData ? (
        <IngredientSearch product={searchedData} />
    ) : (
        <RecentlySearch />
    );

    return (
        <div className='search-container'>
            <div className='input-container'>
                <input
                    className='product-search'
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <img
                    className='search-icon'
                    src={searchIcon}
                    alt='search'
                    onClick={handleSearch}
                />
            </div>
            {searchContent}
        </div>
    );
}
