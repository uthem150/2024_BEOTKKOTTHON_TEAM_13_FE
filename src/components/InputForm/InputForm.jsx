import './InputForm.css'
import { useContext } from 'react';
import { MyContext } from '../MyContextProvider/MyContextProvider';

export default function InputForm(props) {
    const {
        postTitle, setPostTitle, 
        postURL, setPostURL, 
        postPrice, setPostPrice, 
        postPeople, setPostPeople
    } = useContext(MyContext);

    let value = '';
    if (props.title === '제목') {
        value = postTitle;
    } else if (props.title === 'URL') {
        value = postURL;
    } else if (props.title === '가격') {
        value = postPrice;
    } else if (props.title === '인원수') {
        value = postPeople;
    }
    
    const handleInputChange = (e) => {
        if (props.title === '제목') {
            setPostTitle(e.target.value);
        } else if (props.title === 'URL') {
            setPostURL(e.target.value);
        } else if (props.title === '가격') {
            setPostPrice(e.target.value);
        } else if (props.title === '인원수') {
            setPostPeople(e.target.value);
        }
    }
    
    return (
        <div className='proudct-post-inputform'>
            <p className='product-post-title'>{props.title}</p>
            <input 
                className='product-post-input' 
                placeholder={props.placeholder}
                value={value}
                onChange={handleInputChange}
            />
        </div>
    );
}
