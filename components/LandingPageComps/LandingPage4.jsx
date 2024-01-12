import Link from "next/link";


export default function LandingPage4() {
    return (
        <div className="h-lvh flex justify-normal sm:justify-start  items-center px-[50px] lg:px-[200px] ">
            <div className="flex justify-center ">
                <div className="w-full sm:w-1/2 flex flex-col gap-12">
                    <h1 className="text-xl line-clamp-4 md:text-4xl font-bold text-pretty">Teamwork is the secret that makes common people achieve uncommon results</h1>
                    <p className=" font-extralight">In addition to practical components required for efficient teamwork, there are certain charactersticks that member of the team must have in common to produce effetive teamwork, firstly they muct be a high level of interdependence among team members.</p>
                    <Link
                        className="text-xs w-fit md:text-lg bg-[#3A82F7] px-4 py-2 rounded-full hover:scale-105 duration-200"
                        href="/sign-up"
                    >Get Started</Link>
                </div>
                <div className="w-1/2 hidden md:block"></div>
            </div>
        </div>
    )
}