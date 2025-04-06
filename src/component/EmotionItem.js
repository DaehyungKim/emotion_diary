import React from 'react';
import "./EmotionItem.css";

const EmotionItem = ({ id, img, name ,onClick, isSelected}) =>{
    const handleOnclick = () => {
        onClick(id);
    };
    return (
        <div className={['EmotionItem', isSelected ? `EmotionItem_on${id}` : "EmotionItem_off"].join(" ")} onClick={handleOnclick}>
            <img alt={`emotion${id}`} src={img} />
            <span>{name}</span>
        </div>
    );
};

export default React.memo(EmotionItem);