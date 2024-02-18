import connectDB from "@/lib/database/database";
import { Tasks } from "@/models/task.model";
import { auth } from "@clerk/nextjs";


export async function POST (request) {
    await connectDB();
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
    }).populate({path: "createdBy"}).populate({path: "deletedBy"})
    // console.log(tasks, data)
    return Response.json(
        {
            success: true,
            tasks: tasks
        }
    )
}