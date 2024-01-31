import { Tasks } from "@/models/task.model";
import { Individual } from "@/models/user.model";
import { auth } from "@clerk/nextjs";

export async function POST(request) {
    const data = await request.json();
    const {userId} = auth();
    if (!userId) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        })
    }
    const task = await Tasks.findOne({_id: data._id});
    const individual = await Individual.findOne({userId: userId});
    if (!individual) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        })
    }
    console.log(task,data._id);
    if (!task) {
        return Response.json({
            success: false,
            message: "Task not found"
        })
    }
    task.status = "true";
    task.deletedBy = individual;
    await task.save();
    return Response.json({
        success: true
    })
}