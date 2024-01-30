import { Tasks } from "@/models/task.model";
import { Teams } from "@/models/team.model";
import { auth } from "@clerk/nextjs";


export async function POST (request) {
    const data = await request.json();
    const {userId} = auth();
    if (!userId) {
      return new Response.json(
        {
            success: false,
            message: "Unauthorized"
        }
      );
    }
    const tasks = await Tasks.find({
        team: data.team
    }).populate({path: "createdBy"})
    // console.log(tasks, data)
    return Response.json(
        {
            success: true,
            tasks: tasks
        }
    )
}