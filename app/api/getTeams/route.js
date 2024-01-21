import { auth } from "@clerk/nextjs";
import { Individual } from "@/models/user.model";
import { Teams } from "@/models/team.model";

export async function GET() {
    const { userId } = auth();
    const individual = await Individual.findOne({
        userId: userId
    }).populate({path: "teams"});
    if (!individual) {
        return Response.json({})
    }
    const teams = await individual.teams;
    return Response.json(teams);
}