import { Individual } from "@/models/user.model";
import { Teams } from "@/models/team.model";
import { auth } from "@clerk/nextjs";
import connectDB from "@/lib/database/database";

export async function POST(request) {
    await connectDB();
    const data = await request.json();
    
    const { userId } = auth();
    const individual = await Individual.findOne({
        userId: userId
    });
    if (!individual) {
        return Response.json({success: false});
    }
    const teams = await individual.teams;
    // console.log(teams,data)
    if (teams.includes(`${data.teamId}`)) {
        return Response.json({success: true});
    }
    return Response.json({success: false});
}