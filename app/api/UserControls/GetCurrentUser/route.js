import { Individual } from "@/models/user.model";
import { auth } from "@clerk/nextjs";

export async function GET() {
    const {userId} = auth();
    if (!userId) return Response.json({status: false});
    try {
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
            username: user.username,
            id: user._id
        });
    } catch (err) {
        return Response.json(
            {
                success: false,
                error: "Invalid User Id"
            }
        )
    }
}