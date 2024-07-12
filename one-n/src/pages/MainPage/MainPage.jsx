import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './MainPage.css';
import next from '../../assets/icons/next.svg';
import plus from '../../assets/icons/plus.png';
import chef from '../../assets/icons/chef.png';
import cart from '../../assets/icons/cart.png';
import { ThrumnailRecipe } from '../../components/Recipe/ThrumnailRecipe';
import SaleProduct from '../../components/SaleProduct/SaleProduct';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { MyContext } from '../../components/MyContextProvider/MyContextProvider';
import Signup from '../../components/Sign/Signup';



function MainPage() {

  const baseUrl="https://n1.junyeong.dev/api";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [bcode, setBcode] = useState();
  const [userLocation, setUserLocation] = useState();
  const { myBcode, setMyBcode } = useContext(MyContext);

  // 회원가입 모달창
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const [signinData, setSigninData] = useState(null);

  useEffect(() => {
    const storedSigninData = sessionStorage.getItem('signinData');
    if (!storedSigninData) {
      // 세션 스토리지에 저장된 값이 없는 경우에만 모달창
      setIsSignupModalOpen(true);
    } else {
      setSigninData(JSON.parse(storedSigninData));
      console.log('로그인 정보:', JSON.parse(storedSigninData));
    }
  }, []);

  const toggleDropup = () => {
    setDropdownVisible(!dropdownVisible);
  };




  useEffect(() => {
    // API 엔드포인트 URL 설정
    const apiUrl = `${baseUrl}/recipe/brief`;

    axios.get(apiUrl)
      .then((response) => {
        const updatedData = response.data.map(item => ({
          ...item,
          thumbnail_image: `${baseUrl}/recipe/brief/${item.thumbnail_image}`
        }));
        setData(updatedData);
      })
      .catch((error) => {
        console.error('API 요청 에러:', error);
      });
  }, []);



  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onScroll = () => {
    console.log("실행됨");
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    console.log(scrollTop);
    console.log(clientHeight);
    console.log(scrollHeight);

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("스크롤 끝");
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // 위치 정보 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserLocation({ latitude, longitude });
          console.log("User's current location:", { latitude, longitude });

          // Kakao API로 지역 코드 요청 보내기
          const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;
          axios.get(url, {
            headers: {
              'Authorization': `KakaoAK 6de009b450e245b534db1c733cb4f4ac`
            }
          })
            .then(response => {
              console.log('Region codes:', response.data);
              const bCode = response.data.documents.find(doc => doc.region_type === 'B').code;
              const shortBCode = bCode.substring(0, 5); // 앞에서 5자리만 추출
              console.log('앞 5자리 B 타입의 코드:', shortBCode);
              setBcode(shortBCode);
              setMyBcode(shortBCode);
              sessionStorage.setItem('myBcode', shortBCode);

              // 여기서 fetch 함수를 호출하여 요청 보내도록 수정
              fetchProducts(shortBCode);
            })
            .catch(error => {
              console.error('Error fetching region codes:', error);
            });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [page]);

  // fetchProducts 함수 정의
  const fetchProducts = (bCode) => {
    const url = `${baseUrl}/post/list?type=all&bcode=${bCode}&keyword=&page=${page}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((product) => setProducts((prev) => [...prev, ...product]))
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };




  return (
    <div className='mainpage-container'>
      {/* Signup 모달 */}
      {/* {isSignupModalOpen && <Signup />} */}


      <div className='header-container'><Header /></div>


        <div className='main-body'>
          <div className='title'>
            <div className='recipe-text'>
              <div className='recipe-name'> 레시피 둘러보기 </div>
              <Link to='/explore' className='a'>
                <div className='more'> 더보기 <img src={next} alt='next' /> </div>
              </Link>
            </div>

            <ThrumnailRecipe data={data} />
          </div>

          <div className='gredient'>
            <div className='selling-product-text'>
              <div className='grd-name'>공구 중인 식품 </div>

              <Link to='/more-product' className='more-product-link-style' >
                <div className='more'> 더보기 <img src={next} alt='next' /> </div>
              </Link>
            </div>

            <div className='sale-gredient-container'>
              {products.length > 0 && (
                products.map((product, index) => (
                  <SaleProduct key={index} product={product} />
                ))
              )}
            </div>
          </div>

          <img src={plus} className='plus' onClick={toggleDropup} />
          {dropdownVisible && (
            <div className='dropup'>
              <Link to='/recipeReg' className='link-style'><img src={chef} alt='chef' /> 레시피 </Link>
              <Link to='/product-post' className='link-style' style={{ marginTop: '8px' }}><img src={cart} alt='cart' /> 공동구매 </Link>
            </div>
          )}
        </div>
      </div>
    
  );
}

export default MainPage;
