import connectDB from "@/lib/database/database";
import { Individual } from "@/models/user.model";
import { auth } from "@clerk/nextjs";

export async function GET(request) {
    const {userId} = auth();
    if (!userId) return Response.json({status: false});
    const user = await Individual.findOne(
        {userId: userId}
    );
    if (!user) {
        return Response.json({
            success: false,
            error: "User not found"
        })
    }
    return Response.json({
        success: true,
        id: user.id,
        id: user._id
    });
}