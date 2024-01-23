import mongoose from "mongoose";

const URL = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("Connected to MongoDB");
}).catch((e)=>console.log(e));

const Schema = mongoose.Schema;


const TeamsSchema = new Schema({
    teamName: {
        type: String,
        required: true
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "Users"
        }
    ],
    leader: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    teamDesc: {
        type: String,
        required: true
    },
    inviteLink: {
        type: String,
    }
})

export const Teams = mongoose.models["Teams"] || mongoose.model("Teams",TeamsSchema);