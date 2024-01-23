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
    const [team, setTeam] = useState({});

    const fetchTeam = async () => {
        const payload = { tId: tID };
        const response = await axios.post("/api/getTeamName", payload);
        const data = await response.data;
        setTeam(data.team);
        console.log(data,team);
    }

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
            fetchTeam();
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
            {
                (permission) ? (
                    <div className=" flex flex-col  px-4">

                        <div className="flex justify-between">
                            <div className="flex items-center">Team {params.TeamId}</div>

                            <div className="bg-blue-600 rounded-md py-2 flex flex-col gap-2 px-4">
                                <button onClick={generateLink} className=" ">
                                    Invite friends
                                </button>
                                {
                                    (code != "") ? <div className="flex justify-between items-center gap-2">
                                        <p className=" flex  bg-blue-600">{code}</p>
                                        {
                                            (!copied) ? <FaRegCopy className=" cursor-pointer" onClick={(e) => {
                                                setCopied(true);
                                                navigator.clipboard.writeText(code);
                                            }} /> : <FaCopy className=" cursor-pointer" />
                                        }
                                    </div> : <></>
                                }
                            </div>
                        </div>

                        <div className="flex">
                            <div className="h-[85lvh] w-1/5 flex flex-col px-6 border-r-2  ">
                                {
                                    (team!={})?(
                                        <>
                                            <p>{team.teamName}</p>
                                            <p>{team.teamDesc}</p>
                                            <p>{team.leader}</p>
                                            {
                                                team?.members?.map((item,index) => {
                                                    return <p>{item}</p>
                                                })
                                            }
                                        </>
                                    ):<></>
                                }
                            </div>
                        </div>

                    </div>
                ) : <>Loading</>
            }
        </div>
    )
}