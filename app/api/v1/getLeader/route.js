import connectDB from "@/lib/database/database";
import { Teams } from "@/models/team.model";
import { Individual } from "@/models/user.model";
import { auth, currentUser } from "@clerk/nextjs";


export async function POST(request) {
    await connectDB();
    const data = await request.json();

    const { userId } = auth();
    const user = await currentUser();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const team = await Teams.findOne({ _id: data.teamId });
    if (!team) {
      return Response.json({ status: false });
    }


    const individual = await Individual.findOne({
        userId: userId
    });
    if (!individual) {
        return Response.json({success: false});
    }
    if (individual._id.toString() == team.leader.toString()) {
        return Response.json({success: true});
    }
    return Response.json({success: false});
    
}