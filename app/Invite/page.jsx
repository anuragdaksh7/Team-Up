"use client"
import Nav from "@/components/Nav";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function Page() {
    
    const router = useRouter();

    const [code, setCode] = useState("");
    const [joined, setJoined] = useState(false);
    const join = async (e) => {
        e.preventDefault();
        const payload = { invite: code };
        const response = await axios.post("/api/v1/joinTeam", payload);
        const data = await response.data;
        console.log("data",data)
        setJoined(data.status);
        if (joined) {
            alert("Joined");
            router.push("/home");
        }
    }


    return (
        <>
            <Nav />
            <div className="flex justify-center items-center h-[70lvh]">
                <div className="w-1/3">
                    <form className=" px-8 py-6 flex flex-col gap-4 bg-[#222] rounded-md">
                        <h1 className=" select-none text-2xl font-bold border-b-2">Join A Team</h1>
                        <div className="w-full">
                            <input className=" w-full text-xl outline-none font-mono text-gray-500 bg-[#222]" type="text" value={code} placeholder="Enter Invite Code..." onChange={(e) => setCode(e.target.value)} />
                        </div>
                        <button className=" select-none font-bold bg-blue-500 rounded-md py-2" onClick={join}>Join Team</button>
                    </form>
                    {
                        // (joined)?<p>joined</p>:<p>joining</p>
                    }
                </div>
            </div>
        </>
    )
}