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

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: "Teams"
    }
});

export const Tasks = mongoose.models["Tasks"] || mongoose.model("Tasks",TaskSchema);