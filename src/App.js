import React, { useReducer, useRef, useState, useEffect } from 'react';
import './App.css';
import { Home, New, Edit, Diary } from './pages';
import { Routes, Route } from 'react-router-dom';

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":{
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      const newState = state.map((it) => String(it.id) === String(action.data.id) ? { ...action.data } : it);
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
      const newState = state.filter((it) => String(it.id) !== String(action.targetId));
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "INIT":
      return action.data;
    default:
      return state;
  }
}


function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const idRef = useRef(1);
  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        date: new Date(date).getTime(),
        content,
        emotionId,
      }
    });
  };
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      }
    });
  };
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };
  useEffect(() => {
    const rawData = localStorage.getItem("diary");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    localData.sort((a, b) => Number(b.id) - Number(a.id));
    idRef.current = localData[0].id + 1;
    dispatch({type: "INIT",data: localData,});
    setIsDataLoaded(true);
  }, []);
  if (!isDataLoaded) {
    return <div className="App">로딩중...</div>;
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
