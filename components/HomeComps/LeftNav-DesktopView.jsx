// "use client"
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import ViewTeams from "./ViewTeams";
import axios from "axios";
import RegisterUser from "./RegisterUser";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
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

                <Card className="">
                    <CardHeader>
                        <CardTitle>Team Controls</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Button asChild>
                                    <Link
                                        href="/createTeam"
                                        className=""
                                    >Create a New Team</Link>
                                </Button>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Button asChild>
                                    <Link
                                        href="/Invite"
                                        className=""
                                    >Join a Team</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <ViewTeams />
            </div>

            <div>
                <p className="w-full bg-white gap-4 py-2 px-2 flex justify-center rounded-md">
                    <UserButton className="" showName="true" />
                </p>
            </div>
        </div>
    )
}