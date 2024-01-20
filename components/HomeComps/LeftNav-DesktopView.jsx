import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdArrowDropDown } from "react-icons/md";
import { currentUser } from "@clerk/nextjs";

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

    const user = await currentUser();
    const team = [
        {
            "name": "Team 1"
        },
        {
            "name": "Team 2"
        },
        {
            "name": "Team 3"
        },
        {
            "name": "Team 4"
        },
    ]

    return (
        <div className="h-[90lvh] w-1/5 flex flex-col px-6 border-r-2  justify-between">

            <div className="py-2">
                <Link
                    href="/createTeam"
                    className="font-semibold w-full bg-[#262626] py-2 px-4 rounded-md "
                >Create a New Team</Link>

                <div className=" mt-6 font-semibold w-full outline-none rounded-md bg-[#262626]">
                    <div className="flex justify-between items-center px-4 py-2">
                        <div>All Teams</div>
                        <MdArrowDropDown />
                    </div>

                    <div className="flex flex-col gap-2 pb-2">
                        {
                            team.map((item, index) => {
                                return (
                                    <TeamButtonComponent name={item.name} key={index} />
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
    )
}