import connectDB from "@/lib/database/database";
import { Individual } from "@/models/user.model";
import { auth, currentUser } from "@clerk/nextjs";


export async function POST() {
    await connectDB();
    const { userId } = auth();
    const user = await currentUser();
    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }
    const individual = await Individual.findOne({ userId: userId });
    if (!individual) {
        const newIndividual = new Individual({
            email: user.emailAddresses[0].emailAddress,
            username: user.firstName,
            userId: userId,
            status: "active",
            teams: []
        })
        await newIndividual.save();
    }
    return Response.json({success: true})
}