import { Teams } from "@/models/team.model";

export async function POST(request) {
    const data = await request.json();
    const team = await Teams.findOne({ _id: data.tId});
    console.log(data);
    if (!team) {
        return Response.json({status: false});
    }
    const str = team._id.toString();
    const shuffle = str => [...str].sort(()=>Math.random()-.5).join('');
    const newLink = shuffle(str).slice(0,9);
    // console.log(newLink);
    team.inviteLink = newLink;
    team.save();
    return Response.json({status: true, link: newLink});
}