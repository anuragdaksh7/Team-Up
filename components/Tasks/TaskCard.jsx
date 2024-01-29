import { useState } from "react";

function calculateDaysBetweenDates(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  
    const timeDifference = Math.abs(date2.getTime() - date1.getTime());
    const daysDifference = Math.floor(timeDifference / oneDay);
  
    return daysDifference;
  }

function normalizeDate(days) {
    if (days<=0) {
        return 0;
    } else if (days<=30) {
        return 1;
    } return 2;
}

export default function TaskCard(props) {
    console.log("task", props);
    const [dueIndex, setDueIndex] = useState(0);

    const colors = {
        0: "red-500",
        1: "yellow-400",
        2: "green-500",
    }
    const temp = new Date();
    const currDay = new Date(temp.toDateString());
    const givenDay = new Date(props.due);
    const diff = calculateDaysBetweenDates(currDay, givenDay);
    
    return (
        <div className={
            `bg-${colors[normalizeDate(diff)]}`
        }>
            {colors[normalizeDate(diff)]}
        </div>
    )
}