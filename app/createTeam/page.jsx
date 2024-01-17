import CreateTeamForm from "@/components/CreateTeam/Form";
import Nav from "@/components/Nav";
import { UserButton, auth, currentUser } from "@clerk/nextjs"

export default function Page() {
    const user = currentUser();
    const {userId} = auth();
    // console.log(userId)
    return (
        <div>
            <Nav />
            <CreateTeamForm />
        </div>
    )
}