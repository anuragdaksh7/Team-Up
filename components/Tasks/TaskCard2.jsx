import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Context } from "@/app/Teams/[TeamId]/page";
import { toast } from "sonner"

function calculateDaysBetweenDates(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

    const timeDifference = (date2.getTime() - date1.getTime());
    const daysDifference = Math.floor(timeDifference / oneDay);

    return daysDifference;
}

function normalizeDate(days) {
    if (days <= 10) {
        return 0;
    } else if (days <= 30) {
        return 1;
    } return 2;
}


export default function TaskCard2(props) {
    const [elementUpdate, setElementUpdate] = useContext(Context);
    // console.log("task", props);
    // console.log(elementUpdate)
    const colors = {
        0: "red-500",
        1: "yellow-400",
        2: "green-500",
        3: "blue-500"
    }

    const [status, setStatus] = useState(props.status)
    const [del, setDel] = useState((props.deletedBy) ? true : false)

    const temp = new Date();
    const currDay = new Date(temp.toDateString());
    const givenDay = new Date(props.due);
    const diff = calculateDaysBetweenDates(currDay, givenDay);

    const markDone = async () => {
        const payload = {
            _id: props.idd
        }
        const response = await axios.post("/api/TaskControls/ModifyTask", payload);
        const data = await response.data;
        if (data.success) {
            // status = (status == "true")?"false":"true";
            // window.location.reload();
            // props.fetcher();
            setElementUpdate(prev => prev + 1);
            setStatus("true");
            setDel(true)
        } else {
            console.log(data);
        }
    }

    const deleteTask = async () => {
        const payload = {
            _id: props.idd
        }
        const response = await axios.post("/api/TaskControls/DeleteTask", payload);
        const data = await response.data;
        if (data.success) {
            // window.location.reload();
            setElementUpdate(prev => prev + 1);
        } else {
            console.log(data);
        }
    }

    return (
        <div className={
            ` select-none font-mono text-black rounded-md px-4 py-2 bg-gray-200 hover:bg-white duration-150`
        }>
            <div className=" flex justify-between">
                <h1 className={
                    ` capitalize px-1 rounded-md font-semibold bg-${(status == "true") ? colors[3] : colors[normalizeDate(diff)]}`
                }>{props.title}</h1>
                <div className="flex gap-2 ">
                    {(status == "true") ? <p>Done</p> : <></>}
                    {(status == "false") ? <button onClick={markDone}>Mark Done</button> : <></>}
                    <button onClick={
                        () => {
                            deleteTask();
                            toast("Task Deleted", {
                                description: props.title + " has been deleted successfully",
                              })
                        }
                    }><MdDeleteOutline /></button>
                </div>
            </div>
            <div className={" flex justify-between"}>
                {(status == "true") ? <></> : (diff >= 0) ? <p>Due {props.due.toLocaleDateString()} ({diff} days Left)</p> : <p className="text-red-600">Due date {props.due.toLocaleDateString()} ({-diff} days ago)</p>}
                <p>Created By <Link className="underline text-blue-600" href={"/Users/" + props.creatorId}>{props.createdBy}</Link></p>
                {
                    (del) ? <p>Closed By <Link className="underline text-blue-600" href={"/Users/" + props.deleterId}>{props.deletedBy}</Link></p> : <></>
                }
            </div>
        </div>
    )
}