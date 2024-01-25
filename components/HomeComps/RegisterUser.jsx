"use client"
import axios from "axios";
import { useEffect } from "react";


export default function RegisterUser() {
    const registerNewUser = async () => {
        const response = await axios.post("/api/createUser");
        const data = await response.data;
        console.log(data);
    }
    useEffect(()=>{
        registerNewUser();
    },[])
    return (
        <></>
    )
}