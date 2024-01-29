import Link from "next/link";
import { auth } from "@clerk/nextjs";


export default function LandingPage1() {
    const {userId} = auth();
    console.log(userId);
    return (
        <div className="h-lvh flex justify-normal sm:justify-start  items-center px-[50px] lg:px-[200px] ">
            <div className="flex flex-col gap-10"> 
                <h1 className=" text-2xl sm:text-5xl font-bold ">
                    Projects made better<br />by working together
                </h1>
                <div>
                    <p className=" text-balance text-sm sm:text-md font-light">Manage Everything in One Place With built in Timelines.<br />Enterprise Class Security<br />Free to Use</p>
                </div>
                {
                    (!userId)?<div className="flex gap-10">
                        <Link
                            className="text-xs w-fit md:text-lg bg-[#3A82F7] px-4 py-2 rounded-full hover:scale-105 duration-200"
                            href="/sign-up"
                        >Get Started</Link>
                        <Link
                            className="text-xs w-fit md:text-lg bg-[#264b85] px-8 py-2 rounded-full hover:scale-105 duration-200"
                            href="/sign-in"
                        >LogIn</Link>
                    </div>:<div>
                        <Link
                            className="text-xs w-fit md:text-lg bg-[#3A82F7] px-4 py-2 rounded-full hover:scale-105 duration-200"
                            href="/home"
                        >Home</Link>
                    </div>
                }
            </div>
        </div>
    )
}