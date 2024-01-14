import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdArrowDropDown } from "react-icons/md";
import { currentUser } from "@clerk/nextjs";


export default async function LeftNavDesktop () {
    const user = await currentUser();

    return (
        <div className="fixed left-0 top-[68px] w-80 bg-[#121212] font-semibold border-r-2  h-full py-4">
            <div className="h-full flex flex-col px-6 pb-16 justify-between">
                <div className="w-full">
                    <Link href="/" className="w-full bg-[#3A82F7] py-2 px-4 rounded-md" >Create a New Team</Link>
                    <br />
                    <br />
                    <button className=" w-full outline-none flex justify-between items-center px-4 py-2 rounded-md bg-[#3A82F7]">
                        <div>All Teams</div>
                        <MdArrowDropDown />
                    </button>
                </div>
                <div>
                    <div className="bg-[#242424] px-4 py-2 rounded-md flex gap-2 items-center">
                        <UserButton afterSignOutUrl="/" />
                        <p>{user?.firstName}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}