import connectDB from "@/lib/database/database";
import { Individual } from "@/models/user.model";
import { auth } from "@clerk/nextjs";


export async function POST( request ) {
    await connectDB();
    const data = await request.json();
    const {userId} = auth();
    const individual = await Individual.findOne({userId: userId});
    if (!individual) {
        return Response.json({
            success: false,
            error: "User not found"
        });
    }
    individual.status = data.status;
    individual.save();
    return Response.json({
        success: true
    });
}