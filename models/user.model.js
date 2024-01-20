import mongoose from "mongoose";

const URL = process.env.MONGODB_URI;

mongoose.set("strickQuery", false);

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("Connected to MongoDB");
}).catch((e)=>console.log(e));

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    },
    teams: {
        type: Schema.Types.ObjectId,
        ref: "Teams"
    }
})

const TeamsSchema = new Schema({
    teamId: {
        type: String,
        required: true,
        unique: true
    },
    teamName: {
        type: String,
        required: true
    },
    members: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    teamDesc: {
        type: String,
        required: true
    }
})

export const Individual = mongoose.models["Users"] || mongoose.model("Users",UserSchema);
export const Teams = mongoose.models["Teams"] || mongoose.model("Teams",TeamsSchema);
