import connectDB from "@/lib/database/database";
import { Teams } from "@/models/team.model";
import { Individual } from "@/models/user.model";
import { auth } from "@clerk/nextjs";


export async function POST(request) {
    await connectDB();
    const data = await request.json();
    if (data.invite == "") {
        return Response.json({success: false});
    }
    const { userId } = auth();
    const individual = await Individual.findOne({
        userId: userId
    })
    const team = await Teams.findOne({
        inviteLink: data.invite
    })
    if (!individual || !team) {
        return Response.json({status: false});
    }
    for (let i = 0; i< individual.teams.length; i++) {
        if (individual.teams[i] == team._id) {
            return Response.json({status: false});
        }
    }
    individual.teams.push(team._id);
    team.members.push(individual._id);
    individual.save();
    team.save();
    return Response.json({status:true});
}