import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdArrowDropDown } from "react-icons/md";
import { currentUser } from "@clerk/nextjs";


export default async function LeftNavDesktop () {
    const user = await currentUser();
    const team = [
        {
            "name" : "Team 1"
        },
        {
            "name" : "Team 2"
        },
        {
            "name" : "Team 3"
        },
        {
            "name" : "Team 4"
        },
    ]
    return (
        // <div className="fixed left-0 top-[68px] w-80 bg-[#121212] font-semibold border-r-2  h-full py-4">
            <div className="h-full flex flex-col px-6 border-r-2 pb-16 justify-between">
                <div className="">
                    <br />
                    <Link href="/createTeam" className="font-semibold w-full bg-[#3A82F7] py-2 px-4 rounded-md" >Create a New Team</Link>
                    <br />
                    <br />
                    <div className=" font-semibold w-full outline-none rounded-md bg-[#3A82F7]">
                        <div className="flex justify-between items-center px-4 py-2">
                            <div>All Teams</div>
                            <MdArrowDropDown />
                        </div>
                        <div className="flex flex-col gap-2 pb-2">
                        {
                            team.map((item, index) => {
                                return (
                                    <button className=" select-none font-light border-2 mx-2 flex justify-between items-center border-[#79abfd] px-4 py-1  rounded-md" key={index}>
                                        {item.name}
                                    </button>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-[#242424] px-4 py-2 rounded-md flex gap-2 items-center">
                        <UserButton afterSignOutUrl="/" />
                        <p>{user?.firstName}</p>
                    </div>
                </div>
            </div>
        // </div>
    )
}