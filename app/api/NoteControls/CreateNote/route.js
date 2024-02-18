import { Teams } from "@/models/team.model";
import { Individual } from "@/models/user.model";
import { Notes } from "@/models/notes.model";
import { auth } from "@clerk/nextjs";
import connectDB from "@/lib/database/database";



export async function POST(request) {
    await connectDB();
    const data = await request.json();

    const {userId} = auth();
    if (!userId) {
        return Response.json({
            success: false,
            message: "unauthenticated"
        })
    }
    const individual = await Individual.findOne({
        userId: userId
    })
    const team = await Teams.findOne({
        _id: data.teamId
    })
    if (!team) {
        return Response.json({
            success: false,
            message: "unauthenticated"
        })
    }
    if (!individual) {
        return Response.json({
            success: false,
            message: "unauthenticated"
        })
    }
    // const tags = await data.tags;
    try {
        // console.log(data);
        const newNote = new Notes({
            title: data.name,
            content: data.content,
            tags: data.tags,
            createdBy: individual,
            team: team
        })
        // newNote.tags = data.tags;
        // console.log(newNote);
        await newNote.save();
        return Response.json({
            success: true
        })
    } catch (e) {
        console.log(e);
        return Response.json({
            success: false,
            message: "an error occured"
        })
    }

}