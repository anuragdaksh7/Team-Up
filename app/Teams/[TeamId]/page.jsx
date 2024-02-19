"use client"
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FcInvite } from "react-icons/fc";
import Nav from "@/components/Nav";
import React from "react";
import axios from "axios";
import { FaCopy, FaRegCopy } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import DisplayTasksCard from "@/components/Tasks/DisplayTasksCard";
import DisplayNotes from "@/components/Notes/DisplayNotes";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import NoteForm from "@/components/Forms/NoteForm";
import { CgMinimize } from "react-icons/cg";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TaskForm from "@/components/Forms/TaskForm";

export const Context = React.createContext();

export default function Page({ params }) {
    const [elementUpdate, setElementUpdate] = useState(10);
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const tID = params.TeamId;
    const [code, setCode] = useState("");
    const [permission, setPermission] = useState(false);
    const [team, setTeam] = useState({});
    const [tasksRender, setTasksRender] = useState([]);


    const fetchTasks = async () => {
        // console.log("hahah")
        const payload = {
            team: params.TeamId
        }
        const response = await axios.post("/api/UserControls/FetchTask", payload);
        const data = await response.data;

        for (let i = 0; i < data.tasks.length; i++) {
            const tmp = new Date(data.tasks[i].dueDate);
            // tasksDateFix.push(fetchedTasks[i].dueDate)
            data.tasks[i].dueDate = tmp;
        }
        const fetchedTasks = (data.tasks).sort((a, b) => a.dueDate - b.dueDate);
        setTasksRender(fetchedTasks)
        // console.log(fetchedTasks,"hi")
        // console.log(fetchedTasks,typeof(fetchedTasks[0].dueDate));
    }

    const fetchCurrentUserName = async () => {
        const response = await axios.get("/api/UserControls/GetCurrentUser");
        const data = await response.data;
        if (data.success) {
            setCurrentUserName(data.username);
            setCurrentUserId(data.id);
        }
    }

    const fetchTeam = async () => {
        const payload = { tId: tID };
        const response = await axios.post("/api/getTeamName", payload);
        const data = await response.data;
        setTeam(data.team);
        // console.log(data, team);
    }

    const check = async () => {
        const payload = { "teamId": tID };
        // console.log(payload);
        const response = await axios.post("/api/validateTeam", payload);
        const data = await response.data;
        // console.log(data)
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
        fetchCurrentUserName();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementUpdate])
    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementUpdate])

    const generateLink = async () => {
        const payload = { "teamId": params.TeamId };
        const response = await axios.post("/api/getLeader", payload);
        const data = await response.data;
        // console.log(data)
        if (data.success) {
            // console.log("leader");
            const payload = { "tId": params.TeamId };
            const response = await axios.post("/api/createLink", payload);
            const data = await response.data;
            const link = await data.link;
            navigator.clipboard.writeText(link);
            // setCode(data.link);
            // alert("Code Copied to clipboard");

        }
        else {
            alert("Only Team Leader can generate invite links!!")
        }
        // console.log("sfsdfjkgnbkgjld");
    }

    
    return (
        <Context.Provider value={[elementUpdate, setElementUpdate]}>
            <div>
                <Nav />
                {
                    (permission) ? (
                        <div className=" flex flex-col  px-4">

                            <div className="flex gap-4">
                                <div className="flex items-center capitalize font-bold text-2xl select-none">{(team.teamName) ? team.teamName : "Team Name"}</div>


                                {/* // generate invite link */}
                                <div className=" rounded-md py-2 flex flex-col gap-2 px-4">
                                    <Button onClick={
                                        () => {
                                            generateLink();
                                            toast("Success", {
                                                description: "Code copied to clipboard",
                                            })
                                        }
                                    } className=" " variant="outline">
                                        {/* Invite friends */}
                                        <FcInvite className=" text-xl" />
                                    </Button>
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
                                <div className="h-[85lvh] w-1/5 flex flex-col px-6 border-r-2 py-2 justify-between ">
                                    {
                                        (team != {}) ? (
                                            <>
                                                <div>
                                                    {/* <p>Description -&gt; {team.teamDesc}</p> */}
                                                    <h1 className="text-xl font-semibold text-blue-500 mb-2">Members</h1>
                                                    <div className="bg-blue-400 px-4 py-3 rounded-md flex flex-col gap-3">
                                                        {/* <p>Leader -&gt; {team.leader}</p> */}
                                                        <div className="bg-blue-500 ps-2 py-1 rounded-md">
                                                            <p className="underline underline-offset-2 font-bold">Leader</p>
                                                            <Link href={
                                                                `/Users/${team.leadId}`
                                                            } className="ps-2">{team.leader}</Link>
                                                        </div>
                                                        <div className="bg-blue-500 ps-2 py-1 rounded-md ">
                                                            {/* <p>Members -&gt; </p> */}
                                                            <p className="underline underline-offset-2 font-bold">Members</p>
                                                            {
                                                                team?.members?.map((item, index) => {
                                                                    return <div key={index} className="flex justify-between pe-2">
                                                                        <Link href={`/Users/${item[1]}`} key={index} className="ps-2">{item[0]}</Link>
                                                                        <IoIosRemoveCircleOutline />
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="flex flex-col gap-3">
                                                    <Popover>
                                                        <PopoverTrigger className="bg-blue-500 w-full py-2 rounded-md">Add New Note?</PopoverTrigger>
                                                        <PopoverContent className=" w-fit shadow-lg shadow-black border-2">
                                                            <NoteForm team_id={tID} />
                                                        </PopoverContent>
                                                    </Popover>
                                                    
                                                    <TaskForm team_id={tID} />

                                                    <Link href={
                                                        `/Users/${currentUserId}`
                                                    } className="w-full bg-[#232323] flex items-center gap-4 py-2 px-2 rounded-md">
                                                        <UserButton afterSignOutUrl="/" />
                                                        <p>{currentUserName}</p>
                                                    </Link>
                                                </div>
                                            </>
                                        ) : <></>
                                    }
                                </div>
                                <div className="w-full px-4 overflow-y-scroll h-[85lvh]">
                                    <DisplayNotes teamId={tID} />
                                    {
                                        (tasksRender) ? <div className=" ">
                                            <h1 className="mb-2 font-bold text-lg">Upcoming Tasks</h1>
                                            <DisplayTasksCard fetcher={fetchTasks} tasks={tasksRender} />
                                        </div> : <></>
                                    }
                                </div>
                            </div>

                        </div>
                    ) : <div className=" flex justify-center items-center h-[80lvh]">
                        Loading...
                    </div>
                }
            </div>
        </Context.Provider>
    )
}