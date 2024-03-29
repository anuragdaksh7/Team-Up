import Link from "next/link";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

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

    const colors = {
        0: "red-500",
        1: "yellow-400",
        2: "green-500",
        3: "blue-500"
    }
    const temp = new Date();
    const currDay = new Date(temp.toDateString());
    const givenDay = new Date(props.due);
    const diff = calculateDaysBetweenDates(currDay, givenDay);
    
    return (
        <div className={
            `font-mono rounded-md px-4 py-2 bg-${(props.status=="true")?colors[3]:colors[normalizeDate(diff)]}`
        }>
            <div className=" flex justify-between">
                <h1>{props.title}</h1>
                <div className="flex gap-2">
                    {(props.status=="true")?<p>Done</p>:<></>}
                    {(props.status=="false")?<button>Mark Done</button>:<></>}
                    <button><MdDeleteOutline /></button>
                </div>
            </div>
            <div className=" flex justify-between">
                {(props.status=="true")?<></>:<p>Due {props.due.toLocaleDateString()}</p>}
                <Link href={"/Users/"+props.creatorId}>Created by {props.createdBy}</Link>
            </div>
        </div>
    )
}