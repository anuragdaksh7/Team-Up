"use client"
import Nav from "@/components/Nav";
import axios from "axios";
import { FaCopy, FaRegCopy } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const tID = params.TeamId;
    const [code, setCode] = useState("");
    const [permission, setPermission] = useState(false);
    const check = async () => {
        const payload = { "teamId": tID };
        console.log(payload);
        const response = await axios.post("/api/validateTeam", payload);
        const data = await response.data;
        console.log(data)
        if (!data.success) {
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
        if (data.success) {
            console.log("leader");
            const payload = { "tId": params.TeamId };
            const response = await axios.post("/api/createLink", payload);
            const data = await response.data;
            // navigator.clipboard.writeText(data.link);
            setCode(data.link);
            // alert("Code Copied to clipboard");
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
                <div className="bg-blue-600 rounded-md py-2 flex flex-col gap-2 px-4">
                    <button onClick={generateLink} className=" ">
                        Invite friends
                    </button>
                    {
                        (code != "") ? <div className="flex justify-between items-center gap-2">
                            <p className=" flex  bg-blue-600">{code}</p>
                            {
                                (!copied)?<FaRegCopy className=" cursor-pointer" onClick={(e) => {
                                    setCopied(true);
                                    navigator.clipboard.writeText(code);
                                }} />:<FaCopy className=" cursor-pointer" />
                            }
                        </div>:<></>
                    }
                </div>
            </div>
        </div>
    )
}