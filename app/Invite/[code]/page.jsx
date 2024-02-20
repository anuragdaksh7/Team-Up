"use client"
import axios from "axios";
import { useEffect, useState } from "react"


export default function Page( {params} ) {

    const [joined, setJoined] = useState(false);
    const join = async () => {
        const payload = { invite : params.code };
        const response = await axios.post("/api/v1/joinTeam", payload);
        const data = await response.data;
        setJoined(data.success);
        console.log(data);
    }
    

    return (
        <div>
            <p>{ params.code }</p>
            <button onClick={join}>Join Team</button>
            {
                (joined)?<p>joined</p>:<p>joining</p>
            }
        </div>
    )
}