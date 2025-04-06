import emotion1 from "./img/emotion1.png";
import emotion2 from "./img/emotion2.png";
import emotion3 from "./img/emotion3.png";
import emotion4 from "./img/emotion4.png";
import emotion5 from "./img/emotion5.png";



export const emotionList = [
    {
        id: 1,
        name: "완전좋음",
        img: emotion1,
    },
    {
        id: 2,
        name: "좋음",
        img: emotion2,
    },
    {
        id: 3,
        name: "그럭저럭",
        img: emotion3,
    },
    {
        id: 4,
        name: "나쁨",
        img: emotion4,
    },
    {
        id: 5,
        name: "끔찍함",
        img: emotion5,
    },
];

export const getFormattedDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();
    if (month < 10) {
        month = `0${month}`;
    }
    if (date < 10) {
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
};

export const formatDateForInput = (timestamp) => {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getMonthRangeByDate = (date) => {
    const beginTimeStamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const endTimeStamp = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime();
    return {beginTimeStamp, endTimeStamp};
};

export const setPageTitle = (title) => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerText = title;
};