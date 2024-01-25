// "use client"
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import ViewTeams from "./ViewTeams";
import axios from "axios";
import RegisterUser from "./RegisterUser";
// import { useEffect } from "react";

function TeamButtonComponent(props) {
    return (
        <button
            className="select-none font-light border-2 mx-2 flex justify-between items-center border-[#434343] px-4 py-1 hover:bg-[#434343] duration-200  rounded-md"
        >
            {props.name}
        </button>
    )
}

export default async function LeftNavDesktop() {
    const registerNewUser = async () => {
        await axios.post("/createUser");
    }
    // registerNewUser();
    // useEffect(()=>{
    //     registerNewUser();
    // },[])

    const user = await currentUser();
    return (
        <div className="h-[90lvh] w-1/5 flex flex-col px-6 border-r-2  justify-between">
            <RegisterUser />
            <div className="py-2">
                <div className="flex flex-col gap-4">
                    <Link
                        href="/createTeam"
                        className="font-semibold w-full bg-[#262626] py-2 px-4 rounded-md "
                    >Create a New Team</Link>
                
                    <Link
                        href="/Invite"
                        className="font-semibold w-full bg-[#262626] py-2 px-4 rounded-md "
                    >Join a Team</Link>
                </div>
                <ViewTeams />
            </div>

            <div>
                <div className="bg-[#242424] px-4 py-2 rounded-md flex gap-2 items-center">
                    <UserButton afterSignOutUrl="/" />
                    <p>{user?.firstName}</p>
                </div>
            </div>
        </div>
    )
}