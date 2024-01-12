import Link from "next/link";

export default function Nav() {
    return (
        <div className="flex  justify-between px-[50px] lg:px-[200px] items-baseline py-4">
            <Link href="/" className=" text-lg sm:text-3xl font-bold hover:scale-105 duration-200">
                TeamUp
            </Link>
            <div className="flex gap-[10px] sm:gap-[30px] text-xs sm:text-lg font-normal sm:font-semibold ">
                <Link className="hover:scale-105 hover:text-blue-500 duration-200" href="/">Home</Link>
                <Link className="hover:scale-105 hover:text-blue-500 duration-200" href="/">About</Link>
                <Link className="hover:scale-105 hover:text-blue-500 duration-200" href="/">Features</Link>
                <Link className="hover:scale-105 hover:text-blue-500 duration-200" href="/">GitHub</Link>
            </div>
        </div>
    )
}