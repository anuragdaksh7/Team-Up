"use client"

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const TeamLeadCard = (props) => {
    return (
        <div className="flex justify-between select-none bg-[#232323] px-4 py-1 rounded-md">
            <p className=" capitalize font-semibold">{props.teamName}</p>
            <p className=" text-green-500">Leader</p>
        </div>
    )
}

const TeamMemberCard = (props) => {
    return (
        <div className="flex justify-between select-none bg-[#232323] px-4 py-1 rounded-md">
            <p className=" capitalize font-semibold">{props.teamName}</p>
            <p className=" text-orange-500">Member</p>
        </div>
    )
}

function TeamDisplayCard ( props ) {
    console.log(props.teams,"h");
    return (
        <div className="flex flex-col gap-2 py-2">
            {
                props.teams.map((val) => {
                    return (val[1])?<TeamLeadCard teamName={val[0]} />:<TeamMemberCard teamName={val[0]} />
                })
            }
        </div>
    )
}


export default function UserPage( props ) {

    const [visible, setVisible] = useState(false);
    const [currStatus, setCurrStatus] = useState(props.status);
    const changeActivityStatus = async (status) => {
        console.log(status);
        const response = await axios.post("/api/UserControls/ChangeStatus", {status: status});
        const data = await response.data;
        if (data.success) {
            alert("Status Changed!");
            setCurrStatus(status);
            setVisible(false);
        } else {
            alert(data.error);
        }
    }

    console.log("user",props);
    const colorObj = {
        "active" : "#00db1d",
        "busy" : "#e60004",
        "offline" : "#242424",
        "away" : "#c27e00"
    }
    const currColor = colorObj[props.status];
    console.log(currColor);
    return (
        <div className=" py-8 px-16 w-full">
            <div className=" border-b-2 flex justify-between items-baseline">
                <div className="flex gap-2 items-center">
                    <h1 className="font-bold text-2xl">{props.username}</h1>
                    <div className={
                        `w-[20px] h-[20px] scale-50 rounded-full bg-[${colorObj[currStatus]}]`
                    }></div>
                    {
                        (props.self)?
                        <button className="text-sm bg-blue-500 px-[6px] rounded-full" onClick={(e)=>setVisible(true)}>change status?</button>
                        :<></>
                    }
                </div>
                <Link href={`mailto:${props.email}`} className="font-light text-sm text-blue-400">{props.email}</Link>
            </div>
            <div className={`${(visible)?"fixed":"hidden"} border border-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#232323] px-8 py-4 rounded-md`}>
                <div className="flex justify-between gap-20 items-baseline">
                    <p className=" text-2xl font-bold">Change Status</p>
                    <button onClick={(e)=>setVisible(false)} className=" text-4xl hover:bg-[#323232] rounded-full px-2 flex items-center ">×</button>
                </div>
                <div className="w-full py-2">
                    <div className="flex flex-col gap-2">
                        <button onClick={(e)=>changeActivityStatus("active")} className="flex items-center justify-between px-2 py-1 bg-[#333] rounded-md">
                            <p className="font-light ">Active</p>
                            <div className={
                                `w-[20px] h-[20px] scale-50 rounded-full bg-[#00db1d]`
                            }></div>
                        </button>
                        <button onClick={(e)=>changeActivityStatus("busy")} className="flex items-center justify-between px-2 py-1 bg-[#333] rounded-md">
                            <p className="font-light ">Busy</p>
                            <div className={
                                `w-[20px] h-[20px] scale-50 rounded-full bg-[#e60004]`
                            }></div>
                        </button>
                        <button onClick={(e)=>changeActivityStatus("offline")} className="flex items-center justify-between px-2 py-1 bg-[#333] rounded-md">
                            <p className="font-light ">Offline</p>
                            <div className={
                                `w-[20px] h-[20px] scale-50 rounded-full bg-[#242424]`
                            }></div>
                        </button>
                        <button onClick={(e)=>changeActivityStatus("away")} className="flex items-center justify-between px-2 py-1 bg-[#333] rounded-md">
                            <p className="font-light ">Away</p>
                            <div className={
                                `w-[20px] h-[20px] scale-50 rounded-full bg-[#c27e00]`
                            }></div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="py-4">
                <h1 className="text-lg font-semibold">Teams Joined</h1>
                <TeamDisplayCard teams = {props.teams}/>
            </div>

        </div>
    )
}