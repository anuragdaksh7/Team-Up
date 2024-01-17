"use client"
import { useState } from "react";



export default function CreateTeamForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit");
        const data = {
            tName: teamName,
            tDesc: teamDescription
        }
        console.log(data);
    }
    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");
    return (
        <div className="flex justify-center items-center h-[80lvh] ">
            <form className=" bg-[#161616] w-2/3 p-4 grid grid-flow-row-dense grid-cols-4 gap-4" onSubmit={handleSubmit}>
                <div className=" flex items-center">
                    <label className="font-semibold">Team Name</label>
                </div>
                <div className=" col-span-3">
                    <input className="w-full bg-[#232323] outline-none px-3 text-gray-300 font-bold text-lg rounded-md py-1" type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                </div>
                <div className=" flex ">
                    <label className="font-semibold">Team Description</label>
                </div>
                <div className=" col-span-3">
                    <textarea rows={5} className="w-full bg-[#232323] outline-none px-3 text-gray-400 font-semibold text-md rounded-md py-1" type="text" value={teamDescription} onChange={(e) => setTeamDescription(e.target.value)} />
                </div>
                <div className="col-span-4 flex justify-center">
                    <button className=" bg-[#3A82F7] px-4 py-2 rounded-md" >Create Team</button>
                </div>
            </form>
        </div>
    )
}