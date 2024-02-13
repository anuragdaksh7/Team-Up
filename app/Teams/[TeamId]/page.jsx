"use client"
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


export default function Page({ params }) {
    const [task, setTask] = useState("");
    const [date,setDate] = useState("");
    const [visible, setVisible] = useState(false);
    const [visibleNote, setVisibleNote] = useState(false);
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const tID = params.TeamId;
    const [code, setCode] = useState("");
    const [permission, setPermission] = useState(false);
    const [team, setTeam] = useState({});
    const [tasksRender, setTasksRender] = useState([]);
    const [noteName, setNoteName] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteTagString, setNoteTagString] = useState("");
    const [noteTags, setNoteTags] = useState([]);


    const fetchTasks = async () => {
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
    }, [])
    useEffect(() => {
        fetchTasks();
    },[])

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
            alert("Code Copied to clipboard");
        }
        else {
            alert("Only Team Leader can generate invite links!!")
        }
        // console.log("sfsdfjkgnbkgjld");
    }

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        // const tagsArr = noteTagString.split(" ");
        // for (let i = 0; i < tagsArr.length; i++) {
        //     if (tagsArr[i]!== "") {
        //         setNoteTags((prevState) => [...prevState, tagsArr[i]]);
        //     }
        // }
        console.log(noteName, noteContent, noteTagString, noteTags)
        const payload = {
            "teamId": params.TeamId,
            "name": noteName,
            "content": noteContent,
            "tags": noteTags
        }
        const response = await axios.post("/api/NoteControls/CreateNote", payload);
        const data = await response.data;
        
        setNoteTags([]);
        setNoteName("");
        setNoteContent("");
        setNoteTagString("");
        if (data.success) {
            alert("Note Created");
        }
        else {
            alert(data.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(task,date);
        const dateValid = new Date(date);
        const temp = new Date();
        const currDay = new Date(temp.toDateString());
        if (dateValid<currDay) {
            alert("Date cannot be in the past");
            return;
        }
        const payload = {
            title: task,
            status: false,
            dueDate: date,
            team: params.TeamId
        }
        const response = await axios.post("/api/UserControls/CreateTask",payload);
        const data = await response.data;
        if (data.success) {
            alert(data.message);
            setVisible(false);
            setTask("");
            setDate("");
            fetchTasks();
        }
    }
    return (
        <div>
            <Nav />
            {
                (permission) ? (
                    <div className=" flex flex-col  px-4">

                        <div className="flex justify-between">
                            <div className="flex items-center capitalize font-bold text-2xl select-none">{(team.teamName) ? team.teamName : "Team Name"}</div>

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
                                                                return <div key={index}><Link href={`/Users/${item[1]}`} key={index} className="ps-2">{item[0]}</Link></div>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <button className="bg-blue-500 w-full py-2 rounded-md" onClick={
                                                    (e)=>{
                                                        setVisible(false);
                                                        setVisibleNote(true)
                                                    }
                                                } >
                                                    Add New Note?
                                                </button>
                                                <div className={`${(visibleNote)?"fixed":"hidden"} border border-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#232323] px-8 py-4 rounded-md`}>
                                                    <div>
                                                        <div className="flex justify-between items-baseline">
                                                            <h1 className="text-xl font-bold">Create New Note</h1>
                                                            <button onClick={(e)=>setVisibleNote(false)} className=" text-4xl hover:bg-[#323232] rounded-full px-2 flex items-center scale-75 ">×</button>
                                                        </div>
                                                        <form className="flex flex-col gap-2 py-2">
                                                            <input value={noteName} onChange={(e)=>setNoteName(e.target.value)} className=" outline-none px-2 py-1 font-light rounded-md" type="text" placeholder="title" />
                                                            <textarea value={noteContent} onChange={(e)=>setNoteContent(e.target.value)} rows={2} className=" outline-none px-2 py-1 font-extralight rounded-md" type="text" placeholder="content" />
                                                            <input value={noteTags.join(" ")} onChange={(e)=>setNoteTags(e.target.value.split(" "))} className=" outline-none px-2 py-1 font-light rounded-md" type="text" placeholder="tags seperated by spaces" />
                                                            <button className="w-full bg-blue-500 rounded-md py-1" onClick={handleNoteSubmit}>Submit</button>
                                                        </form>
                                                    </div>
                                                </div>


                                                <button className="bg-blue-500 w-full py-2 rounded-md" onClick={
                                                    (e)=>{
                                                        setVisibleNote(false);
                                                        setVisible(true)
                                                    }
                                                } >
                                                    Add New Task?
                                                </button>
                                                <div className={`${(visible)?"fixed":"hidden"} border border-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#232323] px-8 py-4 rounded-md`}>
                                                    <div>
                                                        <div className="flex justify-between items-baseline">
                                                            <h1 className="text-xl font-bold">Create New Task</h1>
                                                            <button onClick={(e)=>setVisible(false)} className=" text-4xl hover:bg-[#323232] rounded-full px-2 flex items-center scale-75 ">×</button>
                                                        </div>
                                                        <form className="flex flex-col gap-2 py-2">
                                                            <div><input className=" outline-none px-2 py-1 font-light rounded-md" type="text" placeholder="title" value={task} onChange={(e)=>setTask(e.target.value)} /></div>
                                                            <div className="w-full"><input className="w-full outline-none px-2 py-1 font-light rounded-md" type="date" placeholder="due date" value={date}  onChange={(e)=>setDate(e.target.value)} /></div>
                                                            <button className="w-full bg-blue-500 rounded-md py-1" onClick={handleSubmit}>Submit</button>
                                                        </form>
                                                    </div>
                                                </div>
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
                                    (tasksRender)?<div className=" max-h-[85lvh]">
                                    <h1 className="mb-2 font-bold text-lg">Upcoming Tasks</h1>
                                    <DisplayTasksCard tasks = {tasksRender} />
                                    </div>:<></>
                                }
                            </div>
                        </div>

                    </div>
                ) : <div className=" flex justify-center items-center h-[80lvh]">
                    Loading...
                </div>
            }
        </div>
    )
}