"use client"
import Nav from "@/components/Nav";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const router = useRouter();
    const tID = params.TeamId;
    const [permission, setPermission] = useState(false);
    const check = async () => {
        const payload = { "teamId": tID };
        console.log(payload);
        const response = await axios.post("/api/validateTeam", payload);
        const data = await response.data;
        console.log(data)
        if (!data.sucess) {
            router.push("/home")
        }
        else {
            setPermission(true);
        }
    }
    useEffect(() => {
        check();
    }, [])

    const generateLink = async () => {
        const payload = { "teamId": params.TeamId };
        const response = await axios.post("/api/getLeader", payload);
        const data = await response.data;
        console.log(data)
        if (data.sucess) {
            console.log("leader")
        }
        else {
            alert("Only Team Leader can generate invite links!!")
        }
        console.log("sfsdfjkgnbkgjld");
    }

    return (
        <div>
            <Nav />
            <div className=" flex justify-between px-4">
                {
                    (permission) ? <div>Team {params.TeamId}</div> : <div>thyfgcjf</div>
                }
                <button onClick={generateLink} className=" bg-blue-600 px-4 py-2 rounded-md">
                    Invite friends
                </button>
            </div>
        </div>
    )
}