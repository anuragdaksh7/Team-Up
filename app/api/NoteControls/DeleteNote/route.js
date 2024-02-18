import connectDB from "@/lib/database/database";
import { Notes } from "@/models/notes.model";
import { auth } from "@clerk/nextjs";

export async function POST(request) {
    await connectDB();
    const data = await request.json(0);
    const {userId} = auth();
    if (!userId) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        })
    }
    const filter = { _id: data._id };
    // const note = await Notes.findOne(filter);
    // console.log(note, data._id);
    const result = await Notes.deleteOne(filter);
    
    // console.log(result);
    return Response.json({
        success: true
    })
}