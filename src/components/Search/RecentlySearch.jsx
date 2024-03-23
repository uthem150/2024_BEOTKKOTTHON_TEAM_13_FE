import { useState } from "react";
import './Search.css'

export default function RecentlySearch() {
    const [recentlySearch, setRecentlySearch] = useState(["감자볶음", "진미채", "차돌된장찌개", "유부초밥"]);

    return (
        <>
            <div className='recently-search'>최근검색어</div>

            <div className='recently-search-items'>
                {recentlySearch.map((item, index) => (
                    <div key={index} className='recently-search-item'>
                        <div>
                            {item}
                        </div>
                        <button className='search-delete-button'>X</button>
                    </div>
                ))}
            </div>
        </>
    )

}