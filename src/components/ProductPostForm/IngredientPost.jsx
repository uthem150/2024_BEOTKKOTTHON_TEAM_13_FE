import InputForm from '../../components/InputForm/InputForm';
import { useContext } from 'react';
import { MyContext } from '../MyContextProvider/MyContextProvider';



export default function IngredientPost() {
    const {postContent, setPostContent} = useContext(MyContext);
    
    const handleContentInputChange = (e) => {
        setPostContent(e.target.value);
    }
    return (
        <div>
            <InputForm title='URL' placeholder='URL 링크를 입력해주세요.' />
            <input className='product-post-content' placeholder='상품에 대한 설명을 넣어주세요.' onChange={handleContentInputChange} value={postContent}></input>
            <InputForm title='가격' placeholder='가격을 입력해주세요.(인당 가격)' />
            <InputForm title='인원수' placeholder='모임에 참여할 인원 수를 정해주세요.' />
        </div>

    );
}