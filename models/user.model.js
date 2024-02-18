import connectDB from "@/lib/database/database";
import mongoose from "mongoose";

// const URL = process.env.MONGODB_URI;

// mongoose.set("strictQuery", false);

// mongoose.connect(URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() =>{
//     console.log("Connected to MongoDB");
// }).catch((e)=>console.log(e));

connectDB();

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
    teams: [
        {
            type: Schema.Types.ObjectId,
            ref: "Teams"
        }
    ]
})

export const Individual = mongoose.models["Users"] || mongoose.model("Users",UserSchema);
