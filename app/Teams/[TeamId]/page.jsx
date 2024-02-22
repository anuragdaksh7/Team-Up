"use client"
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
import TaskForm from "@/components/Forms/TaskForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserHoverCard, { getFirstLetters } from "@/components/UserHoverCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatFunction from "@/components/Chat/ChatFunction";

export const Context = React.createContext();

export default function Page({ params }) {
  const [elementUpdate, setElementUpdate] = useState(10);
  const [currentUserId, setCurrentUserId] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const tID = params.TeamId;
  const [code, setCode] = useState("");
  const [permission, setPermission] = useState(false);
  const [team, setTeam] = useState({});
  const [tasksRender, setTasksRender] = useState([]);


  const fetchTasks = async () => {
    const payload = {
      team: params.TeamId
    }
    const response = await axios.post("/api/v1/UserControls/FetchTask", payload);
    const data = await response.data;

    for (let i = 0; i < data.tasks.length; i++) {
      const tmp = new Date(data.tasks[i].dueDate);
      data.tasks[i].dueDate = tmp;
    }
    const fetchedTasks = (data.tasks).sort((a, b) => a.dueDate - b.dueDate);
    setTasksRender(fetchedTasks)
  }


  const fetchTeam = async () => {
    const payload = { tId: tID };
    const response = await axios.post("/api/v1/getTeamName", payload);
    const data = await response.data;
    setTeam(data.team);
    // console.log(data, team);
  }

  const check = async () => {
    const payload = { "teamId": tID };
    // console.log(payload);
    const response = await axios.post("/api/v1/validateTeam", payload);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementUpdate])
  useEffect(() => {
    fetchTasks();
    const setUserId = async () => {
      const response = await axios.get("/api/v1/UserControls/GetUserId");
      const data = await response.data;
      if (data.success) {
        setCurrentUserId(data.id);
      }
    }
    setUserId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementUpdate])

  const generateLink = async () => {
    const payload = { "teamId": params.TeamId };
    const response = await axios.post("/api/v1/getLeader", payload);
    const data = await response.data;
    if (data.success) {
      const payload = { "tId": params.TeamId };
      const response = await axios.post("/api/v1/createLink", payload);
      const data = await response.data;
      const link = await data.link;
      console.log(link)
      setCode(link)
      navigator.clipboard.writeText(link);
    }
    else {
      alert("Only Team Leader can generate invite links!!")
    }
  }


  return (
    <Context.Provider value={[elementUpdate, setElementUpdate]}>
      <div className=" overflow-y-hidden ">
        <Nav />
        {
          (permission) ? (
            <div className=" flex flex-col  px-4">

              <div className="flex gap-4">


                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center capitalize font-bold text-2xl select-none">
                      {(team.teamName) ? team.teamName : "Team Name"}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="flex justify-between items-center ">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>{getFirstLetters(team?.teamName)}</AvatarFallback>
                      </Avatar>
                      <p className=" text-blue-500">{team?.teamDesc}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>


                {/* // generate invite link */}
                <div className=" rounded-md flex flex-col gap-2 px-4">
                  <Button className=" " variant="outline">
                    <FcInvite onClick={
                      () => {
                        generateLink();
                        toast("Success", {
                          description: `Code copied to clipboard ${code}`,
                        })
                      }
                    } className=" text-xl" />
                  </Button>

                </div>



              </div>

              <div className="flex">
                <div className="h-[85lvh] w-1/5 flex flex-col px-6 border-r-2 pt-4 justify-between ">
                  {
                    (team != {}) ? (
                      <>
                        <div>
                          <Card>
                            <CardHeader>
                              <CardTitle>Members</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div>
                                {
                                  team?.members?.map((item, idx) => {
                                    return <div key={idx}>
                                      <Button variant="link">
                                        {
                                          <UserHoverCard email={item[2]} userName={item[0]} Uhref={`/Users/${item[1]}`} key={idx} lead={item[1].toString() == team.leadId.toString()} />
                                        }
                                      </Button>
                                    </div>
                                  })
                                }
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="flex flex-col gap-2">
                          <>
                            <ChatFunction team_id={tID} />
                            <NoteForm team_id={tID} />
                            <TaskForm team_id={tID} />
                          </>
                          <Link href={`/Users/${currentUserId}`} className="w-full bg-white gap-4 py-2 px-2 flex justify-center rounded-md">
                            <UserButton className="" showName="true" />
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
    </Context.Provider >
  )
}