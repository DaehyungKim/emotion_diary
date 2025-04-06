import "./Editor.css";
import { useState, useEffect, useCallback } from "react";
import { emotionList, formatDateForInput } from "../util";
import { Button, EmotionItem } from "../component";
import { useNavigate } from "react-router-dom";

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate();
    const handleOnGoBack = () => {
        navigate(-1);
    };
    const [state, setState] = useState({
        date: new Date().getTime(),
        emotionId: 3,
        content: "",
    });
    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };
    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };
    const handleChangeEmotion = useCallback((emotionId) => {
        setState((state) => ({
            ...state,
            emotionId,
        }));
    }, []);
    const handleSubmit = () => {
        onSubmit(state);
    };
    useEffect(() => {
        if (initData) {
          setState({
            ...initData,
            date: new Date(parseInt(initData.date)).getTime(),
          });
        }
      }, [initData]);
    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={formatDateForInput(state.date)} onChange={handleChangeDate} />
                </div>
            </div>
            <div className="editor_section">
                {/* 감정 */}
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) =>
                       <EmotionItem key={it.id}{...it} alt={`emotion${it.id}`} src={it.img} onClick={handleChangeEmotion} isSelected={state.emotionId === it.id}  />
                    )}
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea placeholder="오늘은 어땠나요?" value={state.content} onChange={handleChangeContent}/>
                </div>
            </div>
            <div className="editor_section button_section">
                <Button text={"취소하기"} onClick={handleOnGoBack} />
                <Button text={"작성완료"} type={"positive"} onClick={handleSubmit} />
            </div>

        </div>
        
    );
};

export default Editor;