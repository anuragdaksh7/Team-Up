"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";


function TeamButtonComponent(props) {
    return (
        <Link
            href = {"/Teams/"+props.id}
            className="select-none font-light border-2 mx-2 flex justify-between items-center border-[#434343] px-4 py-1 hover:bg-[#434343] duration-200  rounded-md"
        >
            {props.name}
        </Link>
    )
}


export default function ViewTeams() {
    const team = [
        {
            "name": "Team 1"
        },
        {
            "name": "Team 2"
        },
        {
            "name": "Team 3"
        },
        {
            "name": "Team 4"
        },
    ]
    const [userTeams, setUserTeams] = useState(Array());
    const getTeams = async () => {
        const response = await axios.get("/api/getTeams");
        const data = await response.data;
        const newData = data.reverse();
        setUserTeams(newData);
        // console.log(data, userTeams);
    }
    useEffect(() => {
        getTeams();
    },[])

    return (
        <div className=" mt-6 font-semibold w-full outline-none rounded-md bg-[#262626]">
            <div className="flex justify-between items-center px-4 py-2">
                <div>All Teams</div>
                <MdArrowDropDown />
            </div>

            <div className="flex flex-col gap-2 pb-2">
                {
                    (userTeams.length>=1)?userTeams.map((item, index) => {
                        return (
                            <TeamButtonComponent id={item._id} name={item.teamName} desc={item.teamDesc} key={index} />
                        )
                    }):<></>
                }

            </div>

        </div>
    )
}