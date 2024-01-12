import { SignUp } from "@clerk/nextjs";
import Nav from "@/components/Nav";

export default function Page() {
    return (
        <>
        <Nav />
        <div className="flex justify-center items-center h-lvh">
            <SignUp afterSignUpUrl="/home" />
        </div>
        </>
    );
}
