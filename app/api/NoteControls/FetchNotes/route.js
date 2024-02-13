import { Notes } from "@/models/notes.model";
import { Individual } from "@/models/user.model";
import { auth } from "@clerk/nextjs";

export async function POST( request ) {
    const data = await request.json();
    const {userId} = auth();
    const individual = await Individual.findOne({userId: userId});
    if (!userId || !individual) {
        return new Response.json(
            {
                success: false,
                message: "Unauthorized"
            }
        );
    }
    const notes = await Notes.find({team: data.team}).populate({'path': 'createdBy'}).populate({'path': 'team'});
    if (!notes) {
        return new Response.json(
            {
                success: false,
                message: "Unauthorized"
            }
        );
    }
    // for (let i = 0; i < notes.length; i++) {
    //     notes[i]["leader"] = false;
    //     if (notes[i].createdBy._id.toString() === notes[i].team.leader._id.toString()) {
    //         notes[i]["leader"] = true;
    //     }
    // }

    const res = [];
    for (let i = 0; i < notes.length; i++) {
        const temp = Object();
        temp.content = notes[i].content
        // temp.lead = 1
        temp.createdBy = {}
        temp.createdBy._id = notes[i].createdBy._id
        temp.createdBy.username = notes[i].createdBy.username
        temp.tags = notes[i].tags
        temp.title = notes[i].title
        temp._id = notes[i]._id
        temp.leader = (individual._id.toString() === notes[i].team.leader._id.toString())?true:false;
        res.push(temp);
    }

    // console.log((notes[0].createdBy._id.toString() === notes[0].team.leader._id.toString())?true:false);
    // console.log(res[0])
    return Response.json( {
        notes: res,
        success: true
    } )
}