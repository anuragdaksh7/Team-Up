import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Note from "./Note";
import { Context } from "@/app/Teams/[TeamId]/page";


export default function AllNotes( props ) {
    const [elementUpdate,setElementUpdate] = useContext(Context);
    const tId = props.tId;
    const [notes,setNotes] = useState([]);

    const fetchNotes = async () => {
        const payload = {team: tId};
        const response = await axios.post("/api/v1/NoteControls/FetchNotes",payload);
        const data = await response.data;
        // console.log(data.notes);
        setNotes(data.notes);
    }

    useEffect(()=>{
        fetchNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[elementUpdate]);

    return (
        <div className="flex  gap-2 mb-2 flex-wrap">
            
            <p className="hidden">{elementUpdate}</p>
        {
            ((notes != []) && notes.map((value, idx) => {
                return <Note content = {value.content} creatorId = {value.createdBy._id} creator = {value.createdBy.username} tags = {value.tags} title={value.title} _id ={value._id} key={idx} leader = {value.leader} />
            }))
        }</div>
    )
}