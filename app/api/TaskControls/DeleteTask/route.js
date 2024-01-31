import { Tasks } from "@/models/task.model";
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

    const filter = { _id: data._id };
    const result = await Tasks.deleteOne(filter);
    
    // console.log(result);
    return Response.json({
        success: true
    })

}