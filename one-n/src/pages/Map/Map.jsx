import React, { useEffect, useState, useContext } from 'react';
import SaleProduct from '../../components/SaleProduct/SaleProduct';
import './Map.css'
import LocationImage from '../../assets/Marker.svg'
import SetLocation from '../../assets/setlocation.png'
import axios from 'axios';
import { NavBar } from '../../components/NavBar/NavBar';
import { MyContext } from '../../components/MyContextProvider/MyContextProvider';


const Map = () => {
    const baseUrl = "https://n1.junyeong.dev/api";
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [marker, setMarker] = useState(null);
    const [myLocation, setMyLocation] = useState(false);
    const [page, setPage] = useState(1);
    const [bottomPanel, setBottomPanel] = useState(null);
    

    const moveToUserLocation = () => {
        if (myLocation) {
            setMyLocation(false);
        }
        else {
            setMyLocation(true);
        }

    };

    const getFetchData = () => {
        const storedBcode = sessionStorage.getItem('myBcode');
        console.log("요청을 보냈습니다");
        const url = `${baseUrl}/post/list?type=all&bcode=${storedBcode}&keyword=&page=${page}`;
        console.log(url);
        fetch(url)
            .then((res) => res.json())
            .then((product) => setProducts((prev) => [...prev, ...product]));
    };

    useEffect(() => getFetchData(), [page]);


    useEffect(() => {
        const bottomPanelElement = document.querySelector(".bottom-panel");
        setBottomPanel(bottomPanelElement);
    }, []);
    
    useEffect(() => {
        if (!bottomPanel) return;
    
        bottomPanel.addEventListener("scroll", onScrollBottomPanel);
        return () => bottomPanel.removeEventListener("scroll", onScrollBottomPanel);
    }, [bottomPanel, page]);


    const onScrollBottomPanel = () => {
        const bottomPanel = document.querySelector(".bottom-panel");
        const scrollTop = bottomPanel.scrollTop;
        const clientHeight = bottomPanel.clientHeight;
        const scrollHeight = bottomPanel.scrollHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            // bottom panel이 스크롤된 상태에서 스크롤이 끝까지 도달하면 새로운 페이지 로드
            setPage(prevPage => prevPage + 1);
        }
    };


    useEffect(() => {
        // 카카오 지도 API 불러오기
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
        document.head.appendChild(script);

        console.log('navi', window.navigator.geolocation)

        script.onload = () => {
            // 카카오 지도 API 초기화
            window.kakao.maps.load(() => {
                const container = document.getElementById('kakao-map');
                const options = {
                    center: new window.kakao.maps.LatLng(37.506502, 127.053617), // 서울시 강남구 위치를 기준으로 지도 초기화
                    level: 3, // 지도 확대 레벨

                };
                const map = new window.kakao.maps.Map(container, options);

                // 마커 추가
                products.forEach(markerData => {
                    console.log(markerData);
                    console.log(markerData.location.latitude, markerData.location.longitude);
                    const position = new window.kakao.maps.LatLng(markerData.location.latiude, markerData.location.longitude);

                    // 원의 옵션 설정
                    const circleOptions = {
                        center: position, // 중심 좌표 설정
                        radius: 6, // 파란색 동그라미의 반지름 설정
                        strokeWeight: 0, // 테두리 두께 설정
                        fillColor: '#FFDC25', // 채우기 색상 설정
                        fillOpacity: 1 // 채우기 투명도 설정
                    };

                    // 원 생성
                    const circle = new window.kakao.maps.Circle(circleOptions);

                    // 지도에 원 추가
                    circle.setMap(map);

                    window.kakao.maps.event.addListener(circle, 'click', () => {
                        setSelectedProduct(markerData);

                        if (marker) {
                            console.log("dfdfdf");
                            marker.setMap(null);
                        }
                        console.log("눌림");


                        const markerImage = new window.kakao.maps.MarkerImage(
                            LocationImage, // 마커 이미지 경로
                            new window.kakao.maps.Size(33, 40), // 마커 이미지 크기
                        );

                        const newMarker = new window.kakao.maps.Marker({
                            position: position,
                            map: map,
                            image: markerImage
                        });

                        // 새로운 마커를 markers 상태에 추가
                        setMarker(newMarker);

                        // 선택한 상품을 리스트의 맨 앞으로 이동
                        setProducts(prevProducts => {
                            const updatedProducts = prevProducts.filter(product => product !== markerData);
                            return [markerData, ...updatedProducts];
                        });
                    });
                });


                // 사용자의 현재 위치 가져오기
                if (window !== undefined) {
                    navigator.geolocation.getCurrentPosition(position => {
                        const userPosition = new window.kakao.maps.LatLng(
                            position.coords.latitude,
                            position.coords.longitude
                        );

                        // 파란색 동그라미 스타일 설정
                        const circle1 = new window.kakao.maps.Circle({
                            center: userPosition,
                            radius: 6, // 파란색 동그라미의 반지름 설정
                            strokeWeight: 0, // 테두리 두께 설정
                            fillColor: '#0085FF', // 채우기 색상 설정
                            fillOpacity: 1, // 채우기 투명도 설정
                            shadow: {
                                color: "#000", // 그림자 색상
                                blur: 5, // 그림자의 흐림 정도
                                offsetX: 3, // 그림자의 X축 위치
                                offsetY: 3, // 그림자의 Y축 위치
                                opacity: 0.25 // 그림자의 투명도
                            }
                        });

                        const circle2 = new window.kakao.maps.Circle({
                            center: userPosition,
                            radius: 12, // 두 번째 원의 반지름 설정
                            strokeWeight: 0, // 테두리 두께 설정
                            fillColor: '#007bff', // 채우기 색상 설정
                            fillOpacity: 0.2 // 채우기 투명도 설정
                        });

                        // 두 개의 원을 지도에 추가
                        circle1.setMap(map);
                        circle2.setMap(map);

                        // 지도 중심을 사용자의 현재 위치로 설정
                        map.setCenter(userPosition);
                    });
                } else {
                    console.log('not work')
                }
            });
        };

        return () => {
            // 컴포넌트가 언마운트될 때 스크립트 제거
            document.head.removeChild(script);

        };
    }, [myLocation]);




    useEffect(() => {
        // 선택된 상품이 변경될 때마다 해당 상품을 리스트의 맨 앞으로 이동
        if (selectedProduct) {
            setProducts(prevProducts => {
                const updatedProducts = prevProducts.filter(product => product !== selectedProduct);
                return [selectedProduct, ...updatedProducts];
            });
        }
    }, [selectedProduct]);

    return (
        <>
            <button className='set-location-button' onClick={moveToUserLocation}>
                <img src={SetLocation} alt='SetLocation' className='set-location-image' />
            </button>
            <div id="kakao-map" style={{ width: '100%', height: '70vh' }} />

            <div className="bottom-panel">
                <div className='map-products'>
                    {products.map((product, index) => (
                        <SaleProduct key={index} product={product} />
                    ))}
                </div>
                <NavBar />

            </div>

        </>
    );
};

export default Map;
