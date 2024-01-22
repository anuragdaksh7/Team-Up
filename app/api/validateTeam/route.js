import { Individual } from "@/models/user.model";
import { Teams } from "@/models/team.model";
import { auth } from "@clerk/nextjs";

export async function POST(request) {
    const data = await request.json();
    
    const { userId } = auth();
    const individual = await Individual.findOne({
        userId: userId
    });
    if (!individual) {
        return Response.json({sucess: false});
    }
    const teams = await individual.teams;
    console.log(teams,data)
    if (teams.includes(`${data.teamId}`)) {
        return Response.json({sucess: true});
    }
    return Response.json({sucess: false});
}