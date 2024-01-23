import { Teams } from "@/models/team.model";
import { auth } from "@clerk/nextjs"


export async function POST( request ){
    const { userId } = auth();
    if (!userId) return Response.json({status: false});
    const data = await request.json();
    const team = await Teams.findOne({
        _id: data.tId
    }).populate({path: 'members'}).populate({path: 'leader'});
    if (!team) {
        return Response.json({status: false});
    }
    const response = new Object();
    response.leader = team.leader.username;
    response.members = [];
    for (let i = 0; i < team.members.length; i++) {
        response.members.push(team.members[i].username);
    }
    response.teamName = team.teamName
    response.teamDesc = team.teamDesc
    return Response.json({team: response});
}