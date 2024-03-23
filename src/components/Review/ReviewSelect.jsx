import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import '../../pages/ChatRoom/ChatRoom.css';

import sobad from '../../assets/icons/sobad.png'
import bad from '../../assets/icons/bad.png'
import soso from '../../assets/icons/soso.png'
import good from '../../assets/icons/good.png'
import verygood from '../../assets/icons/verygood.png'


export const ReviewSelect = () => {
    const [level, setLevel] = useState(0);
    
    // 현재 슬라이더의 위치에 따라 각 점의 색상을 결정
    const getPointColor = (pointIndex) => {
        return level >= pointIndex / 4 ? '#FFDC25' : '#D9D9D9';
    };

    return (
        <>
        <div style={{ marginLeft:'18px', marginTop: '20px', marginBottom:'12px', width:'85%' }}>
            {/* 수평 슬라이더 */}
            <ReactSlider
                trackClassName='slider'
                min={0} 
                max={1} 
                step={0.25} 
                value={level}
                onChange={(value,index) => {
                    setLevel(value);
                }}
                // 슬라이더 값이 변경된 후에 각 점의 색상을 업데이트
                onAfterChange={() => {}}
                renderThumb={(props, state) => (
                    <div {...props} style={{ 
                        ...props.style,
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#FFDC25',
                        marginTop: '-5px',
                        cursor: 'pointer'
                    }}/>
                )}
                renderTrack={(props, state) => (
                    <div {...props} style={{ 
                        ...props.style,
                        height: '4px'
                    }} />
                )}
            />
            {/* 수평 슬라이더의 step 위치에 점 표시 */}
            <div className='points' style={{display: 'flex', justifyContent:'space-between'}}>
                {[0, 1, 2, 3, 4].map((pointIndex) => (
                   <div key={pointIndex} className='point' style={{
                    ...pointStyle,
                    backgroundColor: getPointColor(pointIndex)
               }} />
                ))}
            </div>
        </div>

        <div style={{display:'flex', fontSize:'12px', gap:'10px', marginBottom: '8px'}}>
                <div style={{ display:'flex', flexDirection: 'column', alignItems:'center' }}>
                    <img src={sobad} width={20}/> 별로에요 
                </div>
                <div style={{ display:'flex', flexDirection: 'column', alignItems:'center' }}>
                    <img src={bad} width={20}/> 아쉬워요 
                </div>
                <div style={{ display:'flex', flexDirection: 'column', alignItems:'center', marginLeft:'-2px' }}>
                    <img src={soso} width={20}/> 괜찮아요 
                </div>
                <div style={{ display:'flex', flexDirection: 'column', alignItems:'center',marginLeft:'4px' }}>
                    <img src={good} width={20}/> 좋아요 
                </div>
                <div style={{ display:'flex', flexDirection: 'column', alignItems:'center', marginLeft:'5px' }}>
                    <img src={verygood} width={20}/> 최고에요 
                </div>
                
            </div>
        </>        
    );
}

const pointStyle ={
    width: '8px',
    height: '8px',
    marginTop:'-1px',
    borderRadius: '50px',
 }
  