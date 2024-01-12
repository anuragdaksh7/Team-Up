import Link from "next/link";


export default function LandingPage3() {
    return (
        <div>
            <div className="h-lvh flex justify-normal sm:justify-start  items-center px-[50px] lg:px-[200px] ">
                <div className="flex justify-center ">
                    <div className="w-1/2 hidden md:block"></div>
                    <div className="w-full sm:w-1/2 flex flex-col gap-12">
                        <h1 className="text-xl line-clamp-4 md:text-4xl font-bold text-pretty">Unity is strength when there is teamwork and collaboration, great things can be achieved</h1>
                        <p className=" font-extralight">Teamwork is the collaborative effort of a team to achieve a common goal or to complete a task in the most effective way. This concept is seen within the great teamwork of a team, where interdependent individuals work together towards a common goal.</p>
                        <Link
                            className="text-xs w-fit md:text-lg bg-[#3A82F7] px-4 py-2 rounded-full hover:scale-105 duration-200"
                            href="/sign-up"
                        >Get Started</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}