import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [postAddress, setPostAddress] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
    const [postTitle, setPostTitle] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
    const [postURL, setPostURL] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
    const [postContent, setPostContent] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
    const [postPrice, setPostPrice] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
    const [postPeople, setPostPeople] = useState(''); // 기본값으로 빈 문자열을 설정합니다.

    return (
        <MyContext.Provider value={{
            postAddress, setPostAddress, 
            postTitle, setPostTitle, 
            postURL, setPostURL, 
            postPrice, setPostPrice, 
            postPeople, setPostPeople,
            postContent, setPostContent
        }}>
            {children}
        </MyContext.Provider>
    );
};