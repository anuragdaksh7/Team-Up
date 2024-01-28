import { Individual } from "@/models/user.model";
import { auth } from "@clerk/nextjs";


export async function POST(request) {
    const data = await request.json();
    const id = await data._id;
    const {userId} = auth();
    try {
        const individual = await Individual.findOne(
            {_id: id}
        ).populate({path: "teams"});
        if (!individual) {
            return Response.json({
                success: false,
                error: "User not found"
            })
        }

        const dataObj = Object();
        if (individual.userId === userId) {
            dataObj.self = true;
        } else {
            dataObj.self = false;
        }
        dataObj.username = individual.username;
        dataObj.email = individual.email;
        dataObj.status = individual.status;
        dataObj.teams = [];
        for (let i = 0; i< individual.teams.length; i++) {
            const temp = [];
            temp.push(individual.teams[i].teamName);
            if (individual.teams[i].leader.toString() == individual._id.toString()) {
                temp.push(true);
            } else {
                temp.push(false);
            }
            
            dataObj.teams.push(temp);
        }
        // console.log(dataObj);
        return Response.json({
            success: true,
            user: dataObj
        })
    } catch (err) {
        // console.log(err);
        return Response.json({
            success: false,
            error: "Invalid User Id"
        })
    }
}