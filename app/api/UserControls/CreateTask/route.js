import { Tasks } from "@/models/task.model";
import { Individual } from "@/models/user.model";
import { auth } from "@clerk/nextjs";



export async function POST(request) {
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

    const individual = await Individual.findOne({
        userId: userId
    });
    if (!individual) {
        return new Response.json(
            {
                success: false,
                message: "Unauthorized"
            }
        )
    }
    const newTask = new Tasks({
        title: data.title,
        status: data.status,
        dueDate: data.dueDate,
        createdBy: individual._id
    })
    await newTask.save();
    return Response.json(
        {
            success: true,
            message: "Task Created"
        }
    );
}