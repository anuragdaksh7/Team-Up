import axios from "axios";
import { useEffect, useState } from "react";


export default function AllNotes( props ) {
    const tId = props.tId;
    const [notes,setNotes] = useState([]);

    const fetchNotes = async () => {
        const payload = {team: tId};
        const response = await axios.post("/api/NoteControls/FetchNotes",payload);
        const data = await response.data;
        console.log(data);
        setNotes(data.notes);
    }

    useEffect(()=>{
        fetchNotes();
    },[]);

    return (
        <div>hello</div>
    )
}