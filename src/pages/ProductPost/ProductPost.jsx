//공동구매 게시글 작성 페이지
import { ReactComponent as Back } from '../../assets/back.svg'
import { ReactComponent as Next } from '../../assets/Next.svg'
import InputForm from '../../components/InputForm/InputForm';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { MyContext } from '../../components/MyContextProvider/MyContextProvider';
import IngredientPost from '../../components/ProductPostForm/IngredientPost';
import RecipeIngredientsPost from '../../components/ProductPostForm/RecipeIngredientsPost';
import './ProductPost.css'
import Camera from '../../assets/camera.png'


export default function ProductPost() {
    const [selectedOption, setSelectedOption] = useState('ingredients');
    const [imageUploaded, setImageUploaded] = useState(false); // 이미지가 업로드되었는지 여부
    const [imageURL, setImageURL] = useState(''); // 이미지 URL 상태 추가
    // const [userLocation, setUserLocation] = useState(null); // 사용자 위치 정보 상태 추가

    const handleButtonClick = (option) => {
        if (selectedOption !== option) {
            setSelectedOption(option); // 선택된 옵션이 현재 선택된 옵션과 다를 때만 상태 변경
        }
    };

    const handleImageClick = () => {
        setImageUploaded(false);
        setImageURL('');
    };


    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // 선택한 파일 가져오기
        const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성
    
        reader.onloadend = () => {
            // 파일 읽기가 완료되었을 때
            setImageURL(reader.result); // 이미지 URL을 상태에 설정하여 이미지 표시
            setImageUploaded(true); // 이미지 업로드 상태를 true로 변경
        };
    
        if (file) {
            reader.readAsDataURL(file); // 파일을 읽어서 base64 형태로 변환
        }
    };


    const { postAddress, setPostAddress,
        postTitle, setPostTitle,
        postURL, setPostURL,
        postPrice, setPostPrice,
        postPeople, setPostPeople,
        postContent, setPostContent } = useContext(MyContext);

    const handleContentInputChange = (e) => {
        setPostContent(e.target.value);
    }

   
    const handlePostButtonClick = () => {
        console.log(postTitle);
        console.log(postURL);
        console.log(postPrice);
        console.log(postPeople);
        console.log(postContent);
        console.log(postAddress);
    };

    // useEffect(() => {
    //     // 위치 정보 가져오기
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const { latitude, longitude } = position.coords;
    //                 setUserLocation({ latitude, longitude });
    //                 console.log("User's current location:", { latitude, longitude });
    //             },
    //             (error) => {
    //                 console.error('Error getting user location:', error);
    //             }
    //         );
    //     } else {
    //         console.error('Geolocation is not supported by this browser.');
    //     }
    // }, []);


    return (
        <div className='product-post-container'>
            <div className="product-post-header">
                <button className='back-button'>
                    <Back />
                </button>
                <div className='product-post-text'>
                    <p className='centered-text'>공동구매 게시글 작성</p>
                </div>
            </div>
            <div className='product-post-image'>
                {!imageUploaded ? (
                    <label htmlFor="image-upload" className="image-upload-label">
                        <img src={Camera} alt="Upload Image" onClick={handleImageClick} />
                        <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                ) : (
                    <img src={imageURL} alt="Uploaded" onClick={handleImageClick} />
                )}
            </div>

            <p className='product-post-select-text'>유형 </p>
            <div className='product-post-select'>
                <div className='option-buttons'>
                    <div className='option-buttons'>
                        <button className={selectedOption === 'ingredients' ? 'active' : ''} onClick={() => handleButtonClick('ingredients')}>재료</button>
                        <button className={selectedOption === 'recipe' ? 'active' : ''} onClick={() => handleButtonClick('recipe')}>레시피 재료</button>
                    </div>

                </div>
            </div>
            <InputForm title='제목' placeholder='글 제목을 입력해주세요.' />



            {selectedOption === 'ingredients' ? <IngredientPost /> : <RecipeIngredientsPost />}

            <div className='product-post-place'>
                <p className='product-post-place-text'>거래 희망 장소 </p>
                <Link to="/select-location">
                    <button className='next-button'>
                        <Next />
                    </button>
                </Link>
            </div>
            <div className='product-post-select-place-container'>
                <input className='product-post-select-place' placeholder='거래 희망 장소를 선택하세요.' defaultValue={postAddress}></input>
            </div>

            <div>
                <div className='product-post-button-container'>
                    <button className='product-post-button' onClick={handlePostButtonClick}>올리기</button>
                </div>
            </div>
        </div>

    );
} 