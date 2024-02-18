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

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [
        {
          type: String,
        },
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    removedBy: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: "Teams"
    },
});

export const Notes = mongoose.models["Notes"] || mongoose.model("Notes",NoteSchema);