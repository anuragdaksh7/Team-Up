import { Notes } from "@/models/notes.model";
import { auth } from "@clerk/nextjs";

export async function POST( request ) {
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
    const notes = await Notes.find({team: data.team});
    console.log(notes);
    if (!notes) {
        return new Response.json(
            {
                success: false,
                message: "Unauthorized"
            }
        );
    }
    return Response.json( {
        notes: notes,
        success: true
    } )
}