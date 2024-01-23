"use client"
import Nav from "@/components/Nav";
import axios from "axios";
import { useState } from "react"


export default function Page() {
    const [code, setCode] = useState("");
    const [joined, setJoined] = useState(false);
    const join = async (e) => {
        e.preventDefault();
        const payload = { invite: code };
        const response = await axios.post("/api/joinTeam", payload);
        const data = await response.data;
        setJoined(data.success);
        console.log(data);
    }


    return (
        <>
            <Nav />
            <div className="flex justify-center items-center h-[70lvh]">
                <form className=" px-6 py-4 flex flex-col gap-4 bg-[#222] rounded-md">
                    <h1>Join The Team {}</h1>
                    <div>
                        <input className=" bg-[#222]" type="text" value={code} placeholder="enter code" onChange={(e) => setCode(e.target.value)} />
                    </div>
                    <button onClick={join}>Join Team</button>
                </form>
                {
                    // (joined)?<p>joined</p>:<p>joining</p>
                }
            </div>
        </>
    )
}