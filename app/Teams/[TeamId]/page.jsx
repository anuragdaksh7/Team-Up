"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page({params}) {
    const router = useRouter();
    const tID = params.TeamId;
    const check = async ()=> {
        const payload = {"teamId": tID};
        console.log(payload);
        const response = await axios.post("/api/validateTeam", payload);
        const data = await response.data;
        console.log(data)
        if (!data.sucess){
            router.push("/home")
        }
    }
    useEffect(() => {
        check();
    }, [])
    return (
        <div>
            Team {params.TeamId}
        </div>
    )
}