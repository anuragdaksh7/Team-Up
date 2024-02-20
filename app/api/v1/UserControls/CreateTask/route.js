import connectDB from "@/lib/database/database";
import { Tasks } from "@/models/task.model";
import { Individual } from "@/models/user.model";
import { auth } from "@clerk/nextjs";



export async function POST(request) {
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
        team: data.team,
        createdBy: individual._id
    })
    // console.log(newTask);
    await newTask.save();
    return Response.json(
        {
            success: true,
            message: "Task Created"
        }
    );
}