import { useNavigate } from "react-router-dom";

export const ChatList = ({data}) => {
  
  const navigate = useNavigate();
  const onClickSols = (chatId) => {
    navigate(`/Chatroom/${chatId}`);
  };

  return(
    <>
      {data.map((item,index) => (
        <div key={index} style={`display: inline-block; width: 100%; height: 48px; padding: 16px`}>
          <div 
          onClick={(e) => onClickSols(item.id)}
          style={`
            height: 29px; 
            width: 100%; 
            margin-top: 30px; 
            padding-left: 8px; 
            font-weight: bold;
            font-size: 20px;
            color: #303030;
            cursor: pointer;
            `
          }            
          >
            {item.title}
          </div>
         
        </div>
      ))}
    </>
  );
};