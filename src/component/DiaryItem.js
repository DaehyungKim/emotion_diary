import "./DiaryItem.css";
import { useNavigate } from "react-router-dom";
import { emotionList, getFormattedDate } from "../util";
import { Button } from "./index";
import React from "react";


const DiaryItem = ({ id, date, content, emotionId }) => {
    const emotionItem = emotionList.find((it) => it.id === emotionId);
    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/diary/${id}`);
    };
    const goEdit = () => {
        navigate(`/edit/${id}`);
    };
    return (
    <div className="DiaryItem">
        <div onClick={goDetail} className={["img_section", `img_section_${emotionId}`].join(" ")}>
            <img alt={`emotion${emotionId}`} src={emotionItem.img} />
        </div>
        <div onClick={goDetail} className="info_section">
            <div className="date_wrapper">
            {getFormattedDate(new Date(Number(date)))}
            </div>
            <div className="content_wrapper">{content.slice(0, 25)}</div>
        </div>
        <div className="button_section">
            <Button onClick={goEdit} text={"수정하기"}/>
        </div>
    </div>
    );    
}
export default React.memo(DiaryItem);