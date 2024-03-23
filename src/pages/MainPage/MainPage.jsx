import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainPage.css';
import logo from '../../assets/logo/logo.png';
import search from '../../assets/icons/search.svg';
import mypage from '../../assets/icons/mypage.svg';
import next from '../../assets/icons/next.svg';
import plus from '../../assets/icons/plus.png';
import chef from '../../assets/icons/chef.png';
import cart from '../../assets/icons/cart.png';
import { ThrumnailRecipe } from '../../components/Recipe/ThrumnailRecipe';
import SaleProduct from '../../components/SaleProduct/SaleProduct';
import { Link, useNavigate } from 'react-router-dom';

function MainPage() {
  
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropup = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const [products, setProducts] = useState([
    {
      "image": "/user-image/post/1.png",
      "price": "4880",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "5",
      "type": "ingd",
      "title": "감자 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "1210",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "23",
      "type": "ingd",
      "title": "대파 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "1760",
      "ingredients": [
        "카레가루",
        "당근",
        "양파",
        "후추",
        "계란",
        "마늘",
        "오이",
        "호루라기"
      ],
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "45",
      "type": "r_ingd",
      "title": "샐로드 재료 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "4930",
      "ingredients": [
        "카레가루",
        "당근",
        "양파",
        "후추",
        "계란",
        "마늘",
        "오이",
        "호루라기"
      ],
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "13",
      "type": "r_ingd",
      "title": "김밥 재료 공동구매!",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "3360",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "29",
      "type": "ingd",
      "title": "마늘 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "4210",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "34",
      "type": "ingd",
      "title": "마늘 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "340",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "46",
      "type": "ingd",
      "title": "양파 한 묶음 공동구매 합니다~",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "9780",
      "ingredients": [
        "카레가루",
        "당근",
        "양파",
        "후추",
        "계란",
        "마늘",
        "오이",
        "호루라기"
      ],
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "8",
      "type": "r_ingd",
      "title": "김밥 재료 공동구매!",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "7850",
      "ingredients": [
        "카레가루",
        "당근",
        "양파",
        "후추",
        "계란",
        "마늘",
        "오이",
        "호루라기"
      ],
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "9",
      "type": "r_ingd",
      "title": "오이소박이 요리 재료 공동구매 진행합니다!",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "2630",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "49",
      "type": "ingd",
      "title": "마늘 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "3920",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "10",
      "type": "ingd",
      "title": "감자 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "2520",
      "ingredients": [
        "카레가루",
        "당근",
        "양파",
        "후추",
        "계란",
        "마늘",
        "오이",
        "호루라기"
      ],
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "35",
      "type": "r_ingd",
      "title": "샐로드 재료 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "8400",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "43",
      "type": "ingd",
      "title": "대파 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "9440",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "22",
      "type": "ingd",
      "title": "고구마 공동구매 합니다!",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "610",
      "ingredients": [
        "카레가루",
        "당근",
        "양파",
        "후추",
        "계란",
        "마늘",
        "오이",
        "호루라기"
      ],
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "16",
      "type": "r_ingd",
      "title": "카레 재료 공둥구매 진행합니다!",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "8760",
      "ingredients": [
        "카레가루",
        "당근",
        "양파",
        "후추",
        "계란",
        "마늘",
        "오이",
        "호루라기"
      ],
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "42",
      "type": "r_ingd",
      "title": "제육볶음 재료 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "700",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "10",
      "type": "ingd",
      "title": "감자 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "1980",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "17",
      "type": "ingd",
      "title": "고구마 공동구매 합니다!",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "920",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "4",
      "type": "ingd",
      "title": "마늘 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    },
    {
      "image": "/user-image/post/1.png",
      "price": "50",
      "location": {
        "latiude": "126.932922",
        "longitude": "36.772158"
      },
      "id": "18",
      "type": "ingd",
      "title": "대파 공동구매 합니다.",
      "user": {
        "nickname": "윤준영",
        "rating": "89"
      }
    }
  ]);

  useEffect(() => {
    // API 엔드포인트 URL 설정
    const apiUrl = 'http://20.39.188.154:8080/recipe/brief';

    axios.get(apiUrl)
      .then((response) => {
        const updatedData = response.data.map(item => ({
          ...item,
          thumbnail_image: `http://20.39.188.154${item.thumbnail_image}`
        }));
        setData(updatedData);
      })
      .catch((error) => {
        console.error('API 요청 에러:', error);
      });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://20.39.188.154:8080/post/list', {
  //         params: {
  //           type: 'all',
  //           bcode: '',
  //           keyword: '',
  //           page: 1
  //         }
  //       });
  //       setProducts(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className='mainpage-container'>
      <div className='header-icon'>
        <img src={logo} alt='logo' className='logo-img' />

        <div className='right-header' >
          <Link to='/search'>
            <img src={search} alt='search' />
          </Link>
          <Link to='/scrap'>
            <img src={mypage} alt='mypage' />
          </Link>
        </div>
      </div>

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
          <div className='recipe-text'>
            <div className='grd-name'> 공구 중인 식품 </div>
            <Link to='/explore' className='a'>
              <div className='more' > 더보기 <img src={next} alt='next' /> </div>
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
              <Link to='/recipeReg' className='link-style'><img src={chef} alt='chef'/> 레시피 </Link>
              <Link to='/product-post' className='link-style' style={{marginTop:'8px'}}><img src={cart} alt='cart'/> 공동구매 </Link>
            </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
